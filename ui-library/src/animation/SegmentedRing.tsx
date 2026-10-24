import { View } from "react-native";
import Svg, { Circle } from "react-native-svg";

import { learningColors } from "../tokens";

export function SegmentedRing({
  total,
  done,
  size = 96,
  stroke = 10,
  color = learningColors.green,
}: {
  total: number;
  done: number;
  size?: number;
  stroke?: number;
  color?: string;
}) {
  const count = Math.max(1, Math.floor(total));
  const completed = Math.max(0, Math.min(count, Math.floor(done)));
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const step = circumference / count;
  const segmentLength = Math.max(step - stroke - 4, 1);

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max: count, now: completed }}
    >
      <Svg width={size} height={size}>
        {Array.from({ length: count }, (_, index) => (
          <Circle
            key={index}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            strokeWidth={stroke}
            strokeLinecap="round"
            stroke={index < completed ? color : learningColors.border}
            strokeDasharray={`${segmentLength} ${circumference}`}
            strokeDashoffset={-index * step}
            rotation={-90}
            origin={`${size / 2}, ${size / 2}`}
          />
        ))}
      </Svg>
    </View>
  );
}
