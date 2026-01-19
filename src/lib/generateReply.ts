import { AppSettings } from "../types";

interface GenerateArgs {
  settings: AppSettings;
  replyFor: string;
  points: string[];
}

export async function generateReply({
  settings,
  replyFor,
  points,
}: GenerateArgs): Promise<string> {
  const systemPrompt = `
You are a helpful assistant.

Tone: ${settings.tone.join(", ") || "Professional"}
Length: ${settings.length}

${
  settings.emailMode
    ? `
EMAIL MODE ENABLED:
- Write a proper email
- Include a greeting (Hi / Dear)
- Use paragraph formatting
- End with a polite closing and sign-off
- Do NOT write like a chat message
`
    : `
MESSAGE MODE:
- Write a normal message or reply
- Do NOT include greetings or sign-offs
- Keep it conversational and direct
`
}
`;

  const userPrompt = `
Context:
${replyFor || "New message"}

Points to include:
${points.map((p, i) => `${i + 1}. ${p}`).join("\n")}
`;

  const res = await fetch("http://localhost:3001/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemPrompt,
      userPrompt,
    }),
  });

  const data = await res.json();
  return data.text;
}
