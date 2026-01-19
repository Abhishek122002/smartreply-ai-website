import { AppSettings, GeneratedContent } from "../types";

function formatOutput(raw: string, emailMode: boolean): string {
  let text = raw.trim();

  text = text.replace(/\n{3,}/g, "\n\n");

  const hasClosing = /(regards|sincerely|thank you|looking forward)/i.test(text);

  if (!hasClosing) {
    text += emailMode
      ? "\n\nKind regards,\n"
      : "\n\nLooking forward to your response.";
  }

  return text;
}

export async function generateReply(
  replyFor: string,
  points: string[],
  settings: AppSettings
): Promise<GeneratedContent> {
  const { tone, length, emailMode, language } = settings;

  const pointsText =
    points.length > 0
      ? `Key points to include:\n${points.map(p => `- ${p}`).join("\n")}`
      : "";

  const systemPrompt = `
You are a professional communication assistant.
Generate a clear, polite, and well-structured reply.
Avoid repetition.
Keep the tone professional.
`;

  const userPrompt = `
${replyFor ? `Message to reply to:\n"${replyFor}"\n` : ""}
${pointsText}

Tone: ${tone.join(", ")}
Length: ${length}
Language: ${language}
`;

  const res = await fetch("http://localhost:3001/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ systemPrompt, userPrompt }),
  });

  if (!res.ok) {
    throw new Error("AI request failed");
  }

  const data = await res.json();

  return {
    body: formatOutput(data.text, emailMode),
    timestamp: Date.now(),
    settings,
    points,
    inputText: replyFor,
  };
}
