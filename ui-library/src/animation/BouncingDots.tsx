import { useEffect, useRef } from "react";
import { Animated, View } from "react-native";

import { learningColors } from "../tokens";
import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export function BouncingDots({
  color = learningColors.green,
  size = 12,
}: {
  color?: string;
  size?: number;
}) {
  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      style={{
        flexDirection: "row",
        gap: 6,
        height: size * 2,
        alignItems: "flex-end",
      }}
    >
      {[0, 1, 2].map((index) => (
        <Dot key={index} index={index} color={color} size={size} />
      ))}
    </View>
  );
}

function Dot({
  index,
  color,
  size,
}: {
  index: number;
  color: string;
  size: number;
}) {
  const reducedMotion = useReducedMotion();
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (reducedMotion) {
      offset.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(index * 140),
        Animated.timing(offset, {
          toValue: -size,
          duration: 300,
          useNativeDriver,
        }),
        Animated.timing(offset, {
          toValue: 0,
          duration: 300,
          useNativeDriver,
        }),
        Animated.delay(300),
      ]),
    );
    loop.start();
    return () => loop.stop();
  }, [index, offset, reducedMotion, size]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        transform: [{ translateY: offset }],
      }}
    />
  );
}
