import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { useReducedMotion } from "../../animation/useReducedMotion";
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
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(percentage)).current;

  useEffect(() => {
    if (reducedMotion) {
      progress.setValue(percentage);
      return;
    }

    Animated.timing(progress, {
      toValue: percentage,
      duration: 360,
      useNativeDriver: false,
    }).start();
  }, [percentage, progress, reducedMotion]);

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
      <Animated.View
        style={[
          {
            width: progress.interpolate({
              inputRange: [0, 100],
              outputRange: ["0%", "100%"],
            }),
            height: 16,
            borderRadius: 8,
            backgroundColor: color,
          },
        ]}
      />
    </View>
  );
}
