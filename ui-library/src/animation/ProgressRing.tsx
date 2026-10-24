import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Animated, View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { learningColors } from "../tokens";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export type ProgressRingProps = {
  progress: number;
  size?: number;
  stroke?: number;
  color?: string;
  track?: string;
  children?: ReactNode;
};

export function ProgressRing({
  progress,
  size = 96,
  stroke = 10,
  color = learningColors.green,
  track = learningColors.border,
  children,
}: ProgressRingProps) {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const value = Math.max(0, Math.min(1, progress));
  const fill = useRef(new Animated.Value(value)).current;

  useEffect(() => {
    Animated.timing(fill, {
      toValue: value,
      duration: 700,
      useNativeDriver: false,
    }).start();
  }, [fill, value]);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: 100, now: Math.round(value * 100) }}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Svg width={size} height={size} style={{ position: "absolute" }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={track}
          strokeWidth={stroke}
          fill="none"
        />
        <AnimatedCircle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={stroke}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={fill.interpolate({
            inputRange: [0, 1],
            outputRange: [circumference, 0],
          })}
          rotation={-90}
          origin={`${size / 2}, ${size / 2}`}
        />
      </Svg>
      {children}
    </View>
  );
}
