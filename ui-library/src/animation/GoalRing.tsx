import { Check } from "lucide-react-native";
import { Text } from "react-native";

import { learningColors, typography } from "../tokens";
import { PopIn } from "./PopIn";
import { ProgressRing } from "./ProgressRing";

export function GoalRing({
  xp,
  goal,
  size = 96,
}: {
  xp: number;
  goal: number;
  size?: number;
}) {
  const done = goal <= 0 || xp >= goal;

  return (
    <ProgressRing
      progress={goal > 0 ? xp / goal : 1}
      size={size}
      color={done ? learningColors.gold : learningColors.green}
    >
      {done ? (
        <PopIn>
          <Check
            size={size * 0.4}
            color={learningColors.navy}
            strokeWidth={4}
          />
        </PopIn>
      ) : (
        <Text
          style={{
            fontFamily: typography.fontFamily,
            color: learningColors.ink,
            fontWeight: "800",
          }}
        >
          {xp}/{goal}
        </Text>
      )}
    </ProgressRing>
  );
}
