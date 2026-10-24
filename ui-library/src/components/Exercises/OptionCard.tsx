import { useRef } from "react";
import { Animated, Pressable, Text } from "react-native";
import type { ViewStyle } from "react-native";

import { learningColors, radius, spacing, typography } from "../../tokens";
import { lightImpact } from "../../animation/feedback";

export type OptionCardState = "idle" | "selected" | "correct" | "wrong";

export type OptionCardProps = {
  label: string;
  state?: OptionCardState;
  visualState?: "default" | "pressed";
  onPress?: () => void;
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
  onPress = () => undefined,
}: OptionCardProps) {
  const palette = stateColors[state];
  const pressed = visualState === "pressed";
  const pressProgress = useRef(new Animated.Value(pressed ? 1 : 0)).current;
  const animatePress = (toValue: number) => {
    Animated.timing(pressProgress, {
      toValue,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };
  const cardStyle: ViewStyle = {
    minHeight: 56,
    justifyContent: "center",
    padding: spacing.lg,
    borderWidth: 2,
    borderColor: palette.border,
    borderRadius: radius.md,
    backgroundColor: palette.background,
  };

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: state === "selected" }}
      onPress={() => {
        lightImpact();
        onPress();
      }}
      onPressIn={() => {
        if (!pressed) animatePress(1);
      }}
      onPressOut={() => {
        if (!pressed) animatePress(0);
      }}
    >
      {() => (
        <Animated.View
          style={[
            cardStyle,
            {
              borderBottomWidth: pressProgress.interpolate({
                inputRange: [0, 1],
                outputRange: [4, 2],
              }),
              transform: [
                {
                  translateY: pressProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 2],
                  }),
                },
              ],
            },
          ]}
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
        </Animated.View>
      )}
    </Pressable>
  );
}
