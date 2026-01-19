import { useEffect, useRef, useState } from "react";
import { Length, AppSettings } from "../../src/types";

interface Props {
  settings: AppSettings;
  onChange: (s: AppSettings) => void;
  forceOpen?: boolean;
  onToggle?: (open: boolean) => void;
}

const TONE_OPTIONS = [
  "Friendly",
  "Professional",
  "Formal",
  "Casual",
  "Polite",
  "Confident",
  "Persuasive",
  "Empathetic",
  "Direct",
  "Neutral",
  "Apologetic",
  "Cheerful",
];

export default function ControlsPanel({
  settings,
  onChange,
  forceOpen,
  onToggle,
}: Props) {
  const isMobile =
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 768px)").matches;

  const [open, setOpen] = useState(false);
  const [toneDropdownOpen, setToneDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (forceOpen !== undefined) {
      setOpen(forceOpen);
    }
  }, [forceOpen]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setToneDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const togglePanel = () => {
    const next = !open;
    setOpen(next);
    onToggle?.(next);
  };

  const toggleTone = (tone: string) => {
    const exists = settings.tone.includes(tone);
    const updated = exists
      ? settings.tone.filter((t) => t !== tone)
      : [...settings.tone, tone];
    onChange({ ...settings, tone: updated });
  };

  const lengths = Object.values(Length) as Length[];

  /* ================= DESKTOP (INLINE – UNCHANGED) ================= */
  if (!isMobile) {
    return (
      <div className="rounded-xl border border-gray-300 bg-white overflow-hidden">
        <button style={{ height: "auto" }}
          onClick={togglePanel}
          className="w-full flex justify-between items-center px-4 py-3 font-semibold bg-gray-50"
        >
          <span className="flex items-center gap-2">
            <span>⚙️</span>
            <span>Configuration</span>
          </span>
          <span>{open ? "▾" : "▸"}</span>
        </button>

        {open && (
          <div className="px-4 pt-4 pb-5 space-y-5">
            {renderContent()}
          </div>
        )}
      </div>
    );
  }

  /* ================= MOBILE (OVERLAY + SCROLL) ================= */
  return (
    <>
      <button 
        onClick={togglePanel}
        className=" w-full flex justify-between items-center px-4 py-3 font-semibold border rounded-xl bg-white"
      >
        <span className="flex items-center gap-2">
          <span>⚙️</span>
          <span>Configuration</span>
        </span>
        <span>▸</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          {/* HEADER */}
          <div className="flex justify-between items-center px-4 py-3 border-b">
            <span className="font-semibold">Configuration</span>
            <button
              onClick={togglePanel}
              className="text-blue-600 font-medium"
            >
              Done
            </button>
          </div>

          {/* SCROLLABLE CONTENT */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
            {renderContent()}
          </div>
        </div>
      )}
    </>
  );

  /* ================= SHARED CONTENT ================= */
  function renderContent() {
    return (
      <>
        {/* TONE */}
        <div ref={dropdownRef}>
          <label className="text-xs font-semibold text-gray-600 mb-2 block">
            TONE
          </label>

          <button
            onClick={() => setToneDropdownOpen((p) => !p)}
            className="w-full min-h-[40px] border rounded-lg px-3 py-2 text-left flex flex-wrap gap-2 items-center"
          >
            {settings.tone.length === 0 ? (
              <span className="text-gray-400 text-sm">
                Select one or more tones
              </span>
            ) : (
              settings.tone.map((t) => (
                <span
                  key={t}
                  className="bg-blue-100 text-blue-700 px-2 py-1 text-xs rounded"
                >
                  {t}
                </span>
              ))
            )}
          </button>

          {toneDropdownOpen && (
            <div className="mt-2 border rounded-lg bg-white shadow-sm max-h-48 overflow-y-auto">
              {TONE_OPTIONS.map((tone) => (
                <label
                  key={tone}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                >
                  <input
                    type="checkbox"
                    checked={settings.tone.includes(tone)}
                    onChange={() => toggleTone(tone)}
                  />
                  {tone}
                </label>
              ))}
            </div>
          )}
        </div>

        {/* LENGTH */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-2 block">
            LENGTH
          </label>
          <div className="flex bg-gray-100 rounded-lg p-0.5">
            {lengths.map((l) => (
              <button
                key={l}
                onClick={() => onChange({ ...settings, length: l })}
                className={`flex-1 py-1.5 text-sm rounded-md ${
                  settings.length === l
                    ? "bg-white shadow font-medium"
                    : "text-gray-600"
                }`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        {/* EMAIL MODE */}
        <div className="flex justify-between items-center">
          <span className="font-medium">📧 Email Mode</span>
          <input
            type="checkbox"
            checked={settings.emailMode}
            onChange={(e) =>
              onChange({ ...settings, emailMode: e.target.checked })
            }
          />
        </div>

        {/* LANGUAGE */}
        <div>
          <label className="text-xs font-semibold text-gray-600 mb-2 block">
            LANGUAGE
          </label>
          <select
            value={settings.language}
            onChange={(e) =>
              onChange({ ...settings, language: e.target.value })
            }
            className="w-full border rounded-lg px-3 py-2"
          >
            <option>English (US)</option>
            <option>English (UK)</option>
            <option>Hindi</option>
            <option>Spanish</option>
          </select>
        </div>
      </>
    );
  }
}
