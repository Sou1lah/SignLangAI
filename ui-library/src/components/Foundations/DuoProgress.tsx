import { View } from "react-native";

import { learningColors } from "../../tokens";

export type DuoProgressProps = {
  value: number;
  color?: string;
};

export function DuoProgress({
  value,
  color = learningColors.green,
}: DuoProgressProps) {
  const percentage = Math.min(100, Math.max(0, value * 100));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(percentage) }}
      style={{
        height: 16,
        overflow: "hidden",
        borderRadius: 8,
        backgroundColor: learningColors.border,
      }}
    >
      <View
        style={{
          width: `${percentage}%`,
          height: 16,
          borderRadius: 8,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
