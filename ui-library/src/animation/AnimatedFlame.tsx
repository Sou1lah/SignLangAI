import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Animated } from "react-native";

import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export function AnimatedFlame({
  children,
  active = true,
}: {
  children: ReactNode;
  active?: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!active || reducedMotion) {
      scale.setValue(1);
      return;
    }
    const pulse = Animated.loop(
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 1.06,
          duration: 1000,
          useNativeDriver,
        }),
        Animated.timing(scale, {
          toValue: 1,
          duration: 1000,
          useNativeDriver,
        }),
      ]),
    );
    pulse.start();
    return () => pulse.stop();
  }, [active, reducedMotion, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>{children}</Animated.View>
  );
}
