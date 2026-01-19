export enum Tone {
  Professional = "Professional",
  Casual = "Casual",
  Friendly = "Friendly",
  Formal = "Formal",
  Humorous = "Humorous",
}

export enum Length {
  Short = "Short",
  Medium = "Medium",
  Long = "Long",
}

export interface AppSettings {
  tone: Tone[];
  length: Length;
  emailMode: boolean;
  language: string;
}

export interface GeneratedContent {
  subject: string;
  body: string;
  timestamp: number;
  inputText: string;
  points: string[];
  settings: AppSettings;
}

export interface HistoryEntry {
  id: string;
  content: GeneratedContent;
  createdAt: number;
}

export interface Template {
  id: string;
  name: string;
  content: string;
  category: "greeting" | "closing" | "apology" | "thanks" | "custom";
}
export interface SavedConversation {
  id: string;
  replyFor: string;
  points: string[];
  generatedText: string;
  createdAt: number;
}

export interface ThreadMessage {
  role: "user" | "assistant";
  content: string;
}

export interface Thread {
  id: string;
  title: string;
  messages: ThreadMessage[];
  createdAt: number;
  updatedAt: number;
}
