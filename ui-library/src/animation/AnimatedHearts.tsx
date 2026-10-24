import { useEffect, useRef } from "react";
import { Animated } from "react-native";

import { CloneHeartIcon } from "../components/Icons/CloneReferenceIcons";
import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

export function AnimatedHearts({
  count,
  size = 23,
}: {
  count: number;
  size?: number;
}) {
  const reducedMotion = useReducedMotion();
  const previousCount = useRef(count);
  const scale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (count < previousCount.current && !reducedMotion) {
      Animated.sequence([
        Animated.timing(scale, {
          toValue: 0.78,
          duration: 100,
          useNativeDriver,
        }),
        Animated.spring(scale, {
          toValue: 1,
          damping: 5,
          stiffness: 250,
          useNativeDriver,
        }),
      ]).start();
    }
    previousCount.current = count;
  }, [count, reducedMotion, scale]);

  return (
    <Animated.View style={{ transform: [{ scale }] }}>
      <CloneHeartIcon size={size} />
    </Animated.View>
  );
}
