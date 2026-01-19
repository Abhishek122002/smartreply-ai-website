import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

import fs from "fs-extra";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import crypto from "crypto";   // ✅ IMPORTANT (fixes signup crash)

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

/* ------------------- AI CLIENT ------------------- */
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/* ------------------- AUTH STORAGE ------------------- */
const USERS_FILE = "./users.json";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

async function getUsers() {
  try {
    return await fs.readJSON(USERS_FILE);
  } catch {
    return [];
  }
}

async function saveUsers(users) {
  await fs.writeJSON(USERS_FILE, users, { spaces: 2 });
}

/* ------------------- AUTH ROUTES ------------------- */

// SIGN UP
app.post("/api/auth/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ error: "Missing fields" });

    const users = await getUsers();

    if (users.find(u => u.email === email))
      return res.status(409).json({ error: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password: hashed,
      createdAt: Date.now(),

      // 🆕 each user starts with 0 free generations
      freeUsage: {
        date: new Date().toDateString(),
        count: 0
      }
    };

    users.push(newUser);
    await saveUsers(users);

    res.json({ message: "Account created successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Signup failed" });
  }
});

// LOGIN
app.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const users = await getUsers();
    const user = users.find(u => u.email === email);

    if (!user)
      return res.status(404).json({ error: "No account found" });

    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: { id: user.id, name: user.name, email: user.email }
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed" });
  }
});

function requireAuth(req, res, next) {
  const auth = req.headers.authorization;

  if (!auth) return res.status(401).json({ error: "Not logged in" });

  try {
    const token = auth.split(" ")[1];
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.get("/api/auth/me", requireAuth, async (req, res) => {
  const users = await getUsers();
  const user = users.find(u => u.id === req.user.id);
  res.json({ user });
});

/* ------------------- USAGE (DAILY LIMIT) ------------------- */
app.get("/api/usage", requireAuth, async (req, res) => {
  const users = await getUsers();
  const user = users.find(u => u.id === req.user.id);

  if (!user) return res.status(404).json({ error: "User not found" });

  if (!user.freeUsage) {
    user.freeUsage = {
      date: new Date().toDateString(),
      count: 0
    };
    await saveUsers(users);
  }

  // reset daily
  if (user.freeUsage.date !== new Date().toDateString()) {
    user.freeUsage.date = new Date().toDateString();
    user.freeUsage.count = 0;
    await saveUsers(users);
  }

  res.json(user.freeUsage);
});

/* ------------------- AI GENERATION (WITH LIMIT) ------------------- */
app.post("/api/generate", requireAuth, async (req, res) => {
  try {
    const { replyFor, points, settings, mode, currentText } = req.body;

    const users = await getUsers();
    const user = users.find(u => u.id === req.user.id);

    if (!user) return res.status(404).json({ error: "User not found" });

    // ensure usage exists
    if (!user.freeUsage) {
      user.freeUsage = { date: new Date().toDateString(), count: 0 };
    }

    // reset daily
    if (user.freeUsage.date !== new Date().toDateString()) {
      user.freeUsage.date = new Date().toDateString();
      user.freeUsage.count = 0;
    }

    // Only count NORMAL generates toward free usage
    const shouldCount = mode === undefined;

    if (shouldCount && user.freeUsage.count >= 10) {
      return res.status(403).json({ error: "Free limit reached" });
    }

    let userPrompt = "";

    /* ---------- NORMAL GENERATE ---------- */
    if (!mode) {
      userPrompt = `
Reply for:
"${replyFor}"

Points to include:
${points.map((p, i) => `${i + 1}. ${p}`).join("\n")}

Tone: ${settings.tone.join(", ")}
Length: ${settings.length}
Language: ${settings.language}
Email Mode: ${settings.emailMode ? "Yes" : "No"}
`;
    }

    /* ---------- REWRITE ---------- */
    if (mode === "rewrite") {
      userPrompt = `
Rewrite the following reply into a different alternative.
Keep meaning same. No bullet points. No explanation.

"${currentText}"
`;
    }

    /* ---------- SHORTEN ---------- */
    if (mode === "shorten") {
      userPrompt = `
Make this reply shorter.
Keep tone natural and polite.
Remove extra sentences but keep meaning.

"${currentText}"
`;
    }

    /* ---------- EXPAND ---------- */
    if (mode === "expand") {
      userPrompt = `
Expand this reply.
Add more detail and clarity.
Do NOT repeat sentences.

"${currentText}"
`;
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      temperature: 0.5,
      messages: [
        { role: "system", content: "You write concise helpful replies." },
        { role: "user", content: userPrompt }
      ],
    });

    // Count only normal generate toward free limit
    if (shouldCount) {
      user.freeUsage.count += 1;
      await saveUsers(users);
    }

    res.json({
      text: response.choices[0].message.content,
      remaining: 10 - user.freeUsage.count
    });

  } catch (error) {
    console.error("AI Error:", error);
    res.status(500).json({ error: "AI generation failed" });
  }
});


app.listen(3001, () => {
  console.log("✅ AI server running at http://localhost:3001");
});
