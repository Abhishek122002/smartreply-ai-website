import { useState } from "react";

function isFromExtension() {
  const params = new URLSearchParams(window.location.search);
  return params.get("from") === "extension";
}


export default function AuthModal({ onClose }: { onClose: () => void }) {
  const [mode, setMode] = useState<"login" | "signup">("login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const API = "http://localhost:3001";

  function resetMessages() {
    setError(null);
    setSuccess(null);
  }

  /* ---------------- SIGNUP ---------------- */
  const handleSignup = async () => {
    resetMessages();

    if (!name || !email || !password || !confirm) {
      setError("Please fill all fields");
      return;
    }

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        return;
      }

      setSuccess("Account created — please login");
      setMode("login");
    } catch {
      setError("Server error — try again later");
    }
  };

  /* ---------------- LOGIN ---------------- */
  const handleLogin = async () => {
    resetMessages();

    if (!email || !password) {
      setError("Enter email and password");
      return;
    }

    try {
      const res = await fetch(`${API}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
        return;
      }

      // store user + token
  // ---------------- EXTENSION HANDOFF ----------------
const params = new URLSearchParams(window.location.search);
const isFromExtension = params.get("from") === "extension";

if (isFromExtension) {
  const EXTENSION_ID = "ifdgfbffilgkboghknmdongkhjolfdah";

  window.location.href =
    `chrome-extension://${"ifdgfbffilgkboghknmdongkhjolfdah"}/auth.html#token=${data.token}`;

  return; // VERY IMPORTANT: stop normal website flow
}



      /* ---------------- DAILY LIMIT (persist across logins) ---------------- */
      const today = new Date().toDateString();
      const storedDate = localStorage.getItem("sr_daily_date");

      // if first login today OR first time ever → reset
      if (!storedDate || storedDate !== today) {
        localStorage.setItem("sr_daily_date", today);
        localStorage.setItem("sr_daily_count", "0");
      }
      // else — keep the existing count as-is

      setSuccess("Logged in successfully");

      setTimeout(() => onClose(), 700);
    } catch {
      setError("Server error — try again later");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[440px] p-6 shadow-xl relative">

        {/* CLOSE */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500"
        >
          ✕
        </button>

        {/* TITLE */}
        <h2 className="text-2xl font-semibold mb-2">
          {mode === "login" ? "Welcome back" : "Create your account"}
        </h2>

        <p className="text-gray-500 text-sm mb-4">
          {mode === "login"
            ? "Log in to continue using SmartReply AI"
            : "Sign up to get your free daily replies"}
        </p>

        {/* SWITCH */}
        <div className="flex gap-3 mb-4">
          <button
            onClick={() => { setMode("login"); resetMessages(); }}
            className={`px-3 py-1 rounded border ${
              mode === "login" ? "bg-gray-100" : ""
            }`}
          >
            Log in
          </button>

          <button
            onClick={() => { setMode("signup"); resetMessages(); }}
            className={`px-3 py-1 rounded border ${
              mode === "signup" ? "bg-gray-100" : ""
            }`}
          >
            Sign up
          </button>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-3 text-sm text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded">
            {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-3 text-sm text-green-600 bg-green-50 border border-green-200 px-3 py-2 rounded">
            {success}
          </div>
        )}

        {/* SIGNUP NAME */}
        {mode === "signup" && (
          <>
            <label className="text-sm">Full Name</label>
            <input
              className="w-full border rounded px-3 py-2 mb-3"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
            />
          </>
        )}

        {/* EMAIL */}
        <label className="text-sm">Email</label>
        <input
          type="email"
          className="w-full border rounded px-3 py-2 mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* PASSWORD */}
        <label className="text-sm">Password</label>
        <input
          type="password"
          className="w-full border rounded px-3 py-2 mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* CONFIRM */}
        {mode === "signup" && (
          <>
            <label className="text-sm">Confirm Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2 mb-4"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
          </>
        )}

        {/* BUTTON */}
        <button
          onClick={mode === "login" ? handleLogin : handleSignup}
          className="w-full py-2 rounded bg-blue-600 text-white font-medium"
        >
          {mode === "login" ? "Log in" : "Create account"}
        </button>
      </div>
    </div>
  );
}
