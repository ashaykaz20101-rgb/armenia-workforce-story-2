import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Renders a 1920x1080 slide scaled to fit its container. */
export function ScaledSlide({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setScale(Math.min(el.clientWidth / 1920, el.clientHeight / 1080));
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="slide-wrapper" style={{ ["--scale" as string]: scale }}>
        {children}
      </div>
    </div>
  );
}
