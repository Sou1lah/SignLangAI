import { useEffect, useMemo, useRef } from "react";
import { Animated, StyleSheet, View } from "react-native";

import { learningColors } from "../tokens";
import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

const palette = [
  learningColors.green,
  learningColors.blue,
  learningColors.gold,
  learningColors.orange,
  learningColors.purple,
  learningColors.red,
];
const gravity = 900;

type Piece = {
  id: number;
  vx: number;
  vy: number;
  rotation: number;
  size: number;
  round: boolean;
  color: string;
  left: `${number}%`;
  top: `${number}%`;
};

export type ConfettiBurstProps = {
  trigger: number;
  mode?: "burst" | "rain";
  count?: number;
  duration?: number;
  originY?: number;
};

export function ConfettiBurst({
  trigger,
  mode = "burst",
  count = 70,
  duration = 2000,
  originY = 0.35,
}: ConfettiBurstProps) {
  const reducedMotion = useReducedMotion();
  const progress = useRef(new Animated.Value(0)).current;
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: Math.max(0, count) }, (_, id) => {
        const isRain = mode === "rain";
        return {
          id,
          vx: isRain ? (Math.random() - 0.5) * 80 : (Math.random() - 0.5) * 520,
          vy: isRain ? 120 + Math.random() * 160 : -(250 + Math.random() * 450),
          rotation: (Math.random() - 0.5) * 1080,
          size: 6 + Math.random() * 6,
          round: Math.random() > 0.6,
          color: palette[id % palette.length],
          left: isRain ? `${Math.random() * 100}%` : "50%",
          top: isRain ? "-4%" : `${Math.min(1, Math.max(0, originY)) * 100}%`,
        };
      }),
    [count, mode, originY, trigger],
  );

  useEffect(() => {
    if (!trigger || reducedMotion) {
      progress.setValue(0);
      return;
    }
    progress.setValue(0);
    const animation = Animated.timing(progress, {
      toValue: 1,
      duration,
      useNativeDriver,
    });
    animation.start();
    return () => animation.stop();
  }, [duration, progress, reducedMotion, trigger]);

  if (reducedMotion || !trigger) return null;

  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((piece) => (
        <ConfettiPiece
          key={piece.id}
          piece={piece}
          progress={progress}
          duration={duration}
        />
      ))}
    </View>
  );
}

function ConfettiPiece({
  piece,
  progress,
  duration,
}: {
  piece: Piece;
  progress: Animated.Value;
  duration: number;
}) {
  const seconds = progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, duration / 1000],
  });
  const opacity = progress.interpolate({
    inputRange: [0, 0.7, 1],
    outputRange: [1, 1, 0],
  });

  return (
    <Animated.View
      style={[
        {
          position: "absolute",
          left: piece.left,
          top: piece.top,
          width: piece.size,
          height: piece.round ? piece.size : piece.size * 1.6,
          borderRadius: piece.round ? piece.size / 2 : 2,
          backgroundColor: piece.color,
          opacity,
          transform: [
            {
              translateX: Animated.multiply(seconds, piece.vx),
            },
            {
              translateY: Animated.add(
                Animated.multiply(seconds, piece.vy),
                Animated.multiply(
                  Animated.multiply(seconds, seconds),
                  gravity / 2,
                ),
              ),
            },
            {
              rotate: progress.interpolate({
                inputRange: [0, 1],
                outputRange: ["0deg", `${piece.rotation}deg`],
              }),
            },
          ],
        },
      ]}
    />
  );
}
