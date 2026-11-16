import {
  ArrowDown,
  ArrowRight,
  ArrowUp,

  Cpu,
  Factory,
  GraduationCap,
  Landmark,
  Pause,
  Play,
  RefreshCw,
  Scale,
  ShoppingCart,
  Sparkles,
  Store,
  Target,
  TrendingDown,
  Users,
  Wallet,
} from "lucide-react";
import { SlideLayout } from "@/components/slides/SlideLayout";
import { Ambient, IconBadge, ImageFrame, Kicker, d } from "@/components/slides/primitives";
import { useCountUp, useSlideMode } from "@/components/slides/slide-context";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import presenterPoster from "@/assets/presenter-intro-poster.jpg";
import presenterVideo from "@/assets/presenter-intro.mp4.asset.json";
import yerevan from "@/assets/slide-yerevan.jpg";
import jobseeker from "@/assets/slide-jobseeker.jpg";
import automation from "@/assets/slide-automation.jpg";
import factory from "@/assets/slide-factory.jpg";
import consumption from "@/assets/slide-consumption.jpg";
import budget from "@/assets/slide-budget.jpg";

/* 01 — Title, with the AI presenter */
export function TitleSlide() {
  const rate = useCountUp(12.8, { delay: 1100 });
  const live = useSlideMode() === "live";
  const videoRef = useRef<HTMLVideoElement>(null);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => () => videoRef.current?.pause(), []);

  const toggleSpeech = (e: MouseEvent) => {
    e.stopPropagation();
    const v = videoRef.current;
    if (!v) return;
    if (speaking) {
      v.pause();
      return;
    }
    if (v.ended) v.currentTime = 0;
    v.play().catch(() => setSpeaking(false));
  };
  return (
    <SlideLayout tone="dark">
      <div className="absolute inset-0 overflow-hidden">
        <div className="anim-kenburns-slow relative h-full w-full">
          <img src={presenterPoster} alt="AI ներկայացնող" className="h-full w-full object-cover" />
          {live && (
            <video
              ref={videoRef}
              src={presenterVideo.url}
              poster={presenterPoster}
              playsInline
              preload="auto"
              className="absolute inset-0 h-full w-full object-cover"
              onPlay={() => setSpeaking(true)}
              onPause={() => setSpeaking(false)}
              onEnded={() => setSpeaking(false)}
            />
          )}
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-title" />
      <Ambient />
      <div className="relative z-10 flex h-[996px] w-[1020px] flex-col justify-center pl-[120px]">
        <div className="anim-rise slide-badge self-start rounded-full border border-apricot/60 bg-ink-deep/50 px-6 py-3 tracking-[0.2em] text-apricot" style={d(100)}>
          ՀԵՏԱԶՈՏԱԿԱՆ ՆԱԽԱԳԻԾ
        </div>
        <h1 className="anim-flip slide-title-lg mt-10 font-display font-bold text-paper" style={d(300)}>
          Ինչպե՞ս է գործազրկությունը ազդում <span className="text-gradient-apricot">երկրի տնտեսության</span> վրա
        </h1>
        <p className="anim-rise slide-body-lg mt-10 max-w-[860px] text-mist" style={d(650)}>
          Պատճառներ, տնտեսական հետևանքներ և լուծումներ՝ Հայաստանի օրինակով
        </p>
        <div className="mt-14 flex items-stretch gap-6">
          <div className="anim-zoom3d glass rounded-3xl px-9 py-6" style={d(900)}>
            <div className="slide-stat-sm font-display font-bold text-apricot">{rate.toFixed(1)}%</div>
            <div className="slide-chrome mt-3 text-mist">գործազրկություն Հայաստանում, 2025</div>
          </div>
          <div className="anim-zoom3d glass rounded-3xl px-9 py-6" style={d(1050)}>
            <div className="slide-stat-sm font-display font-bold text-paper">2015–2025</div>
            <div className="slide-chrome mt-3 text-mist">Արմստատի տվյալների վերլուծություն</div>
          </div>
        </div>
      </div>
      {live ? (
        <button
          type="button"
          onClick={toggleSpeech}
          className="anim-swing glass absolute bottom-[150px] right-[110px] z-10 flex items-center gap-4 rounded-full px-7 py-4 transition-transform hover:scale-105"
          style={d(1300)}
        >
          <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-apricot text-ink-deep elev-glow">
            {speaking ? <Pause size={24} /> : <Play size={24} className="ml-1" />}
          </span>
          <span className="slide-chrome text-paper">{speaking ? "Կանգնեցնել" : "Լսել AI ներկայացնողին"}</span>
        </button>
      ) : (
        <div className="anim-swing glass absolute bottom-[150px] right-[110px] z-10 flex items-center gap-4 rounded-full px-6 py-3" style={d(1300)}>
          <Sparkles className="text-apricot" size={26} />
          <span className="slide-chrome text-paper">AI ներկայացնող</span>
        </div>
      )}
    </SlideLayout>
  );
}

