import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, FileDown, LayoutGrid, Maximize, X } from "lucide-react";
import { slides } from "@/slides/deck";
import { RenderSlide } from "@/components/slides/RenderSlide";
import { ScaledSlide } from "@/components/slides/ScaledSlide";
import { cn } from "@/lib/utils";

type Search = { slide?: number };

export const Route = createFileRoute("/")({
  validateSearch: (s: Record<string, unknown>): Search => {
    const n = Number(s["slide"]);
    return Number.isFinite(n) && n >= 1 ? { slide: Math.floor(n) } : {};
  },
  head: () => ({
    meta: [
      { title: "Գործազրկությունը և երկրի տնտեսությունը — Հետազոտական նախագիծ" },
      {
        name: "description",
        content: "Հետազոտական ներկայացում՝ ինչպես է գործազրկությունը ազդում երկրի տնտեսության վրա, Հայաստանի վիճակագրությամբ։",
      },
      { property: "og:title", content: "Գործազրկությունը և երկրի տնտեսությունը" },
      { property: "og:description", content: "Պատճառներ, տնտեսական հետևանքներ և լուծումներ՝ Հայաստանի օրինակով։" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DeckViewer,
});

const btn =
  "inline-flex items-center gap-2 rounded-full border border-paper/15 bg-paper/5 px-4 py-2 text-sm font-medium text-paper transition-colors hover:bg-paper/15";

function DeckViewer() {
  const { slide } = Route.useSearch();
  const navigate = useNavigate({ from: "/" });
  const total = slides.length;
  const index = Math.min(total, Math.max(1, slide ?? 1)) - 1;
  const [dir, setDir] = useState<"next" | "prev">("next");
  const [grid, setGrid] = useState(false);
  const [presenting, setPresenting] = useState(false);
  const [idle, setIdle] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const touchX = useRef<number | null>(null);

  const go = useCallback(
    (target: number) => {
      const n = Math.min(total - 1, Math.max(0, target));
      if (n === index) return;
      setDir(n > index ? "next" : "prev");
      navigate({ search: { slide: n + 1 }, replace: true });
    },
    [index, total, navigate],
  );

  const present = useCallback(() => {
    stageRef.current?.requestFullscreen?.().catch(() => {});
  }, []);

  useEffect(() => {
    const onChange = () => setPresenting(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", onChange);
    return () => document.removeEventListener("fullscreenchange", onChange);
  }, []);

  useEffect(() => {
    document.title = `${index + 1}/${total} — ${slides[index]!.title}`;
  }, [index, total]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowRight", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        go(index + 1);
      } else if (["ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        go(index - 1);
      } else if (e.key === "Home") go(0);
      else if (e.key === "End") go(total - 1);
      else if (e.key.toLowerCase() === "g") setGrid((g) => !g);
      else if (e.key === "F5" || e.key.toLowerCase() === "f") {
        e.preventDefault();
        present();
      } else if (e.key === "Escape") setGrid(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, index, total, present]);

  useEffect(() => {
    if (!presenting) return setIdle(false);
    let t = window.setTimeout(() => setIdle(true), 2000);
    const onMove = () => {
      setIdle(false);
      window.clearTimeout(t);
      t = window.setTimeout(() => setIdle(true), 2000);
    };
    window.addEventListener("mousemove", onMove);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("mousemove", onMove);
    };
  }, [presenting]);

  return (
    <div className="flex h-screen flex-col bg-ink-deep text-paper">
      <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b border-paper/10 px-4 md:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <span className="h-3 w-3 shrink-0 rotate-45 bg-apricot" />
          <div className="min-w-0">
            <div className="truncate font-display text-base font-bold">Գործազրկությունը և երկրի տնտեսությունը</div>
            <div className="hidden truncate text-xs text-mist sm:block">Created by JarvislandAI CEO Haykaz Asatryan</div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button className={btn} onClick={() => setGrid(true)} aria-label="Բոլոր սլայդները">
            <LayoutGrid size={16} />
            <span className="hidden md:inline">Բոլորը</span>
          </button>
          <a className={btn} href="/print" target="_blank" rel="noreferrer" aria-label="Ներբեռնել PDF">
            <FileDown size={16} />
            <span className="hidden md:inline">PDF</span>
          </a>
          <button
            className="inline-flex items-center gap-2 rounded-full bg-apricot px-4 py-2 text-sm font-semibold text-ink-deep transition-transform hover:scale-105"
            onClick={present}
            aria-label="Ներկայացնել"
          >
            <Maximize size={16} />
            <span className="hidden md:inline">Ներկայացնել</span>
          </button>
        </div>
      </header>

      <div className="flex min-h-0 flex-1">
        <aside className="hidden w-[230px] shrink-0 overflow-y-auto border-r border-paper/10 p-3 md:block">
          {slides.map((s, i) => (
            <button
              key={s.id}
              onClick={() => go(i)}
              className={cn(
                "group mb-3 block w-full rounded-lg p-1 text-left transition-colors",
                i === index ? "bg-apricot/20 ring-2 ring-apricot" : "hover:bg-paper/5",
              )}
            >
              <ScaledSlide className="aspect-video w-full rounded-md">
                <RenderSlide index={i} mode="static" />
              </ScaledSlide>
              <div className="mt-1 flex gap-2 px-1 text-xs text-mist">
                <span className="font-semibold text-paper">{i + 1}</span>
                <span className="truncate">{s.title}</span>
              </div>
            </button>
          ))}
        </aside>

        <main className="flex min-w-0 flex-1 flex-col p-3 md:p-6">
          <div
            ref={stageRef}
            className={cn("stage relative min-h-0 flex-1", presenting && "bg-stage", presenting && idle && "cursor-none")}
            onClick={() => presenting && go(index + 1)}
            onTouchStart={(e) => (touchX.current = (e.touches[0]?.clientX ?? 0))}
            onTouchEnd={(e) => {
              if (touchX.current == null) return;
              const dx = (e.changedTouches[0]?.clientX ?? 0) - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 50) go(dx < 0 ? index + 1 : index - 1);
            }}
          >
            <div key={index} className={cn("absolute inset-0", dir === "next" ? "stage-in-next" : "stage-in-prev")}>
              <ScaledSlide className="h-full w-full">
                <RenderSlide index={index} />
              </ScaledSlide>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-center gap-3">
            <button className={btn} onClick={() => go(index - 1)} disabled={index === 0} aria-label="Նախորդ սլայդ">
              <ChevronLeft size={18} />
            </button>
            <div className="min-w-[180px] text-center text-sm text-mist">
              <span className="font-semibold text-paper">{index + 1}</span> / {total} · {slides[index]!.title}
            </div>
            <button className={btn} onClick={() => go(index + 1)} disabled={index === total - 1} aria-label="Հաջորդ սլայդ">
              <ChevronRight size={18} />
            </button>
          </div>
        </main>
      </div>

      {grid && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-ink-deep/95 p-6 backdrop-blur md:p-10">
          <div className="mb-6 flex items-center justify-between">
            <div className="font-display text-xl font-bold">Բոլոր սլայդները</div>
            <button className={btn} onClick={() => setGrid(false)} aria-label="Փակել">
              <X size={16} />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {slides.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  go(i);
                  setGrid(false);
                }}
                className={cn("rounded-xl p-1.5 text-left", i === index ? "ring-2 ring-apricot" : "hover:bg-paper/5")}
              >
                <ScaledSlide className="aspect-video w-full rounded-lg">
                  <RenderSlide index={i} mode="static" />
                </ScaledSlide>
                <div className="mt-2 flex gap-2 px-1 text-sm text-mist">
                  <span className="font-semibold text-paper">{i + 1}</span>
                  {s.title}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
