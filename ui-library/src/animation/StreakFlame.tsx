import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { Flame, Snowflake } from "lucide-react-native";

import { learningColors } from "../tokens";
import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export type StreakState = "idle" | "active" | "super" | "frozen" | "out";

const colors = {
  active: { fill: learningColors.orange, stroke: "#e87500" },
  super: { fill: learningColors.purple, stroke: "#8549ba" },
  frozen: { fill: learningColors.blue, stroke: "#087eb5" },
  gray: { fill: learningColors.border, stroke: learningColors.hare },
} as const;

export function StreakFlame({
  state,
  size = 96,
}: {
  state: StreakState;
  size?: number;
}) {
  const reducedMotion = useReducedMotion();
  const activeOpacity = useRef(new Animated.Value(0)).current;
  const superOpacity = useRef(new Animated.Value(0)).current;
  const frozenOpacity = useRef(new Animated.Value(0)).current;
  const grayOpacity = useRef(new Animated.Value(1)).current;
  const flicker = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(state === "out" ? 0.55 : 1)).current;
  const lift = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;
  const snow = useRef(new Animated.Value(0)).current;
  const smoke = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const targets: Record<StreakState, [number, number, number, number]> = {
      idle: [0, 0, 0, 1],
      active: [1, 0, 0, 0],
      super: [0, 1, 0, 0],
      frozen: [0, 0, 1, 0],
      out: [0, 0, 0, 1],
    };
    const [active, superStreak, frozen, gray] = targets[state];
    const fades = [activeOpacity, superOpacity, frozenOpacity, grayOpacity].map(
      (value, index) =>
        Animated.timing(value, {
          toValue: [active, superStreak, frozen, gray][index],
          duration: 300,
          useNativeDriver,
        }),
    );
    Animated.parallel(fades).start();

    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(flicker, {
          toValue: 1,
          duration: state === "super" ? 260 : 480,
          useNativeDriver,
        }),
        Animated.timing(flicker, {
          toValue: 0,
          duration: state === "super" ? 260 : 480,
          useNativeDriver,
        }),
      ]),
    );
    flicker.setValue(0);
    if (!reducedMotion && (state === "active" || state === "super")) pulse.start();

    Animated.timing(glow, {
      toValue: state === "super" && !reducedMotion ? 1 : 0,
      duration: 300,
      useNativeDriver,
    }).start();
    Animated.spring(snow, {
      toValue: state === "frozen" ? 1 : 0,
      damping: 8,
      useNativeDriver,
    }).start();

    if (state === "out" && !reducedMotion) {
      Animated.sequence([
        Animated.loop(
          Animated.sequence([
            Animated.timing(scale, {
              toValue: 0.92,
              duration: 80,
              useNativeDriver,
            }),
            Animated.timing(scale, {
              toValue: 1,
              duration: 80,
              useNativeDriver,
            }),
          ]),
          { iterations: 3 },
        ),
        Animated.timing(scale, {
          toValue: 0.55,
          duration: 300,
          useNativeDriver,
        }),
      ]).start();
      Animated.parallel([
        Animated.timing(lift, {
          toValue: size * 0.08,
          duration: 400,
          useNativeDriver,
        }),
        Animated.timing(smoke, {
          toValue: 1,
          duration: 700,
          useNativeDriver,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(scale, {
          toValue: 1,
          damping: 10,
          useNativeDriver,
        }),
        Animated.timing(lift, {
          toValue: 0,
          duration: 250,
          useNativeDriver,
        }),
        Animated.timing(smoke, {
          toValue: 0,
          duration: 150,
          useNativeDriver,
        }),
      ]).start();
    }

    return () => pulse.stop();
  }, [
    activeOpacity,
    flicker,
    frozenOpacity,
    glow,
    grayOpacity,
    lift,
    reducedMotion,
    scale,
    size,
    smoke,
    snow,
    state,
    superOpacity,
  ]);

  const bodyTransform = {
    transform: [
      { translateY: lift },
      { scale },
      {
        scaleY: flicker.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.08],
        }),
      },
      {
        rotate: flicker.interpolate({
          inputRange: [0, 1],
          outputRange: ["-2deg", "2deg"],
        }),
      },
    ],
  };
  const glowStyle = {
    opacity: Animated.multiply(
      glow,
      flicker.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.4] }),
    ),
    transform: [
      {
        scale: flicker.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        }),
      },
    ],
  };

  return (
    <View
      accessibilityLabel={`Streak ${state}`}
      style={{
        width: size,
        height: size,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {state === "super" ? (
        <Animated.View
          style={[
            {
              position: "absolute",
              width: size * 1.35,
              height: size * 1.35,
              borderRadius: size,
              backgroundColor: learningColors.purple,
            },
            glowStyle,
          ]}
        />
      ) : null}
      <Animated.View style={[{ width: size, height: size }, bodyTransform]}>
        <FlameLayer
          opacity={grayOpacity}
          size={size}
          fill={colors.gray.fill}
          stroke={colors.gray.stroke}
        />
        <FlameLayer
          opacity={activeOpacity}
          size={size}
          fill={colors.active.fill}
          stroke={colors.active.stroke}
        />
        <FlameLayer
          opacity={superOpacity}
          size={size}
          fill={colors.super.fill}
          stroke={colors.super.stroke}
        />
        <FlameLayer
          opacity={frozenOpacity}
          size={size}
          fill={colors.frozen.fill}
          stroke={colors.frozen.stroke}
        />
      </Animated.View>
      {state === "out" && !reducedMotion
        ? [0, 1, 2].map((index) => (
            <SmokePuff
              key={index}
              progress={smoke}
              index={index}
              size={size}
            />
          ))
        : null}
      <Animated.View
        style={[
          {
            position: "absolute",
            right: -size * 0.05,
            bottom: 0,
            width: size * 0.38,
            height: size * 0.38,
            borderRadius: size * 0.2,
            backgroundColor: "#dff4ff",
            borderWidth: 2,
            borderColor: learningColors.blue,
            alignItems: "center",
            justifyContent: "center",
          },
          {
            opacity: snow,
            transform: [{ scale: snow }],
          },
        ]}
      >
        <Snowflake size={size * 0.24} color="#087eb5" />
      </Animated.View>
    </View>
  );
}

function FlameLayer({
  opacity,
  size,
  fill,
  stroke,
}: {
  opacity: Animated.Value;
  size: number;
  fill: string;
  stroke: string;
}) {
  return (
    <Animated.View
      style={[
        StyleSheet.absoluteFill,
        { alignItems: "center", justifyContent: "center", opacity },
      ]}
    >
      <Flame size={size} color={stroke} fill={fill} />
    </Animated.View>
  );
}

function SmokePuff({
  progress,
  index,
  size,
}: {
  progress: Animated.Value;
  index: number;
  size: number;
}) {
  const phase = progress.interpolate({
    inputRange: [0, Math.min(1, index * 0.15 + 0.6), 1],
    outputRange: [0, 1, 1],
    extrapolate: "clamp",
  });
  const opacity = phase.interpolate({
    inputRange: [0, 1],
    outputRange: [0.45, 0],
  });

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: size * 0.1,
        left: size / 2 - size * 0.08,
        width: size * 0.16,
        height: size * 0.16,
        borderRadius: size * 0.08,
        backgroundColor: learningColors.hare,
        opacity,
        transform: [
          { translateY: Animated.multiply(phase, -size * 0.6) },
          { translateX: (index - 1) * size * 0.12 },
          {
            scale: phase.interpolate({
              inputRange: [0, 1],
              outputRange: [0.6, 1.4],
            }),
          },
        ],
      }}
    />
  );
}
