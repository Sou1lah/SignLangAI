import type { StreakState } from "./StreakFlame";

export function deriveStreakState({
  days,
  doneToday,
  freezeUsed,
  lost,
  superAt = 100,
}: {
  days: number;
  doneToday: boolean;
  freezeUsed: boolean;
  lost: boolean;
  superAt?: number;
}): StreakState {
  if (lost) return "out";
  if (freezeUsed) return "frozen";
  if (!doneToday) return "idle";
  return days >= superAt ? "super" : "active";
}
