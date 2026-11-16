import { useEffect, useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { BarChart3, EyeOff, Smartphone } from "lucide-react";
import { SlideLayout } from "@/components/slides/SlideLayout";
import { Ambient, Kicker, d } from "@/components/slides/primitives";
import { useSlideMode } from "@/components/slides/slide-context";
import { POLL_OPTIONS, POLL_QUESTION, computePercentages, emptyCounts, fetchPollCounts, totalVotes, VOTE_URL, type PollCounts } from "@/lib/poll";
import { cn } from "@/lib/utils";
import voteBg from "@/assets/slide-vote.jpg";

/* Live audience vote: QR opens /vote on phones, button reveals the results in percent. */
export function VoteSlide() {
  const mode = useSlideMode();
  const live = mode === "live";
  const [shown, setShown] = useState(false);
  const [counts, setCounts] = useState<PollCounts>(emptyCounts);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!live || !shown) return;
    let active = true;
    const load = () =>
      fetchPollCounts()
        .then((c) => active && (setCounts(c), setFailed(false)))
        .catch(() => active && setFailed(true));
    load();
    const t = window.setInterval(load, 3000);
    return () => {
      active = false;
      window.clearInterval(t);
    };
  }, [live, shown]);

  const pct = computePercentages(counts);
  const total = totalVotes(counts);
  const top = Math.max(...POLL_OPTIONS.map((o) => pct[o.key]));
  const toggleClass = cn(
    "slide-body-sm inline-flex shrink-0 items-center gap-3 rounded-full px-8 py-4 font-semibold transition-transform hover:scale-105",
    shown ? "border border-paper/20 bg-paper/10 text-paper" : "bg-apricot text-ink-deep elev-glow",
  );
  const toggleContent = (
    <>
      {shown ? <EyeOff size={28} /> : <BarChart3 size={28} />}
      {shown ? "Թաքցնել" : "Ցույց տալ արդյունքները"}
    </>
  );

  return (
    <SlideLayout tone="dark">
      <div className="absolute inset-0 overflow-hidden">
        <img src={voteBg} alt="Լսարանը քվեարկում է հեռախոսներով" className="anim-kenburns-slow h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-stats" />
      <Ambient grid={false} />

      <div className="relative z-10 px-[120px] pt-[84px]">
        <Kicker tone="dark">Ինտերակտիվ քվեարկություն</Kicker>
        <h2 className="anim-flip slide-title mt-6 font-display font-bold text-paper" style={d(150)}>
          {POLL_QUESTION}
        </h2>

        <div className="mt-12 grid grid-cols-[480px_1fr] gap-14">
          <div className="persp">
            <div className="anim-zoom3d p3d" style={d(400)}>
              <div className="anim-float3d rounded-[32px] bg-paper p-8 text-ink elev-float">
                <div className="flex aspect-square w-full items-center justify-center rounded-2xl bg-card">
                  <QRCodeSVG value={VOTE_URL} size={384} level="M" bgColor="transparent" fgColor="currentColor" className="text-ink-deep" />
                </div>
                <div className="mt-6 flex items-center gap-4">
                  <span className="inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-apricot text-ink-deep">
                    <Smartphone size={28} />
                  </span>
                  <div className="slide-body-sm font-bold">Սկանավորեք և քվեարկեք</div>
                </div>
                <div className="slide-chrome mt-4 whitespace-nowrap text-center text-ink/60">{VOTE_URL.replace(/^https?:\/\//, "")}</div>
              </div>
            </div>
          </div>

          <div className="anim-swing glass flex flex-col rounded-[32px] p-10" style={d(600)}>
            <div className="flex items-center justify-between gap-6">
              <div>
                <div className="slide-subtitle font-display font-bold text-paper">Արդյունքներ</div>
                <div className="slide-caption mt-1 text-mist">
                  {shown ? `Քվեարկել է ${total} մարդ${failed ? " · կապը վերականգնվում է…" : ""}` : "Արդյունքները թաքցված են"}
                </div>
              </div>
              {live ? (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShown((v) => !v);
                  }}
                  className={toggleClass}
                >
                  {toggleContent}
                </button>
              ) : (
                <div className={toggleClass}>{toggleContent}</div>
              )}
            </div>

            <div className="mt-10 flex flex-1 flex-col justify-between gap-6">
              {POLL_OPTIONS.map((o, i) => {
                const value = pct[o.key];
                const lead = shown && total > 0 && value === top;
                return (
                  <div key={o.key} className="anim-rise" style={d(800 + i * 120)}>
                    <div className="flex items-center gap-5">
                      <span className={cn("inline-flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl", lead ? "bg-apricot text-ink-deep" : "bg-paper/10 text-apricot")}>
                        <o.icon size={28} />
                      </span>
                      <span className="slide-body-sm flex-1 text-paper">{o.label}</span>
                      <span className={cn("slide-subtitle w-[150px] text-right font-display font-bold", lead ? "text-apricot" : "text-paper")}>
                        {shown ? `${value}%` : "?"}
                      </span>
                    </div>
                    <div className="ml-[76px] mt-3 h-4 overflow-hidden rounded-full bg-paper/10">
                      <div
                        className={cn("h-full rounded-full transition-[width] duration-[1200ms] ease-out", lead ? "bg-gradient-apricot" : "bg-teal")}
                        style={{ width: shown ? `${value}%` : "0%" }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
