import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useSlideMeta, useSlideMode } from "./slide-context";

export const CREDIT_TEXT = "Created by JarvislandAI CEO Haykaz Asatryan";

type Tone = "light" | "paper" | "dark";

const toneClass: Record<Tone, string> = {
  light: "bg-paper text-ink",
  paper: "bg-paper-2 text-ink",
  dark: "bg-gradient-ink text-paper",
};

const toneBg: Record<Tone, string> = { light: "var(--paper)", paper: "var(--paper-2)", dark: "var(--ink)" };

const pad = (n: number) => String(n).padStart(2, "0");

export function SlideLayout({ children, tone = "light", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  const { number, total } = useSlideMeta();
  const mode = useSlideMode();
  const dark = tone === "dark";

  return (
    <div
      className={cn("slide-content", toneClass[tone], mode === "static" && "slide-static", className)}
      style={{ ["--slide-bg" as string]: toneBg[tone] }}
    >
      {children}
      <footer
        className={cn(
          "slide-footer absolute inset-x-0 bottom-0 z-30 flex h-[84px] items-center justify-between px-[120px]",
          dark ? "border-t border-paper/10 bg-ink-deep/85 text-mist" : "border-t border-line bg-paper/95 text-ink/70",
        )}
      >
        <div className="flex items-center gap-4">
          <span className="h-3 w-3 rotate-45 bg-apricot" />
          <span>
            Created by <strong className={dark ? "text-paper" : "text-ink"}>JarvislandAI</strong> CEO{" "}
            <strong className={dark ? "text-paper" : "text-ink"}>Haykaz Asatryan</strong>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="tracking-[0.04em] opacity-70">Հետազոտական նախագիծ · Գործազրկություն և տնտեսություն</span>
          <span className={cn("slide-page rounded-full px-5 py-2 font-semibold", dark ? "bg-paper/10 text-paper" : "bg-ink text-paper")}>
            {pad(number)} / {pad(total)}
          </span>
        </div>
      </footer>
    </div>
  );
}
