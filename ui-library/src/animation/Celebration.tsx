import { Text, View } from "react-native";

import { learningColors, radius, spacing, typography } from "../tokens";
import { ConfettiBurst } from "./ConfettiBurst";
import { CountUp } from "./CountUp";

export function Celebration({ xp = 25 }: { xp?: number }) {
  return (
    <View
      accessibilityLabel={`Lesson complete. Earned ${xp} XP.`}
      style={{
        position: "relative",
        maxWidth: 460,
        alignItems: "center",
        gap: spacing.md,
        overflow: "hidden",
        padding: spacing.xl,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: learningColors.border,
        borderRadius: radius.lg,
        backgroundColor: learningColors.snow,
      }}
    >
      <ConfettiBurst trigger={1} count={90} originY={0.1} />
      <Text
        style={{
          color: learningColors.greenDark,
          fontFamily: typography.fontFamily,
          fontSize: 24,
          fontWeight: "900",
        }}
      >
        Lesson complete!
      </Text>
      <Text
        style={{
          color: learningColors.navy,
          fontFamily: typography.fontFamily,
          fontSize: 28,
          fontWeight: "900",
        }}
      >
        <CountUp to={xp} />
      </Text>
    </View>
  );
}
