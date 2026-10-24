import { useEffect, useRef, useState } from "react";
import { Text } from "react-native";
import type { TextStyle } from "react-native";

import { useReducedMotion } from "./useReducedMotion";

export function CountUp({
  to,
  duration = 800,
  style,
}: {
  to: number;
  duration?: number;
  style?: TextStyle;
}) {
  const reducedMotion = useReducedMotion();
  const from = useRef(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      from.current = to;
      setValue(to);
      return;
    }

    const startValue = from.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const next = Math.round(
        startValue + (to - startValue) * (1 - (1 - t) ** 3),
      );
      from.current = next;
      setValue(next);
      if (t < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [duration, reducedMotion, to]);

  return <Text style={style}>{value}</Text>;
}
