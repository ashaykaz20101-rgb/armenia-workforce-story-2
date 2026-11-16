import { describe, expect, it } from "vitest";
import { POLL_OPTIONS, computePercentages, emptyCounts } from "@/lib/poll";

describe("poll results", () => {
  it("offers four answers to vote for", () => {
    expect(POLL_OPTIONS).toHaveLength(4);
  });

  it("shows 0% everywhere before anyone votes", () => {
    expect(computePercentages(emptyCounts())).toEqual({ small_business: 0, vocational: 0, youth: 0, industries: 0 });
  });

  it("turns vote counts into percentages", () => {
    const p = computePercentages({ small_business: 2, vocational: 1, youth: 1, industries: 0 });
    expect(p).toEqual({ small_business: 50, vocational: 25, youth: 25, industries: 0 });
  });

  it("percentages always add up to 100", () => {
    const p = computePercentages({ small_business: 1, vocational: 1, youth: 1, industries: 0 });
    expect(p.small_business + p.vocational + p.youth + p.industries).toBe(100);
  });
});
