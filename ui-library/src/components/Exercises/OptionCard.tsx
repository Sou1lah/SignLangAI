import { Pressable, Text } from "react-native";
import type { ViewStyle } from "react-native";

import { learningColors, radius, spacing, typography } from "../../tokens";

export type OptionCardState = "idle" | "selected" | "correct" | "wrong";

export type OptionCardProps = {
  label: string;
  state?: OptionCardState;
  visualState?: "default" | "pressed";
};

const stateColors: Record<
  OptionCardState,
  { background: string; border: string; text: string }
> = {
  idle: {
    background: learningColors.snow,
    border: learningColors.border,
    text: learningColors.ink,
  },
  selected: {
    background: "#e5f7ff",
    border: learningColors.blue,
    text: learningColors.navy,
  },
  correct: {
    background: learningColors.greenTint,
    border: learningColors.green,
    text: learningColors.greenDark,
  },
  wrong: {
    background: "#ffeded",
    border: learningColors.red,
    text: learningColors.redDark,
  },
};

export function OptionCard({
  label,
  state = "idle",
  visualState = "default",
}: OptionCardProps) {
  const palette = stateColors[state];
  const pressed = visualState === "pressed";
  const cardStyle: ViewStyle = {
    minHeight: 56,
    justifyContent: "center",
    padding: spacing.lg,
    borderWidth: 2,
    borderBottomWidth: pressed ? 2 : 4,
    borderColor: palette.border,
    borderRadius: radius.md,
    backgroundColor: palette.background,
    marginTop: pressed ? 2 : 0,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: state === "selected" }}
      onPress={() => undefined}
      style={cardStyle}
    >
      <Text
        style={{
          color: palette.text,
          fontFamily: typography.fontFamily,
          fontSize: 17,
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </Pressable>
  );
}
