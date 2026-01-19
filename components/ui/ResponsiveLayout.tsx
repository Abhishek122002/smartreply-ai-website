import { useLayoutEffect, useState } from "react";
import InputPanel from "./InputPanel";
import OutputPanel from "./OutputPanel";
import { AppSettings, GeneratedContent } from "../../src/types";

interface Props {
  settings: AppSettings;
  onChangeSettings: (s: AppSettings) => void;

  replyFor: string;
  onChangeReplyFor: (v: string) => void;

  points: string[];
  currentPoint: string;
  onChangeCurrentPoint: (v: string) => void;
  onAddPoint: () => void;

  generatedContent: GeneratedContent | null;
  isGenerating: boolean;
  onGenerate: () => void;
}

export default function ResponsiveLayout(props: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    const mq = window.matchMedia("(max-width: 768px)");
    const update = () => setIsMobile(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  return (
    /* OUTER SCROLLER */
    <div className="w-full h-full overflow-x-auto">
      {/* FIXED-WIDTH DASHBOARD CANVAS */}
      <div
        className={`
          min-w-[900px]
          h-full
          grid grid-cols-2
          ${isMobile ? "gap-3 px-3" : "gap-6 px-0"}
        `}
      >
        {/* LEFT PANEL */}
        <div className="h-full">
          <InputPanel {...props} />
        </div>

        {/* RIGHT PANEL */}
        <div className="h-full">
          <OutputPanel
            generatedContent={props.generatedContent}
            isGenerating={props.isGenerating}
          />
        </div>
      </div>
    </div>
  );
}