/* 02 — Introduction */
const introPoints = [
  { icon: Wallet, text: "Աշխատանքը եկամտի, սոցիալական կայունության և տնտեսական մասնակցության հիմքն է։" },
  { icon: Users, text: "Զբաղվածության բացակայությունը ծնում է տնտեսական և սոցիալական խնդիրների շղթա։" },
  { icon: Target, text: "Նախագծի նպատակը՝ վերլուծել պատճառները, տնտեսական ազդեցությունը և լուծումները։" },
];

export function IntroSlide() {
  return (
    <SlideLayout>
      <div className="grid h-[996px] grid-cols-[1fr_640px] items-center gap-[110px] px-[120px] pb-[40px]">
        <div>
          <Kicker>Ներածություն</Kicker>
          <h2 className="anim-flip slide-title mt-7 font-display font-bold" style={d(150)}>
            Աշխատանքը՝ տնտեսության շարժիչ ուժ
          </h2>
          <p className="anim-rise slide-body mt-7 text-muted-foreground" style={d(350)}>
            Գործազրկությունը ժամանակակից տնտեսության առանցքային մարտահրավերներից է․ այն ազդում է թե՛ յուրաքանչյուր մարդու, թե՛ ամբողջ երկրի զարգացման վրա։
          </p>
          <ul className="mt-12 space-y-7">
            {introPoints.map((p, i) => (
              <li key={i} className="anim-swing flex items-center gap-7" style={d(550 + i * 160)}>
                <IconBadge icon={p.icon} />
                <p className="slide-body font-medium">{p.text}</p>
              </li>
            ))}
          </ul>
        </div>
        <ImageFrame src={yerevan} alt="Երևանը և Արարատը" className="h-[800px]" delay={250} />
      </div>
    </SlideLayout>
  );
}

/* 03 — Definition and types */
const types = [
  { name: "Ֆրիկցիոն", text: "Առաջանում է աշխատանքը փոխելու կամ նոր աշխատանք փնտրելու ընթացքում։" },
  { name: "Կառուցվածքային", text: "Մասնագիտությունն ու հմտությունները չեն համապատասխանում աշխատաշուկայի պահանջներին։" },
  { name: "Ցիկլային", text: "Տնտեսական անկման ժամանակ ընկերությունները կրճատում են արտադրությունն ու աշխատատեղերը։" },
];

