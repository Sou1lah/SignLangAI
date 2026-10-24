import { useEffect, useRef } from "react";
import { Text, View } from "react-native";
import { Animated } from "react-native";

import { learningColors, radius, spacing, typography } from "../tokens";
import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export type FeedbackKind = "correct" | "wrong";

export function FeedbackSheet({
  kind,
  title,
  message,
}: {
  kind: FeedbackKind;
  title: string;
  message: string;
}) {
  const reducedMotion = useReducedMotion();
  const color =
    kind === "correct" ? learningColors.greenDark : learningColors.redDark;
  const backgroundColor =
    kind === "correct" ? learningColors.greenTint : "#ffeded";
  const translateY = useRef(new Animated.Value(reducedMotion ? 0 : 18)).current;
  const opacity = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;

  useEffect(() => {
    if (reducedMotion) {
      translateY.setValue(0);
      opacity.setValue(1);
      return;
    }
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 280,
        useNativeDriver,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver,
      }),
    ]).start();
  }, [opacity, reducedMotion, translateY]);

  return (
    <Animated.View
      accessibilityRole="alert"
      style={{
        opacity,
        transform: [{ translateY }],
        padding: spacing.lg,
        borderRadius: radius.lg,
        backgroundColor,
        borderColor: color,
        borderWidth: 2,
      }}
    >
      <View style={{ gap: spacing.xs }}>
        <Text
          style={{
            color,
            fontFamily: typography.fontFamily,
            fontSize: 19,
            fontWeight: "900",
          }}
        >
          {title}
        </Text>
        <Text style={{ color, fontFamily: typography.fontFamily, fontSize: 15 }}>
          {message}
        </Text>
      </View>
    </Animated.View>
  );
}
