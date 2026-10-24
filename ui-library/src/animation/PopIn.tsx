import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Animated } from "react-native";

import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export function PopIn({ children }: { children: ReactNode }) {
  const reducedMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(reducedMotion ? 1 : 0.65)).current;
  const opacity = useRef(new Animated.Value(reducedMotion ? 1 : 0)).current;

  useEffect(() => {
    if (reducedMotion) {
      scale.setValue(1);
      opacity.setValue(1);
      return;
    }
    Animated.parallel([
      Animated.spring(scale, {
        toValue: 1,
        damping: 12,
        stiffness: 190,
        useNativeDriver,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 220,
        useNativeDriver,
      }),
    ]).start();
  }, [opacity, reducedMotion, scale]);

  return (
    <Animated.View style={{ opacity, transform: [{ scale }] }}>
      {children}
    </Animated.View>
  );
}
