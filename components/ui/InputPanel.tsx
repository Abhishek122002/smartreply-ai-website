import { useState, useEffect, KeyboardEvent } from "react";
import ControlsPanel from "./ControlsPanel";
import { AppSettings } from "../../src/types";

interface Props {
  settings: AppSettings;
  onChangeSettings: (s: AppSettings) => void;
  replyFor: string;
  onChangeReplyFor: (v: string) => void;
  points: string[];
  currentPoint: string;
  onChangeCurrentPoint: (v: string) => void;
  onAddPoint: () => void;
  onGenerate: () => void;
  isGenerating: boolean;
  externalConfigOpen?: boolean;
  onConfigToggle?: (open: boolean) => void;
  conversationCount?: number;
}

export default function InputPanel({
  settings,
  onChangeSettings,
  replyFor,
  onChangeReplyFor,
  currentPoint,
  onChangeCurrentPoint,
  onAddPoint,
  onGenerate,
  isGenerating,
  externalConfigOpen,
  onConfigToggle,
  conversationCount = 0,
}: Props) {
  const [configOpen, setConfigOpen] = useState(externalConfigOpen ?? false);

  // image state
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // popup state
  const [isImagePreviewOpen, setIsImagePreviewOpen] = useState(false);

  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  
const FREE_LIMIT = 10;
const Available = Math.max(FREE_LIMIT - conversationCount, 0);

  useEffect(() => {
    if (externalConfigOpen !== undefined) {
      setConfigOpen(externalConfigOpen);
    }
  }, [externalConfigOpen]);

  // generate preview URL
  useEffect(() => {
    if (!image) {
      setImagePreview(null);
      return;
    }

    const url = URL.createObjectURL(image);
    setImagePreview(url);

    return () => URL.revokeObjectURL(url);
  }, [image]);

  const handlePointKeyDown = (
    e: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && currentPoint.trim()) {
      e.preventDefault();
      onAddPoint();
    }
  };

  // ✅ helper: truncate filename to 10 characters
  const getDisplayFileName = (fileName: string) => {
    const parts = fileName.split(".");
    const ext = parts.pop();
    const baseName = parts.join(".");

    if (baseName.length <= 10) {
      return `${baseName}.${ext}`;
    }

    return `${baseName.slice(0, 10)}....${ext}`;
  };

  return (
    <>
      <div
        className={`relative h-full w-full bg-white border rounded-xl md:rounded-2xl shadow-sm flex flex-col p-4 md:p-6 ${
          configOpen && !isMobile ? "overflow-y-auto" : "overflow-hidden"
        }`}
      >
        {/* HEADER */}
        <div className="flex items-center justify-between mb-2">
          <label className="font-medium">Reply for</label>

          <label className="text-sm text-blue-600 cursor-pointer">
            Upload image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) =>
                e.target.files && setImage(e.target.files[0])
              }
            />
          </label>
        </div>

        {/* TEXTAREA */}
        <div className="relative mb-4">
          <textarea
            rows={5}
            value={replyFor}
            onChange={(e) => onChangeReplyFor(e.target.value)}
            className="w-full min-h-[140px] border rounded-lg p-3 resize-y pr-3 pb-20"
            placeholder="Type the message you are replying to…"
          />

          {/* IMAGE TAG */}
          {image && imagePreview && (
            <div
              onClick={() => setIsImagePreviewOpen(true)}
              className="absolute bottom-2 left-2 flex items-center gap-2 bg-gray-100 border rounded-md px-2 py-1 text-xs max-w-[240px] cursor-pointer mb-2 ml-1"
            >
              <img
                src={imagePreview}
                alt="Uploaded preview"
                className="w-10 h-10 object-cover rounded-md border"
              />

              <span className="truncate max-w-[140px]">
                {getDisplayFileName(image.name)}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setImage(null);
                }}
                className="text-red-500 hover:text-red-600 font-bold"
                title="Remove image"
              >
                ✕
              </button>
            </div>
          )}
        </div>

        <label className="font-medium mb-1">Points to include</label>
        <input
          value={currentPoint}
          onChange={(e) => onChangeCurrentPoint(e.target.value)}
          onKeyDown={handlePointKeyDown}
          placeholder="Add a point..."
          className="w-full border rounded-lg px-3 py-2 mb-4"
        />

        <button
          onClick={onGenerate}
          disabled={isGenerating}
          className="w-full py-2.5 bg-blue-600 text-white rounded-lg font-medium"
        >
          {isGenerating ? "Generating..." : "Generate Reply"}
        </button>

        {/* PROGRESS */}
        {/* PROGRESS */}
<div className="mt-7 mb-3">

  {(() => {
    const FREE_LIMIT = 10;
    const available = Math.max(FREE_LIMIT - conversationCount, 0);

    return (
      <>
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span>Free Generations Available</span>
          <span>{available}/10</span>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600 transition-all"
            style={{
              width: `${((FREE_LIMIT - available) / FREE_LIMIT) * 100}%`,
            }}
          />
        </div>
      </>
    );
  })()}
</div>

        {/* CONFIGURATION */}
        <div className="mt-4">
          <ControlsPanel
            settings={settings}
            onChange={onChangeSettings}
            forceOpen={configOpen}
            onToggle={onConfigToggle}
          />
        </div>
      </div>

      {/* IMAGE PREVIEW POPUP */}
      {isImagePreviewOpen && imagePreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="relative bg-white rounded-xl max-w-3xl w-full p-4">
            <button
              onClick={() => setIsImagePreviewOpen(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl"
            >
              ✕
            </button>

            <img
              src={imagePreview}
              alt="Full preview"
              className="w-full max-h-[80vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </>
  );
}
