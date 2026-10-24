import { useEffect, useRef, useState } from "react";
import { Animated, View } from "react-native";

import { learningColors } from "../tokens";
import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export function IndeterminateBar({
  color = learningColors.blue,
  height = 12,
}: {
  color?: string;
  height?: number;
}) {
  const [width, setWidth] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const reducedMotion = useReducedMotion();
  const blockWidth = width * 0.35;

  useEffect(() => {
    if (!width || reducedMotion) {
      progress.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 1,
          duration: 1100,
          useNativeDriver,
        }),
        Animated.timing(progress, {
          toValue: 0,
          duration: 1100,
          useNativeDriver,
        }),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [progress, reducedMotion, width]);

  return (
    <View
      accessibilityRole="progressbar"
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      style={{
        height,
        borderRadius: height / 2,
        backgroundColor: learningColors.border,
        overflow: "hidden",
      }}
    >
      <Animated.View
        style={{
          width: blockWidth,
          height,
          borderRadius: height / 2,
          backgroundColor: color,
          transform: [
            {
              translateX: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [0, Math.max(0, width - blockWidth)],
              }),
            },
          ],
        }}
      />
    </View>
  );
}
