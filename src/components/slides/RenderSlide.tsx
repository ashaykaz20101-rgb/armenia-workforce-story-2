import { slides } from "@/slides/deck";
import { SlideMetaProvider, SlideModeProvider, type SlideMode } from "./slide-context";

export function RenderSlide({ index, mode = "live" }: { index: number; mode?: SlideMode }) {
  const { Component } = slides[index]!;
  return (
    <SlideModeProvider value={mode}>
      <SlideMetaProvider value={{ number: index + 1, total: slides.length }}>
        <Component />
      </SlideMetaProvider>
    </SlideModeProvider>
  );
}
