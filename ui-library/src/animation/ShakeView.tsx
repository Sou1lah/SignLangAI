import { useEffect, useRef } from "react";
import type { ReactNode } from "react";
import { Animated } from "react-native";

import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export function ShakeView({
  children,
  trigger,
}: {
  children: ReactNode;
  trigger: number;
}) {
  const reducedMotion = useReducedMotion();
  const offset = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (trigger === 0 || reducedMotion) return;
    const animation = Animated.sequence([
      Animated.timing(offset, { toValue: -8, duration: 55, useNativeDriver }),
      Animated.timing(offset, { toValue: 8, duration: 55, useNativeDriver }),
      Animated.timing(offset, { toValue: -6, duration: 55, useNativeDriver }),
      Animated.timing(offset, { toValue: 6, duration: 55, useNativeDriver }),
      Animated.timing(offset, { toValue: 0, duration: 55, useNativeDriver }),
    ]);
    animation.start();
    return () => animation.stop();
  }, [offset, reducedMotion, trigger]);

  return (
    <Animated.View style={{ transform: [{ translateX: offset }] }}>
      {children}
    </Animated.View>
  );
}
