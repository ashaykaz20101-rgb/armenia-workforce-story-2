import type { ComponentType } from "react";
import { BudgetSlide, CausesSlide, ChainSlide, DefinitionSlide, ImpactSlide, IntroSlide, TitleSlide } from "./opening";
import { VoteSlide } from "./vote";
import { ArmeniaSlide, ConclusionSlide, ResearchSlide, SolutionsSlide, StatsSlide, ThanksSlide } from "./closing";

export type SlideDef = { id: string; title: string; Component: ComponentType };

export const slides: SlideDef[] = [
  { id: "title", title: "Վերնագիր", Component: TitleSlide },
  { id: "intro", title: "Ներածություն", Component: IntroSlide },
  { id: "definition", title: "Ի՞նչ է գործազրկությունը", Component: DefinitionSlide },
  { id: "causes", title: "Պատճառներ", Component: CausesSlide },
  { id: "impact", title: "Տնտեսական ազդեցություն", Component: ImpactSlide },
  { id: "chain", title: "Շղթայական ազդեցություն", Component: ChainSlide },
  { id: "budget", title: "Պետական բյուջե", Component: BudgetSlide },
  { id: "stats", title: "Վիճակագրություն", Component: StatsSlide },
  { id: "armenia", title: "Գործազրկությունը Հայաստանում", Component: ArmeniaSlide },
  { id: "solutions", title: "Լուծումներ", Component: SolutionsSlide },
  { id: "research", title: "Հետազոտական մաս", Component: ResearchSlide },
  { id: "conclusion", title: "Եզրակացություն", Component: ConclusionSlide },
  { id: "vote", title: "Քվեարկություն", Component: VoteSlide },
  { id: "thanks", title: "Շնորհակալություն", Component: ThanksSlide },
];
