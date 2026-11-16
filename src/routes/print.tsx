import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { slides } from "@/slides/deck";
import { RenderSlide } from "@/components/slides/RenderSlide";

export const Route = createFileRoute("/print")({
  head: () => ({
    meta: [
      { title: "PDF տարբերակ — Գործազրկությունը և երկրի տնտեսությունը" },
      { name: "description", content: "Ներկայացման բոլոր սլայդները՝ PDF-ով պահպանելու համար։" },
      { property: "og:title", content: "PDF տարբերակ — Գործազրկությունը և երկրի տնտեսությունը" },
      { property: "og:description", content: "Ներկայացման բոլոր սլայդները՝ տպելու կամ PDF-ով պահպանելու համար։" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PrintDeck,
});

function PrintDeck() {
  useEffect(() => {
    const images = Array.from(document.images);
    const waits = images.map((img) =>
      img.complete ? Promise.resolve() : new Promise<void>((r) => img.addEventListener("load", () => r(), { once: true })),
    );
    Promise.all([...waits, document.fonts?.ready]).then(() => window.setTimeout(() => window.print(), 500));
  }, []);

  return (
    <div>
      {slides.map((s, i) => (
        <div key={s.id} className="print-slide">
          <RenderSlide index={i} mode="static" />
        </div>
      ))}
    </div>
  );
}
