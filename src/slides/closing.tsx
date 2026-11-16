import {
  BarChart3,
  BriefcaseBusiness,
  Factory,
  GraduationCap,
  Landmark,
  Layers,
  Rocket,
  ShoppingCart,
  Sprout,
  TrendingDown,
  UserCheck,
  Users,
  Wallet,
} from "lucide-react";
import { SlideLayout } from "@/components/slides/SlideLayout";
import { Ambient, IconBadge, ImageFrame, Kicker, d } from "@/components/slides/primitives";
import { useCountUp } from "@/components/slides/slide-context";
import { quarterly2025, statsSource, unemploymentRates } from "./stats-data";
import statsBg from "@/assets/slide-stats.jpg";
import youth from "@/assets/slide-youth.jpg";
import solutions from "@/assets/slide-solutions.jpg";
import survey from "@/assets/slide-survey.jpg";
import conclusion from "@/assets/slide-conclusion.jpg";
import presenter from "@/assets/slide-ai-presenter.jpg";

/* 08 — Statistics */
const CHART_H = 380;
const MAX = 20;

export function StatsSlide() {
  const latest = unemploymentRates[unemploymentRates.length - 1]!;
  const peak = unemploymentRates.find((r) => r.year === 2018)!;
  const rate = useCountUp(latest.rate, { delay: 700 });
  const drop = useCountUp(peak.rate - latest.rate, { delay: 1000 });
  const n = unemploymentRates.length;
  const points = unemploymentRates
    .map((r, i) => `${((i + 0.5) / n) * 1000},${CHART_H - (r.rate / MAX) * CHART_H}`)
    .join(" ");

  return (
    <SlideLayout tone="dark">
      <div className="absolute inset-0 overflow-hidden">
        <img src={statsBg} alt="Երևանը գիշերը" className="anim-kenburns-slow h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-stats" />
      <Ambient grid={false} />
      <div className="relative z-10 px-[120px] pt-[84px]">
        <Kicker tone="dark">04 · Վիճակագրություն</Kicker>
        <h2 className="anim-flip slide-title mt-6 font-display font-bold text-paper" style={d(150)}>
          Գործազրկությունը Հայաստանում՝ թվերով
        </h2>

        <div className="mt-10 grid grid-cols-[500px_1fr] gap-12">
          <div className="space-y-6">
            <div className="anim-zoom3d glass rounded-3xl p-8" style={d(400)}>
              <div className="slide-stat font-display font-bold text-apricot">{rate.toFixed(1)}%</div>
              <div className="slide-body-sm mt-3 text-paper">Գործազրկության մակարդակ, 2025 (տարեկան միջին)</div>
            </div>
            <div className="anim-zoom3d glass rounded-3xl p-8" style={d(600)}>
              <div className="slide-stat-sm font-display font-bold text-paper">−{drop.toFixed(1)} տ.կ.</div>
              <div className="slide-body-sm mt-3 text-mist">Նվազում 2018-ի {peak.rate.toFixed(1)}%-ից</div>
            </div>
            <div className="anim-rise glass rounded-3xl p-7" style={d(800)}>
              <div className="slide-chrome text-mist">2025, ըստ եռամսյակների</div>
              <div className="mt-4 grid grid-cols-4 gap-3">
                {quarterly2025.map((q) => (
                  <div key={q.quarter} className="rounded-xl bg-paper/10 py-3 text-center">
                    <div className="slide-chrome text-mist">{q.quarter}</div>
                    <div className="slide-body font-bold text-paper">{q.rate.toFixed(1)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="anim-swing glass relative rounded-3xl p-10" style={d(350)}>
            <div className="flex items-center justify-between">
              <div className="slide-body font-bold text-paper">Գործազրկության մակարդակ, %</div>
              <div className="slide-chrome flex items-center gap-5 text-mist">
                <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-teal" />Տարեկան</span>
                <span className="flex items-center gap-2"><span className="h-4 w-4 rounded bg-apricot" />Գագաթ / վերջին</span>
              </div>
            </div>
            <div className="relative mt-14" style={{ height: CHART_H }}>
              {[5, 10, 15, 20].map((g) => (
                <div key={g} className="absolute inset-x-0 border-t border-dashed border-paper/15" style={{ bottom: (g / MAX) * CHART_H }}>
                  <span className="slide-chrome absolute -top-3 -left-2 -translate-x-full text-mist/70">{g}</span>
                </div>
              ))}
              <div className="absolute inset-0 flex items-end">
                {unemploymentRates.map((r, i) => {
                  const hi = r.year === 2018 || r.year === latest.year;
                  return (
                    <div key={r.year} className="flex flex-1 flex-col items-center justify-end" style={{ height: "100%" }}>
                      <span className={`anim-rise slide-chrome mb-2 font-bold ${hi ? "text-apricot" : "text-paper"}`} style={d(900 + i * 90)}>
                        {r.rate.toFixed(1)}
                      </span>
                      <div
                        className={`anim-bar w-[54px] rounded-t-xl ${hi ? "bg-gradient-apricot elev-glow" : "bg-teal/80"}`}
                        style={{ height: (r.rate / MAX) * CHART_H, ...d(500 + i * 90) }}
                      />
                    </div>
                  );
                })}
              </div>
              <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" viewBox={`0 0 1000 ${CHART_H}`} preserveAspectRatio="none">
                <polyline
                  points={points}
                  fill="none"
                  className="anim-draw stroke-apricot"
                  strokeWidth="3"
                  vectorEffect="non-scaling-stroke"
                  style={{ ...d(1600), ["--len" as string]: 1400, transform: "translateY(-66px)" }}
                />
              </svg>
            </div>
            <div className="mt-4 flex">
              {unemploymentRates.map((r) => (
                <span key={r.year} className="slide-chrome flex-1 text-center text-mist">{r.year}</span>
              ))}
            </div>
            <p className="slide-chrome mt-6 text-mist/80">{statsSource}</p>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 09 — Armenia's labour market challenges */
const challenges = [
  { icon: Users, title: "Երիտասարդների զբաղվածություն", text: "Շատ շրջանավարտներ չունեն բավարար աշխատանքային փորձ, ինչը դժվարացնում է առաջին աշխատանքի որոնումը։" },
  { icon: GraduationCap, title: "Կրթություն և պահանջարկ", text: "Ցածր պահանջարկ ունեցող մասնագիտությունները մեծացնում են գործազրկության ռիսկը։" },
  { icon: Layers, title: "Զարգացման առաջնահերթություններ", text: "ՓՄՁ-ների աջակցություն, նոր աշխատատեղեր և ժամանակակից մասնագիտական կրթություն։" },
];

export function ArmeniaSlide() {
  return (
    <SlideLayout>
      <div className="grid h-[996px] grid-cols-[560px_1fr] items-center gap-[100px] px-[120px] pb-[30px]">
        <ImageFrame src={youth} alt="Հայաստանի երիտասարդ շրջանավարտներ" className="h-[800px]" from="left" imgStyle={{ objectPosition: "0% 100%" }} />
        <div>
          <Kicker>05 · Հայաստան</Kicker>
          <h2 className="anim-flip slide-title mt-7 font-display font-bold" style={d(150)}>
            Աշխատաշուկայի հիմնական մարտահրավերները
          </h2>
          <div className="mt-11 space-y-6">
            {challenges.map((c, i) => (
              <div key={c.title} className="anim-swing flex items-start gap-7 rounded-3xl border border-line bg-card p-7 elev-card" style={d(450 + i * 180)}>
                <IconBadge icon={c.icon} tone={i === 1 ? "apricot" : "ink"} size={68} />
                <div>
                  <div className="slide-body font-bold">{c.title}</div>
                  <div className="slide-body-sm mt-1 text-muted-foreground">{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 10 — Solutions */
const solutionsList = [
  { icon: BriefcaseBusiness, title: "Փոքր և միջին բիզնես", text: "Նոր աշխատատեղեր և կայուն տնտեսական աճ" },
  { icon: GraduationCap, title: "Մասնագիտական կրթություն", text: "Աշխատաշուկայում պահանջված գիտելիքներ և հմտություններ" },
  { icon: UserCheck, title: "Աջակցություն երիտասարդներին", text: "Պրակտիկայի ծրագրեր և առաջին աշխատանքի հնարավորություն" },
  { icon: Sprout, title: "Ոլորտների զարգացում", text: "Գյուղատնտեսություն, զբոսաշրջություն, արդյունաբերություն, ՏՏ" },
];

export function SolutionsSlide() {
  return (
    <SlideLayout tone="paper">
      <div className="relative px-[120px] pt-[96px]">
        <div className="w-[960px]">
          <Kicker>06 · Լուծումներ</Kicker>
          <h2 className="anim-flip slide-title mt-7 font-display font-bold" style={d(150)}>
            Գործազրկության նվազեցման ուղիները
          </h2>
          <p className="anim-rise slide-body mt-6 text-muted-foreground" style={d(350)}>
            Համալիր միջոցառումները կարող են կրճատել գործազրկությունը և խթանել երկրի տնտեսական զարգացումը։
          </p>
        </div>
        <ImageFrame src={solutions} alt="Երևանյան տեխնոլոգիական ընկերության թիմ" className="absolute right-[120px] top-[80px] h-[400px] w-[640px]" delay={250} radius={24} />
        <div className="persp mt-[120px] grid grid-cols-4 gap-7">
          {solutionsList.map((s, i) => (
            <div key={s.title} className="anim-flip flex flex-col rounded-3xl border border-line bg-card p-8 elev-card" style={d(600 + i * 170)}>
              <div className="flex items-center justify-between">
                <IconBadge icon={s.icon} tone={i % 2 ? "apricot" : "ink"} size={68} />
                <span className="slide-stat-sm font-display font-bold text-line">0{i + 1}</span>
              </div>
              <div className="slide-body mt-6 font-bold">{s.title}</div>
              <div className="slide-body-sm mt-2 text-muted-foreground">{s.text}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 11 — Research part */
const questions = [
  "Արդյո՞ք գործազրկությունը լուրջ խնդիր է երկրի տնտեսության համար։",
  "Ո՞րն է գործազրկության հիմնական պատճառը։",
  "Արդյո՞ք երիտասարդները դժվարանում են աշխատանք գտնել։",
  "Ի՞նչը կարող է օգնել նվազեցնել գործազրկությունը։",
  "Կարո՞ղ է փոքր բիզնեսի զարգացումը նոր աշխատատեղեր ստեղծել։",
];

export function ResearchSlide() {
  return (
    <SlideLayout>
      <div className="grid h-[996px] grid-cols-[560px_1fr] items-center gap-[100px] px-[120px] pb-[30px]">
        <div>
          <ImageFrame src={survey} alt="Հարցման անցկացում" className="h-[540px]" from="left" />
          <div className="mt-12 space-y-4">
            <div className="anim-rise flex items-center gap-5 rounded-2xl bg-ink px-6 py-5 text-paper" style={d(700)}>
              <Users className="shrink-0 text-apricot" size={32} />
              <span className="slide-body-sm">Թիրախ՝ աշակերտներ և մեծահասակներ</span>
            </div>
            <div className="anim-rise flex items-center gap-5 rounded-2xl bg-apricot px-6 py-5 text-ink-deep" style={d(850)}>
              <BarChart3 className="shrink-0" size={32} />
              <span className="slide-body-sm">Արդյունքներ՝ աղյուսակ և գծապատկեր</span>
            </div>
          </div>
        </div>
        <div>
          <Kicker>07 · Հետազոտական մաս</Kicker>
          <h2 className="anim-flip slide-title mt-6 font-display font-bold" style={d(150)}>
            Հարցում՝ հանրային կարծիքի ուսումնասիրություն
          </h2>
          <p className="anim-rise slide-body mt-6 text-muted-foreground" style={d(350)}>
            Նպատակը՝ պարզել մարդկանց կարծիքը գործազրկության պատճառների և հետևանքների մասին։
          </p>
          <ol className="mt-7 space-y-3">
            {questions.map((q, i) => (
              <li key={i} className="anim-swing flex items-center gap-6 rounded-2xl border border-line bg-card px-6 py-3 elev-card" style={d(500 + i * 140)}>
                <span className="slide-body flex h-[54px] w-[54px] shrink-0 items-center justify-center rounded-full bg-ink font-display font-bold text-apricot">{i + 1}</span>
                <span className="slide-body-sm font-medium">{q}</span>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 12 — Conclusion */
const effects = [
  { icon: Factory, label: "Արտադրության նվազում" },
  { icon: Wallet, label: "Եկամտի կրճատում" },
  { icon: ShoppingCart, label: "Սպառման անկում" },
  { icon: Landmark, label: "Բյուջեի պակաս" },
];

export function ConclusionSlide() {
  return (
    <SlideLayout tone="dark">
      <Ambient grid={false} />
      <div className="mask-fade-l absolute right-0 top-0 h-[996px] w-[820px] overflow-hidden">
        <div className="anim-swing h-full w-full" style={d(150)}>
          <img src={conclusion} alt="Հայաստանի ապագայի աշխատողները" className="anim-kenburns h-full w-full object-cover" />
        </div>
      </div>
      <div className="relative z-10 w-[1080px] pl-[120px] pt-[96px]">
        <Kicker tone="dark">Եզրակացություն</Kicker>
        <h2 className="anim-flip slide-title mt-7 font-display font-bold text-paper" style={d(150)}>
          Զբաղվածություն՝ <span className="text-gradient-apricot">զարգացման հիմք</span>
        </h2>
        <div className="mt-9 grid grid-cols-2 gap-4">
          {effects.map((e, i) => (
            <div key={e.label} className="anim-zoom3d glass flex items-center gap-4 rounded-2xl px-6 py-4" style={d(400 + i * 120)}>
              <e.icon className="shrink-0 text-apricot" size={30} />
              <span className="slide-body-sm text-paper">{e.label}</span>
              <TrendingDown className="ml-auto shrink-0 text-apricot/70" size={26} />
            </div>
          ))}
        </div>
        <div className="anim-rise mt-9 flex items-start gap-5" style={d(900)}>
          <Rocket className="mt-1 shrink-0 text-apricot" size={36} />
          <p className="slide-body text-mist">
            Լուծումը՝ տնտեսության զարգացում, փոքր բիզնեսի աջակցություն, նոր աշխատատեղեր և կրթական համակարգի բարելավում։
          </p>
        </div>
        <blockquote className="anim-flip slide-body mt-9 rounded-3xl border-l-[10px] border-apricot bg-paper p-8 font-medium text-ink elev-float" style={d(1150)}>
          «Կարևոր է ոչ միայն նոր աշխատատեղեր ստեղծել, այլև մարդկանց ապահովել համապատասխան մասնագիտական գիտելիքներով»։
        </blockquote>
      </div>
    </SlideLayout>
  );
}

/* 13 — Thank you */
export function ThanksSlide() {
  return (
    <SlideLayout tone="dark">
      <div className="absolute inset-0 overflow-hidden">
        <img src={presenter} alt="AI ներկայացնող" className="anim-kenburns-slow h-full w-full object-cover" />
      </div>
      <div className="absolute inset-0 bg-gradient-title" />
      <Ambient />
      <div className="relative z-10 flex h-[996px] w-[1000px] flex-col justify-center pl-[120px]">
        <Kicker tone="dark">Ամփոփում</Kicker>
        <h2 className="anim-flip slide-title-lg mt-8 font-display font-bold text-paper" style={d(200)}>
          Շնորհակալություն <span className="text-gradient-apricot">ուշադրության</span> համար
        </h2>
        <p className="anim-rise slide-body-lg mt-8 text-mist" style={d(550)}>
          Գործազրկության նվազեցումը նպաստում է թե՛ մարդկանց բարեկեցությանը, թե՛ ամբողջ երկրի զարգացմանը։
        </p>
        <div className="anim-zoom3d glass mt-12 self-start rounded-3xl px-9 py-6" style={d(850)}>
          <div className="slide-chrome text-mist">Ներկայացումը պատրաստել է</div>
          <div className="slide-body mt-2 font-bold text-paper">
            JarvislandAI · <span className="text-apricot">Haykaz Asatryan, CEO</span>
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}
