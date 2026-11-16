import type { CSSProperties, ComponentType, ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Animation delay helper: style={d(300)} */
export const d = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

export function Kicker({ children, tone = "light", delay = 0 }: { children: ReactNode; tone?: "light" | "dark"; delay?: number }) {
  return (
    <div className={cn("anim-rise slide-kicker flex items-center gap-4", tone === "dark" ? "text-apricot" : "text-apricot-deep")} style={d(delay)}>
      <span className="h-[3px] w-14 rounded-full bg-current" />
      {children}
    </div>
  );
}

export function IconBadge({ icon: Icon, tone = "ink", size = 72 }: { icon: ComponentType<{ size?: number; strokeWidth?: number }>; tone?: "ink" | "apricot" | "glass"; size?: number }) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center rounded-2xl",
        tone === "ink" && "bg-ink text-apricot elev-card",
        tone === "apricot" && "bg-apricot text-ink-deep elev-glow",
        tone === "glass" && "glass text-apricot",
      )}
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.48)} strokeWidth={1.8} />
    </span>
  );
}

type FrameProps = {
  src: string;
  alt: string;
  className?: string;
  imgStyle?: CSSProperties;
  float?: boolean;
  from?: "right" | "left" | "zoom";
  delay?: number;
  radius?: number;
  back?: boolean;
};

/** Image card with 3D entrance, slow 3D float, Ken Burns zoom and a light sheen. */
export function ImageFrame({ src, alt, className, imgStyle, float = true, from = "right", delay = 200, radius = 28, back = true }: FrameProps) {
  const enter = from === "left" ? "anim-swing-left" : from === "zoom" ? "anim-zoom3d" : "anim-swing";
  return (
    <div className={cn("persp relative", className)}>
      <div className={cn(enter, "p3d h-full w-full")} style={d(delay)}>
        <div className={cn("p3d relative h-full w-full", float && "anim-float3d")}>
          {back && (
            <div
              className="absolute inset-0 border-2 border-apricot/70"
              style={{ borderRadius: radius, transform: "translate3d(26px, 26px, -60px)" }}
            />
          )}
          <div className="relative h-full w-full overflow-hidden elev-float" style={{ borderRadius: radius }}>
            <img src={src} alt={alt} className="anim-kenburns h-full w-full object-cover" style={imgStyle} />
            <div className="frame-sheen" />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Animated 3D backdrop for dark slides: drifting light orbs and a moving perspective grid floor. */
export function Ambient({ grid = true }: { grid?: boolean }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="ambient-orb orb-a" />
      <div className="ambient-orb orb-b" />
      {grid && <div className="ambient-grid" />}
    </div>
  );
}
