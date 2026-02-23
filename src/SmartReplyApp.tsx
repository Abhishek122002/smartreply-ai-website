import { useState, useEffect } from "react";

import Header from "./ui/Header";
import InputPanel from "./ui/InputPanel";
import OutputPanel from "./ui/OutputPanel";
import SavedConversations from "./ui/SavedConversations";

import {
  AppSettings,
  GeneratedContent,
  Tone,
  Length,
  SavedConversation,
} from "./types";

import { api } from "./Landing/services/api";

const FREE_LIMIT = 10;

export default function SmartReplyApp() {
  const initialSettings: AppSettings = {
    tone: [Tone.Friendly],
    length: Length.Short,
    emailMode: false,
    language: "English (US)",
  };

  const [replyFor, setReplyFor] = useState("");
  const [points, setPoints] = useState<string[]>([]);
  const [currentPoint, setCurrentPoint] = useState("");
  const [settings, setSettings] = useState<AppSettings>(initialSettings);

  const [chatId, setChatId] = useState<string | null>(null);
  const [threadMessages, setThreadMessages] = useState<any[]>([]);
  const [backendChats, setBackendChats] = useState<any[]>([]);

  const [generatedContent, setGeneratedContent] =
    useState<GeneratedContent | null>(null);

  const [isGenerating, setIsGenerating] = useState(false);
  const [conversationCount, setConversationCount] = useState<number>(0);

  const [saved, setSaved] = useState<SavedConversation[]>(() => {
    const stored = localStorage.getItem("sr_saved");
    return stored ? JSON.parse(stored) : [];
  });

  const [showSaved, setShowSaved] = useState(false);

  const limitReached = conversationCount >= FREE_LIMIT;

  useEffect(() => {
  const token = localStorage.getItem("sr_token");
  const user = localStorage.getItem("sr_user");

  if (!token || !user) return;

  const parsedUser = JSON.parse(user);

  api.getUserChats(token, parsedUser.id)
    .then((data) => {
      console.log("BACKEND CHATS:", data);
      if (Array.isArray(data)) {
        setBackendChats(data);
      }
    })
    .catch((err) => {
      console.error("Failed to load chats:", err);
    });

}, []);

  /* ============================
     GENERATE CHAT
  ============================ */
  const handleGenerate = async () => {
    if (isGenerating) return;

    const token = localStorage.getItem("sr_token");
    const user = localStorage.getItem("sr_user");

    if (!token || !user) {
      alert("Please log in first.");
      return;
    }

    if (!replyFor.trim()) return;

    if (limitReached) {
      alert("Free limit reached.");
      return;
    }

    const parsedUser = JSON.parse(user);

    setIsGenerating(true);

    try {
      const response = await api.createChat(token, {
        userId: parsedUser.id,
        message: replyFor,
        tone: settings.tone[0],
        length: settings.length,
        language: settings.language,
        emailMode: settings.emailMode,
        pointsToInclude: points.join(", "),
        chatId: chatId || undefined,
      });

      console.log("CHAT RESPONSE:", response);

      if (!response?.reply) {
        console.error("No reply returned:", response);
        return;
      }

      setGeneratedContent({ text: response.reply });

      if (response.chatId && !chatId) {
        setChatId(response.chatId);
      }

      setThreadMessages((prev) => [
        ...prev,
        {
          user: replyFor,
          ai: response.reply,
        },
      ]);

      setConversationCount((prev) => prev + 1);

    } catch (err) {
      console.error("Generate failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ============================
     REWRITE / SHORTEN / EXPAND
  ============================ */
  const regenerateWithMode = async (mode: string) => {
    if (!generatedContent?.text) return;

    const token = localStorage.getItem("sr_token");
    const user = localStorage.getItem("sr_user");

    if (!token || !user) return;

    const parsedUser = JSON.parse(user);

    setIsGenerating(true);

    try {
      const response = await api.createChat(token, {
        userId: parsedUser.id,
        message: `${mode.toUpperCase()} this:\n\n${generatedContent.text}`,
        tone: settings.tone[0],
        length: settings.length,
        language: settings.language,
        emailMode: settings.emailMode,
        pointsToInclude: "",
        chatId: chatId || undefined,
      });

      if (response?.reply) {
        setGeneratedContent({ text: response.reply });
      }

    } catch (err) {
      console.error(`${mode} failed:`, err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleRewrite = () => regenerateWithMode("rewrite");
  const handleShorten = () => regenerateWithMode("shorten");
  const handleExpand = () => regenerateWithMode("expand");

  /* ============================
     NEW CHAT
  ============================ */
  const handleNewChat = () => {
    setReplyFor("");
    setGeneratedContent(null);
    setThreadMessages([]);
    setChatId(null);
  };

  /* ============================
     SAVE THREAD
  ============================ */
  const handleSaveThread = () => {
    if (!generatedContent?.text) return;

    const newItem: SavedConversation = {
      id: crypto.randomUUID(),
      replyFor,
      points,
      generatedText: generatedContent.text,
      createdAt: Date.now(),
    };

    const updated = [newItem, ...saved];
    setSaved(updated);
    localStorage.setItem("sr_saved", JSON.stringify(updated));
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50">
      <Header onNewChat={handleNewChat} onOpenHistorySession={() => {}} />

      <div className="flex-1 flex flex-col md:flex-row gap-6 p-6">
        <div className="w-full md:w-1/2">
          <InputPanel
            settings={settings}
            onChangeSettings={setSettings}
            replyFor={replyFor}
            onChangeReplyFor={setReplyFor}
            points={points}
            currentPoint={currentPoint}
            onChangeCurrentPoint={setCurrentPoint}
            onAddPoint={() => {
              if (!currentPoint.trim()) return;
              setPoints((p) => [...p, currentPoint.trim()]);
              setCurrentPoint("");
            }}
            onGenerate={handleGenerate}
            isGenerating={isGenerating}
            conversationCount={conversationCount}
            onOpenSaved={() => setShowSaved(true)}
            externalConfigOpen={false}
            onConfigToggle={() => {}}
          />
        </div>

        <div className="w-full md:w-1/2">
          <OutputPanel
            generatedContent={generatedContent}
            isGenerating={isGenerating}
            onRegenerate={handleRewrite}
            onShorten={handleShorten}
            onExpand={handleExpand}
            onSave={handleSaveThread}
            onOpenSaved={() => setShowSaved(true)}
          />
        </div>
      </div>

      <SavedConversations
        open={showSaved}
        items={backendChats}
        isMobile={false}
        onClose={() => setShowSaved(false)}
        onRemove={(id) => {
          const updated = backendChats.filter((c) => c.id !== id);
          setBackendChats(updated);
          localStorage.setItem("sr_saved", JSON.stringify(updated));
        }}
      />
    </div>
  );
}