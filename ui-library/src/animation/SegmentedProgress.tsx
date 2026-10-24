import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { learningColors } from "../tokens";

export function SegmentedProgress({
  total,
  done,
  color = learningColors.green,
}: {
  total: number;
  done: number;
  color?: string;
}) {
  const count = Math.max(0, Math.floor(total));
  const completed = Math.max(0, Math.min(count, Math.floor(done)));

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: count, now: completed }}
      style={{ flexDirection: "row", gap: 6 }}
    >
      {Array.from({ length: count }, (_, index) => (
        <Segment key={index} filled={index < completed} color={color} />
      ))}
    </View>
  );
}

function Segment({ filled, color }: { filled: boolean; color: string }) {
  const progress = useRef(new Animated.Value(filled ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: filled ? 1 : 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [filled, progress]);

  return (
    <View
      style={{
        flex: 1,
        height: 12,
        borderRadius: 6,
        backgroundColor: learningColors.border,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          width: progress.interpolate({
            inputRange: [0, 1],
            outputRange: ["0%", "100%"],
          }),
          height: 12,
          borderRadius: 6,
          backgroundColor: color,
        }}
      />
    </View>
  );
}
