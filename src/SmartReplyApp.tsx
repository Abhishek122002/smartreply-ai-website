import { useEffect, useState } from "react";

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

  // all replies created in current session
  const [threadMessages, setThreadMessages] = useState<any[]>([]);

  // saved replies
  const [saved, setSaved] = useState<SavedConversation[]>(() => {
    const stored = localStorage.getItem("sr_saved");
    return stored ? JSON.parse(stored) : [];
  });

  const [showSaved, setShowSaved] = useState(false);

  // daily usage
  const [conversationCount, setConversationCount] = useState<number>(0);

  // 👇 new — modal viewer for history
  const [viewSession, setViewSession] = useState<any | null>(null);

  /* LOAD DAILY USAGE */
  useEffect(() => {
    const token = localStorage.getItem("sr_token");
    if (!token) return;

    fetch("http://localhost:3001/api/usage", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data?.count !== undefined) setConversationCount(data.count);
      })
      .catch(() => {});
  }, []);

  const limitReached = conversationCount >= FREE_LIMIT;

  /* ---------------------------------------
     SAVE SESSION TO HISTORY (ChatGPT style)
  --------------------------------------- */
  const saveSessionToHistory = (session: any) => {
    const existing = JSON.parse(localStorage.getItem("sr_history") || "[]");

    const updated = [session, ...existing];

    localStorage.setItem("sr_history", JSON.stringify(updated));

    // refresh Header automatically
    window.dispatchEvent(new Event("storage"));
  };

  /* ---------------------------------------
     NEW CHAT — saves current session then resets
  --------------------------------------- */
  const handleNewChat = () => {
    if (threadMessages.length > 0) {
      const session = {
        id: crypto.randomUUID(),
        createdAt: Date.now(),
        conversations: threadMessages,
      };

      saveSessionToHistory(session);
    }

    setReplyFor("");
    setPoints([]);
    setCurrentPoint("");
    setGeneratedContent(null);
    setThreadMessages([]);
  };

  /* ---------------------------------------
     GENERATE
  --------------------------------------- */
  const handleGenerate = async () => {
    if (isGenerating) return;

    const token = localStorage.getItem("sr_token");
    if (!token) {
      alert("Please log in first.");
      return;
    }

    if (limitReached) {
      alert("You reached your free daily limit");
      return;
    }

    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ replyFor, points, settings }),
      });

      if (!res.ok) return;

      const data = await res.json();

      const message = {
        replyFor,
        points,
        result: data.text,
      };

      setGeneratedContent({ text: data.text });
      setThreadMessages((prev) => [...prev, message]);
      setConversationCount((prev) => prev + 1);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  /* ---------------------------------------
     REWRITE
  --------------------------------------- */
  const handleRewrite = async () => {
    if (!generatedContent?.text) return;

    const token = localStorage.getItem("sr_token");
    if (!token) return;

    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode: "rewrite",
          currentText: generatedContent.text,
          settings,
        }),
      });

      const data = await res.json();
      if (data?.text) setGeneratedContent({ text: data.text });
    } finally {
      setIsGenerating(false);
    }
  };

  /* ---------------------------------------
     SHORTEN
  --------------------------------------- */
  const handleShorten = async () => {
    if (!generatedContent?.text) return;

    const token = localStorage.getItem("sr_token");
    if (!token) return;

    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode: "shorten",
          currentText: generatedContent.text,
          settings,
        }),
      });

      const data = await res.json();
      if (data?.text) setGeneratedContent({ text: data.text });
    } finally {
      setIsGenerating(false);
    }
  };

  /* ---------------------------------------
     EXPAND
  --------------------------------------- */
  const handleExpand = async () => {
    if (!generatedContent?.text) return;

    const token = localStorage.getItem("sr_token");
    if (!token) return;

    setIsGenerating(true);

    try {
      const res = await fetch("http://localhost:3001/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          mode: "expand",
          currentText: generatedContent.text,
          settings,
        }),
      });

      const data = await res.json();
      if (data?.text) setGeneratedContent({ text: data.text });
    } finally {
      setIsGenerating(false);
    }
  };

  /* ---------------------------------------
     SAVE REPLY MANUALLY
  --------------------------------------- */
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
    <div className="h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-50 overflow-hidden">
      <Header
        onNewChat={handleNewChat}
        onOpenHistorySession={(session) => setViewSession(session)}
      />

      {/* 👇 READ-ONLY HISTORY VIEWER */}
      {viewSession && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl w-[780px] max-h-[90vh] overflow-y-auto p-6 relative">
            <button
              onClick={() => setViewSession(null)}
              className="absolute right-4 top-4"
            >
              ✕
            </button>

            <h2 className="text-xl font-semibold mb-4">
              Conversation history
            </h2>

            {viewSession.conversations.map((c: any, i: number) => (
              <div key={i} className="mb-6 border-b pb-4">
                <p className="font-semibold">Reply for</p>
                <p className="whitespace-pre-wrap mb-2">{c.replyFor}</p>

                {c.points?.length > 0 && (
                  <>
                    <p className="font-semibold">Points to include</p>
                    <ul className="list-disc ml-6 mb-2">
                      {c.points.map((p: string, idx: number) => (
                        <li key={idx}>{p}</li>
                      ))}
                    </ul>
                  </>
                )}

                <p className="font-semibold">Generated reply</p>
                <pre className="whitespace-pre-wrap">{c.result}</pre>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 flex gap-6 p-6 overflow-hidden">
        <div className="w-1/2">
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
            externalConfigOpen={true}
            onConfigToggle={() => {}}
          />
        </div>

        <div className="w-1/2">
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