export function DefinitionSlide() {
  return (
    <SlideLayout tone="paper">
      <div className="grid h-[996px] grid-cols-[540px_1fr] items-center gap-[100px] px-[120px] pb-[30px]">
        <ImageFrame src={jobseeker} alt="Աշխատանք փնտրող երիտասարդ" className="h-[780px]" from="left" delay={200} />
        <div>
          <Kicker>01 · Սահմանում</Kicker>
          <h2 className="anim-flip slide-title mt-6 font-display font-bold" style={d(150)}>
            Ի՞նչ է գործազրկությունը
          </h2>
          <blockquote className="anim-zoom3d slide-body mt-7 rounded-3xl border-l-[10px] border-apricot bg-ink px-9 py-7 text-paper elev-float" style={d(350)}>
            Տնտեսական երևույթ, երբ աշխատելու <span className="text-apricot">ցանկություն և հնարավորություն</span> ունեցող մարդը չի կարողանում աշխատանք գտնել։
          </blockquote>
          <div className="mt-7 space-y-4">
            {types.map((t, i) => (
              <div key={t.name} className="anim-flip flex items-center gap-6 rounded-2xl border border-line bg-card px-7 py-4 elev-card" style={d(600 + i * 170)}>
                <span className="slide-stat-sm w-[64px] shrink-0 font-display font-bold text-apricot-deep">{i + 1}</span>
                <div>
                  <div className="slide-body font-bold">{t.name}</div>
                  <div className="slide-body-sm text-muted-foreground">{t.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 04 — Causes */
const causes = [
  { icon: TrendingDown, title: "Տնտեսական անկում", text: "Դանդաղ աճի պայմաններում ընկերությունները կրճատում են արտադրությունն ու աշխատակազմը։" },
  { icon: Cpu, title: "Տեխնոլոգիական փոփոխություններ", text: "Ավտոմատացումը փոխարինում է որոշ աշխատանքներ, բայց ստեղծում է նոր մասնագիտություններ։" },
  { icon: GraduationCap, title: "Կրթության և շուկայի անհամապատասխանություն", text: "Անհրաժեշտ գիտելիքների ու հմտությունների պակասը դժվարացնում է աշխատանք գտնելը։" },
  { icon: Store, title: "Փոքր բիզնեսի դժվարություններ", text: "Ընկերությունների փակումը հանգեցնում է աշխատատեղերի կորստի։" },
];

export function CausesSlide() {
  return (
    <SlideLayout>
      <div className="absolute right-0 top-0 h-[996px] w-[680px] overflow-hidden">
        <div className="anim-swing h-full w-full" style={d(150)}>
          <img src={automation} alt="Ավտոմատացում և փակված խանութ" className="anim-kenburns h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-edge-left" />
        <div className="anim-zoom3d glass absolute bottom-[60px] left-[80px] right-[60px] rounded-3xl p-8" style={d(1100)}>
          <div className="slide-kicker text-apricot">Կարևոր</div>
          <p className="slide-body-sm mt-3 text-paper">Տեխնոլոգիաները ոչ միայն վերացնում, այլև ստեղծում են աշխատատեղեր։</p>
        </div>
      </div>
      <div className="relative z-10 w-[1110px] pl-[120px] pt-[90px]">
        <Kicker>02 · Գործազրկության պատճառներ</Kicker>
        <h2 className="anim-flip slide-title mt-7 font-display font-bold" style={d(150)}>
          Հիմնական պատճառները
        </h2>
        <div className="mt-8 divide-y divide-line">
          {causes.map((c, i) => (
            <div key={c.title} className="anim-swing-left flex items-start gap-7 py-5" style={d(400 + i * 170)}>
              <IconBadge icon={c.icon} tone={i % 2 ? "apricot" : "ink"} size={68} />
              <div>
                <div className="slide-body font-bold">{c.title}</div>
                <div className="slide-body-sm mt-1 text-muted-foreground">{c.text}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 05 — Impact on the economy */
const impacts = [
  { icon: Factory, title: "Արտադրության նվազում", text: "Աշխատանքային ռեսուրսները չեն օգտագործվում ամբողջությամբ։" },
  { icon: Wallet, title: "Եկամուտների կրճատում", text: "Ընտանիքները կորցնում են եկամտի հիմնական աղբյուրը։" },
  { icon: ShoppingCart, title: "Սպառման անկում", text: "Նվազում է ապրանքների և ծառայությունների պահանջարկը։" },
  { icon: Landmark, title: "Բյուջեի եկամուտների պակաս", text: "Պակասում են հարկերը, աճում են սոցիալական ծախսերը։" },
];

export function ImpactSlide() {
  return (
    <SlideLayout tone="paper">
      <div className="absolute left-0 top-0 h-[996px] w-[600px] overflow-hidden">
        <div className="anim-swing-left h-full w-full" style={d(150)}>
          <img src={factory} alt="Կանգնեցված արտադրական գիծ" className="anim-kenburns h-full w-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-edge-right" />
      </div>
      <div className="relative z-10 ml-[700px] mr-[120px] pt-[96px]">
        <Kicker>03 · Տնտեսական ազդեցություն</Kicker>
        <h2 className="anim-flip slide-title mt-7 font-display font-bold" style={d(150)}>
          Ինչպե՞ս է գործազրկությունը հարվածում տնտեսությանը
        </h2>
        <div className="persp mt-12 grid grid-cols-2 gap-7">
          {impacts.map((it, i) => (
            <div key={it.title} className="anim-flip rounded-3xl border border-line bg-card p-8 elev-card" style={d(450 + i * 160)}>
              <div className="flex items-center gap-5">
                <IconBadge icon={it.icon} tone={i === 0 || i === 3 ? "ink" : "apricot"} size={64} />
                <span className="slide-stat-sm font-display font-bold text-line">0{i + 1}</span>
              </div>
              <div className="slide-body mt-5 font-bold">{it.title}</div>
              <div className="slide-body-sm mt-2 text-muted-foreground">{it.text}</div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}

/* 06 — Chain effect */
const chain = ["Աշխատանքի կորուստ", "Եկամուտների նվազում", "Սպառման անկում", "Վաճառքների կրճատում", "Աշխատատեղերի կրճատում"];

export function ChainSlide() {
  return (
    <SlideLayout tone="dark">
      <Ambient />
      <div className="relative z-10 px-[120px] pt-[96px]">
        <div className="w-[1040px]">
          <Kicker tone="dark">03 · Դոմինոյի էֆեկտ</Kicker>
          <h2 className="anim-flip slide-title mt-7 font-display font-bold text-paper" style={d(150)}>
            Տնտեսական շղթայական ազդեցություն
          </h2>
          <p className="anim-rise slide-body mt-6 text-mist" style={d(350)}>
            Մեկ օղակի թուլացումը տարածվում է ամբողջ տնտեսությամբ և կարող է վերածվել փակ շրջանի։
          </p>
        </div>
        <ImageFrame src={consumption} alt="Դատարկ խանութ" className="absolute right-[120px] top-[96px] h-[360px] w-[540px]" delay={300} radius={24} />

        <div className="mt-[150px] flex items-center justify-between">
          {chain.map((label, i) => (
            <div key={label} className="flex items-center">
              <div className="anim-flip glass flex h-[180px] w-[300px] flex-col justify-between rounded-3xl p-6" style={d(700 + i * 220)}>
                <span className="slide-kicker text-apricot">Քայլ 0{i + 1}</span>
                <span className="slide-body-sm font-bold text-paper">{label}</span>
              </div>
              {i < chain.length - 1 && (
                <ArrowRight className="anim-pulse-x mx-1 text-apricot" size={34} style={d(i * 200)} />
              )}
            </div>
          ))}
        </div>
        <div className="relative">
        <svg className="mt-2 h-[110px] w-[1680px] overflow-visible" viewBox="0 0 1680 110" fill="none">
          <path
            d="M1538 0 C1538 90 1500 96 1420 96 L262 96 C182 96 142 90 142 0"
            className="anim-draw stroke-apricot"
            strokeWidth="4"
            style={{ ...d(1900), ["--len" as string]: 1500 }}
          />
          <path d="M126 22 L142 0 L158 22" className="stroke-apricot" strokeWidth="4" strokeLinecap="round" />
        </svg>
        <div className="absolute left-[840px] top-[76px] -translate-x-1/2">
          <div className="anim-zoom3d flex items-center gap-3 rounded-full bg-apricot px-6 py-3 text-ink-deep elev-glow" style={d(2300)}>
            <RefreshCw size={24} className="anim-spin-slow" />
            <span className="slide-chrome font-bold">Փակ շրջան</span>
          </div>
        </div>
        </div>
      </div>
    </SlideLayout>
  );
}

/* 07 — State budget */
export function BudgetSlide() {
  return (
    <SlideLayout>
      <div className="absolute right-0 top-0 h-[996px] w-[600px] overflow-hidden">
        <div className="anim-swing h-full w-full" style={d(150)}>
          <img src={budget} alt="Պետական բյուջե" className="anim-kenburns h-full w-full object-cover" style={{ objectPosition: "45% 60%" }} />
        </div>
        <div className="absolute inset-0 bg-edge-left" />
      </div>
      <div className="relative z-10 flex h-[996px] w-[1200px] flex-col justify-center pb-[30px] pl-[120px]">
        <Kicker>03 · Պետական ֆինանսներ</Kicker>
        <h2 className="anim-flip slide-title mt-7 font-display font-bold" style={d(150)}>
          Ճնշում պետական բյուջեի վրա
        </h2>
        <p className="anim-rise slide-body mt-6 text-muted-foreground" style={d(350)}>
          Աշխատող մարդիկ ստանում են աշխատավարձ և վճարում հարկեր․ գործազրկության աճը խախտում է բյուջեի հավասարակշռությունը։
        </p>
        <div className="persp mt-11 grid grid-cols-2 gap-7">
          <div className="anim-flip rounded-3xl bg-ink p-9 text-paper elev-float" style={d(550)}>
            <IconBadge icon={ArrowDown} tone="apricot" size={68} />
            <div className="slide-body mt-6 font-bold">Հարկային եկամուտներ</div>
            <div className="slide-subtitle mt-2 font-display font-bold text-apricot">նվազում են</div>
            <div className="slide-body-sm mt-3 text-mist">Ավելի քիչ աշխատավարձ՝ ավելի քիչ հարկ</div>
          </div>
          <div className="anim-flip rounded-3xl bg-gradient-apricot p-9 text-ink-deep elev-glow" style={d(720)}>
            <IconBadge icon={ArrowUp} tone="ink" size={68} />
            <div className="slide-body mt-6 font-bold">Սոցիալական ծախսեր</div>
            <div className="slide-subtitle mt-2 font-display font-bold">աճում են</div>
            <div className="slide-body-sm mt-3 text-ink">Ավելանում է աջակցության կարիք ունեցողների թիվը</div>
          </div>
        </div>
        <div className="anim-rise mt-9 flex items-center gap-5" style={d(950)}>
          <Scale className="text-apricot-deep" size={40} />
          <p className="slide-body font-semibold">Արդյունքում բարդանում է պետական բյուջեի կառավարումը։</p>
        </div>
      </div>
    </SlideLayout>
  );
}

