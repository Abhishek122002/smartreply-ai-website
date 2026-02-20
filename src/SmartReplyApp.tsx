import { useState } from "react";

import Header from "../components/ui/Header";
import InputPanel from "../components/ui/InputPanel";
import OutputPanel from "../components/ui/OutputPanel";
import SavedConversations from "../components/ui/SavedConversations";

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

  /* ============================
     GENERATE (REAL BACKEND)
  ============================ */
  const handleGenerate = async () => {
    if (isGenerating) return;

    const token = localStorage.getItem("sr_token");

    if (!token) {
      alert("Please log in first.");
      return;
    }

    if (!replyFor.trim()) {
      alert("Please enter a message first.");
      return;
    }

    if (limitReached) {
      alert("You reached your free daily limit");
      return;
    }

    setIsGenerating(true);

    try {
      const data = await api.createChat(token, {
        message: replyFor,
      });

      console.log("CHAT RESPONSE:", data);

      if (!data?.reply) {
        console.error("No reply returned");
        return;
      }

      setGeneratedContent({ text: data.reply });
      setConversationCount((prev) => prev + 1);
    } catch (err) {
      console.error("Generate failed:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ============================
     REWRITE / SHORTEN / EXPAND
     (Re-calls backend with current text)
  ============================ */

  const regenerateWithMode = async (mode: string) => {
    if (!generatedContent?.text) return;

    const token = localStorage.getItem("sr_token");
    if (!token) return;

    setIsGenerating(true);

    try {
      const data = await api.createChat(token, {
        message: `${mode.toUpperCase()} this:\n\n${generatedContent.text}`,
      });

      if (data?.reply) {
        setGeneratedContent({ text: data.reply });
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

      <Header
        onNewChat={() => {
          setReplyFor("");
          setGeneratedContent(null);
        }}
        onOpenHistorySession={() => {}}
      />

      <div className="flex-1 flex flex-col md:flex-row gap-6 p-6">

        {/* LEFT PANEL */}
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

        {/* RIGHT PANEL */}
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
        items={saved}
        isMobile={false}
        onClose={() => setShowSaved(false)}
        onRemove={(id) => {
          const updated = saved.filter((c) => c.id !== id);
          setSaved(updated);
          localStorage.setItem("sr_saved", JSON.stringify(updated));
        }}
      />
    </div>
  );
}
