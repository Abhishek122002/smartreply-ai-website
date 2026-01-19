import { GoogleGenAI } from "@google/genai";
import { GenerateReplyParams } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateReply = async (params: GenerateReplyParams): Promise<string> => {
  if (!process.env.API_KEY) {
    console.error("API Key is missing");
    return "Error: API Key is missing. Please check your environment configuration.";
  }

  const { context, points, tone, length } = params;

  let prompt = `You are SmartReply, an expert communication assistant. 
  Your goal is to write a reply that feels natural, clear, and confident.
  
  Configuration:
  - Tone: ${tone}
  - Length: ${length}
  
  User's Key Points (What they want to convey):
  "${points}"
  `;

  if (context) {
    prompt += `
    
    Context (The message being replied to):
    "${context}"
    `;
  }

  prompt += `
  
  Instructions:
  1. Do not include subject lines or placeholders like [Your Name] unless necessary.
  2. If the tone is 'Friendly', use contractions and softer language.
  3. If the tone is 'Professional', be direct but polite.
  4. If the tone is 'Formal', use complete sentences and standard business etiquette.
  5. Keep it to the requested length.
  
  Output only the reply text.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });

    return response.text || "Could not generate a reply. Please try again.";
  } catch (error) {
    console.error("Error generating reply:", error);
    return "An error occurred while generating the reply. Please try again later.";
  }
};