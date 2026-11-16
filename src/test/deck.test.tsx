import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { slides } from "@/slides/deck";
import { RenderSlide } from "@/components/slides/RenderSlide";
import { unemploymentRates } from "@/slides/stats-data";

describe("presentation deck", () => {
  it.each(slides.map((s, i) => [s.id, i] as const))("slide %s shows the JarvislandAI credit", (_id, i) => {
    const { container } = render(<RenderSlide index={i} mode="static" />);
    expect(container.textContent).toContain("Created by JarvislandAI CEO Haykaz Asatryan");
  });

  it.each(slides.map((s, i) => [s.id, i] as const))("slide %s has an image", (_id, i) => {
    const { container } = render(<RenderSlide index={i} mode="static" />);
    expect(container.querySelectorAll("img").length).toBeGreaterThan(0);
  });

  it("uses Armstat annual unemployment rates", () => {
    const byYear = Object.fromEntries(unemploymentRates.map((r) => [r.year, r.rate]));
    expect(byYear[2018]).toBe(19.0);
    expect(byYear[2024]).toBe(13.4);
    expect(byYear[2025]).toBe(12.8);
  });
});
