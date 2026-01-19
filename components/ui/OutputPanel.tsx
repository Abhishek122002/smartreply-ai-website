import { useState } from "react";
import { GeneratedContent } from "../../src/types";
import basket from "../../src/assets/basket.png";

interface Props {
  generatedContent: GeneratedContent | null;
  isGenerating: boolean;

  onSave?: () => void;
  onOpenSaved?: () => void;

  onRegenerate?: () => void;
  onShorten?: () => void;
  onExpand?: () => void;

  isMobile?: boolean;
  onBack?: () => void;
}

export default function OutputPanel({
  generatedContent,
  isGenerating,
  onSave,
  onOpenSaved,
  onRegenerate,
  onShorten,
  onExpand,
  isMobile,
  onBack,
}: Props) {
  const [threadsSavedFeedback, setThreadsSavedFeedback] = useState(false);
  const [saveSuccessMessage, setSaveSuccessMessage] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const handleCopy = async () => {
    if (!generatedContent?.text) return;
    await navigator.clipboard.writeText(generatedContent.text);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 2000);
  };

  const handleSave = () => {
    if (!onSave) return;

    onSave();
    setSaveSuccessMessage(true);
    setTimeout(() => setSaveSuccessMessage(false), 2000);

    if (!isMobile) {
      setThreadsSavedFeedback(true);
      setTimeout(() => setThreadsSavedFeedback(false), 1000);
    }
  };

  const showSave = !!generatedContent && !isGenerating;

  return (
    <div className="h-full w-full bg-white border rounded-xl md:rounded-2xl shadow-sm flex flex-col p-4 md:p-6 relative">
      {copiedToast && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[100] bg-green-600 text-white text-sm px-4 py-2 rounded-lg shadow-md">
          Copied to clipboard
        </div>
      )}

      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold text-sm md:text-base">
          Generated Reply
        </h2>
        
        {saveSuccessMessage && (
        <div className="mb-3 text-sm text-green-600 font-medium">
          ✔ Conversation saved successfully
        </div>
      )}

        {!isMobile && onOpenSaved && (
          <button
            onClick={onOpenSaved}
            className="flex items-center gap-2 px-3 py-1.5 border rounded-md text-sm hover:bg-gray-50"
          >
            <img src={basket} className="w-4 h-4" />
            <span>
              {threadsSavedFeedback ? "Thread Saved" : "Threads"}
            </span>
          </button>
        )}
      </div>

      

      {!!generatedContent && (
        <div className="flex gap-2 justify-end mb-3">
          <button
            onClick={() => onRegenerate && onRegenerate()}
            disabled={isGenerating}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          >
            Rewrite
          </button>

          <button
            onClick={() => onShorten && onShorten()}
            disabled={isGenerating}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          >
            Shorten
          </button>

          <button
            onClick={() => onExpand && onExpand()}
            disabled={isGenerating}
            className="px-3 py-1.5 rounded-lg border text-sm font-medium hover:bg-gray-50 disabled:opacity-60"
          >
            Expand
          </button>
        </div>
      )}

      <div className="flex-1 border rounded-lg p-4 overflow-y-auto">
        {!generatedContent && !isGenerating && (
          <p className="text-gray-400 text-center mt-24">
            Ready to compose
          </p>
        )}

        {generatedContent && (
          <pre className="whitespace-pre-wrap text-sm">
            {generatedContent.text}
          </pre>
        )}
      </div>

      <div className="mt-4 flex gap-2">
        <button
          onClick={handleCopy}
          disabled={!generatedContent}
          className="w-full py-2.5 rounded-lg bg-blue-600 text-white font-medium"
        >
          Copy to clipboard
        </button>

        {showSave && (
          <button
            onClick={handleSave}
            className="w-full py-2.5 rounded-lg bg-green-600 text-white font-medium"
          >
            Save this Reply
          </button>
        )}
      </div>

      {onBack && (
        <button
          onClick={onBack}
          className="md:hidden mt-3 text-sm text-blue-600"
        >
          ← Back
        </button>
      )}
    </div>
  );
}
