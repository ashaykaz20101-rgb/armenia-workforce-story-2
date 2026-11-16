import { BriefcaseBusiness, GraduationCap, Sprout, Users, type LucideIcon } from "lucide-react";

export const POLL_ID = "reduce-unemployment";

/** Public (published) address, so phones can open the vote page without any sign-in. */
export const PUBLIC_SITE_URL = "https://armenia-workforce-story-2.lovable.app";
export const VOTE_URL = `${PUBLIC_SITE_URL}/vote`;
export const POLL_QUESTION = "Ի՞նչը կօգնի նվազեցնել գործազրկությունը";

export type PollOptionKey = "small_business" | "vocational" | "youth" | "industries";

export const POLL_OPTIONS: { key: PollOptionKey; label: string; icon: LucideIcon }[] = [
  { key: "small_business", label: "Փոքր և միջին բիզնեսի աջակցություն", icon: BriefcaseBusiness },
  { key: "vocational", label: "Մասնագիտական կրթության զարգացում", icon: GraduationCap },
  { key: "youth", label: "Երիտասարդների պրակտիկա և աջակցություն", icon: Users },
  { key: "industries", label: "Գյուղատնտեսության, տուրիզմի և IT-ի զարգացում", icon: Sprout },
];

export type PollCounts = Record<PollOptionKey, number>;

export const emptyCounts = (): PollCounts => ({ small_business: 0, vocational: 0, youth: 0, industries: 0 });

/** Whole-number percentages that always add up to 100 (largest remainder); all 0 when nobody voted. */
export function computePercentages(counts: PollCounts): PollCounts {
  const keys = POLL_OPTIONS.map((o) => o.key);
  const total = keys.reduce((s, k) => s + counts[k], 0);
  const result = emptyCounts();
  if (total === 0) return result;
  const raw = keys.map((k) => ({ k, exact: (counts[k] / total) * 100 }));
  raw.forEach(({ k, exact }) => (result[k] = Math.floor(exact)));
  let left = 100 - keys.reduce((s, k) => s + result[k], 0);
  [...raw]
    .sort((a, b) => b.exact - Math.floor(b.exact) - (a.exact - Math.floor(a.exact)))
    .forEach(({ k }) => {
      if (left > 0) {
        result[k] += 1;
        left -= 1;
      }
    });
  return result;
}

export const totalVotes = (counts: PollCounts) => POLL_OPTIONS.reduce((s, o) => s + counts[o.key], 0);

export async function fetchPollCounts(): Promise<PollCounts> {
  const { supabase } = await import("@/integrations/supabase/client");
  const { data, error } = await supabase.rpc("get_poll_results", { p_poll_id: POLL_ID });
  if (error) throw error;
  const counts = emptyCounts();
  for (const row of data ?? []) {
    if (row.option_key in counts) counts[row.option_key as PollOptionKey] = Number(row.votes);
  }
  return counts;
}

const VOTER_KEY = "poll-voter-id";
export const votedKey = `poll-voted-${POLL_ID}`;

function voterId() {
  let id = window.localStorage.getItem(VOTER_KEY);
  if (!id) {
    id = crypto.randomUUID();
    window.localStorage.setItem(VOTER_KEY, id);
  }
  return id;
}

/** Saves one vote per device. Returns "already" when this device has voted before. */
export async function castVote(option: PollOptionKey): Promise<"ok" | "already"> {
  const { supabase } = await import("@/integrations/supabase/client");
  const { error } = await supabase.from("poll_votes").insert({ poll_id: POLL_ID, option_key: option, voter_id: voterId() });
  if (error && error.code !== "23505") throw error;
  window.localStorage.setItem(votedKey, option);
  return error ? "already" : "ok";
}
