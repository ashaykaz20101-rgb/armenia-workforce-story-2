import { createContext, useContext, useEffect, useState } from "react";

export type SlideMode = "live" | "static";

const ModeContext = createContext<SlideMode>("live");
const MetaContext = createContext<{ number: number; total: number }>({ number: 1, total: 1 });

export const SlideModeProvider = ModeContext.Provider;
export const SlideMetaProvider = MetaContext.Provider;
export const useSlideMode = () => useContext(ModeContext);
export const useSlideMeta = () => useContext(MetaContext);

/** Animated number for live slides; static slides (thumbnails, print) show the final value. */
export function useCountUp(target: number, { duration = 1600, delay = 0 } = {}) {
  const mode = useSlideMode();
  const [value, setValue] = useState(mode === "static" ? target : 0);

  useEffect(() => {
    if (mode === "static" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setValue(target);
      return;
    }
    let raf = 0;
    const start = performance.now() + delay;
    const tick = (now: number) => {
      const p = Math.min(1, Math.max(0, (now - start) / duration));
      setValue(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, delay, mode]);

  return value;
}
