import { useState } from "react";
import { SavedConversation } from "../../src/types";
import copy from "../../src/assets/copy.png";

interface Props {
  items: SavedConversation[];
  onClose: () => void;
  onRemove: (id: string) => void;
  isMobile: boolean;
  open: boolean;
}

export default function SavedConversations({
  items,
  onClose,
  onRemove,
  isMobile,
  open
}: Props) {
  const [active, setActive] = useState<SavedConversation | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);

  const [editingTitle, setEditingTitle] = useState(false);
  const [editingText, setEditingText] = useState(false);

  const handleCopy = async () => {
    if (!active) return;
    await navigator.clipboard.writeText(active.generatedText);

    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const saveToLocalStorage = (updated: SavedConversation[]) => {
    localStorage.setItem("sr_saved", JSON.stringify(updated));
  };

  const updateActive = (updated: SavedConversation) => {
    const list = items.map(i => (i.id === updated.id ? updated : i));
    saveToLocalStorage(list);
    setActive(updated);
  };

  const handleRemove = (id: string) => {
    if (!confirm("Delete this saved reply?")) return;

    if (active?.id === id) setActive(null);
    onRemove(id);
  };

  return (
    <>
      {copiedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-md">
          Copied to clipboard
        </div>
      )}

      <div className={`fixed inset-0 z-40 pointer-events-none`}>
        <div
          className={`
            absolute right-0 top-0 h-full bg-white border-l shadow-lg flex flex-col pointer-events-auto
            transition-transform duration-300
            ${isMobile ? "w-full" : "w-[380px]"}
            ${open ? "translate-x-0" : "translate-x-full"}
          `}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b">
            <h2 className="font-semibold text-base">Saved Conversations</h2>

            <button
              onClick={onClose}
              className="text-sm text-blue-600 font-medium"
            >
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {items.length === 0 && (
              <p className="text-sm text-gray-400 text-center mt-8">
                No saved conversations
              </p>
            )}

            {items.map((c) => (
              <div
                key={c.id}
                className="relative rounded-xl border bg-white shadow-sm hover:shadow-md transition"
              >
                <button
                  type="button"
                  onClick={() => handleRemove(c.id)}
                  className="absolute top-2 right-2 z-10 text-gray-400 hover:text-red-600 text-sm"
                >
                  ✕
                </button>

                <div
                  onClick={() => setActive(c)}
                  className="p-4 cursor-pointer"
                >
                  <p className="text-sm font-medium text-gray-800 line-clamp-2 pr-6">
                    {c.replyFor || "New message"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {active && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-3xl max-h-[90vh] rounded-xl shadow-lg flex flex-col">
            <div className="flex items-center justify-between px-4 py-3 border-b">
              <h3 className="font-semibold text-sm">Saved Conversation</h3>

              <button
                onClick={() => setActive(null)}
                className="text-sm text-blue-600 font-medium"
              >
                ✕
              </button>
            </div>

            <div className="p-5 space-y-6 overflow-y-auto text-sm">

              {/* TITLE (RENAME) */}
              <section>
                <div className="flex justify-between items-center mb-1">
                  <h4 className="font-semibold">Reply for</h4>

                  <button
                    onClick={() => {
                      if (editingTitle) return setEditingTitle(false);
                      setEditingTitle(true);
                    }}
                    className="text-blue-600 text-xs"
                  >
                    {editingTitle ? "Done" : "Edit"}
                  </button>
                </div>

                {!editingTitle ? (
                  <p className="whitespace-pre-wrap text-gray-700">
                    {active.replyFor || "—"}
                  </p>
                ) : (
                  <textarea
                    value={active.replyFor}
                    onChange={e =>
                      updateActive({ ...active, replyFor: e.target.value })
                    }
                    className="w-full border rounded p-2"
                    rows={2}
                  />
                )}
              </section>

              {/* POINTS */}
              <section>
                <h4 className="font-semibold mb-1">Points to include</h4>

                {active.points.length > 3 ? (
                  <ul className="list-disc pl-5 text-gray-700">
                    {active.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-gray-500">
                    {active.points.join(", ") || "—"}
                  </p>
                )}
              </section>

              {/* GENERATED REPLY (EDITABLE) */}
              <section>
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-semibold">Generated Reply</h4>

                  <div className="flex gap-3 items-center">
                    <button
                      onClick={handleCopy}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <img src={copy} alt="Copy" className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setEditingText(v => !v)}
                      className="text-blue-600 text-xs"
                    >
                      {editingText ? "Done" : "Edit"}
                    </button>
                  </div>
                </div>

                {!editingText ? (
                  <pre className="whitespace-pre-wrap text-gray-800">
                    {active.generatedText}
                  </pre>
                ) : (
                  <textarea
                    value={active.generatedText}
                    onChange={e =>
                      updateActive({
                        ...active,
                        generatedText: e.target.value,
                      })
                    }
                    rows={6}
                    className="w-full border rounded p-2"
                  />
                )}
              </section>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
