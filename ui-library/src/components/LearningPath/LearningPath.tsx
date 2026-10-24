import { useEffect, useRef } from "react";
import { Animated, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import { BookOpen, Check, Lock, Star } from "lucide-react-native";

import { DuoProgress } from "../Foundations/DuoProgress";
import { useReducedMotion } from "../../animation/useReducedMotion";
import { learningColors, radius, spacing, typography } from "../../tokens";

export type LessonStatus = "completed" | "current" | "available" | "locked";

export type LearningPathLesson = {
  id: string;
  title: string;
  status: LessonStatus;
};

export type LearningPathUnit = {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  lessons: LearningPathLesson[];
};

export type LearningPathProps = {
  units: LearningPathUnit[];
};

const rowHeight = 100;
const nodeSize = 68;
const nodePositions = [180, 90, 180, 270] as const;

export function LearningPath({ units }: LearningPathProps) {
  return (
    <View style={{ width: "100%", maxWidth: 440, gap: spacing.xl }}>
      {units.map((unit) => (
        <UnitPath key={unit.id} unit={unit} />
      ))}
    </View>
  );
}

function UnitPath({ unit }: { unit: LearningPathUnit }) {
  const completed = unit.lessons.filter(
    (lesson) => lesson.status === "completed",
  ).length;
  const progress = unit.lessons.length
    ? completed / unit.lessons.length
    : 0;
  const pathHeight = unit.lessons.length * rowHeight;
  const points = unit.lessons.map((_, index) => ({
    x: nodePositions[index % nodePositions.length],
    y: nodeSize / 2 + index * rowHeight,
  }));

  return (
    <View
      style={{
        padding: spacing.lg,
        borderWidth: 2,
        borderColor: learningColors.border,
        borderRadius: radius.lg,
        backgroundColor: learningColors.snow,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.md,
          marginBottom: spacing.sm,
        }}
      >
        <View
          style={{
            width: 8,
            alignSelf: "stretch",
            borderRadius: radius.pill,
            backgroundColor: unit.color,
          }}
        />
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{
              color: learningColors.ink,
              fontFamily: typography.fontFamily,
              fontSize: 18,
              fontWeight: "900",
            }}
          >
            {unit.title}
          </Text>
          <Text
            style={{
              color: learningColors.muted,
              fontFamily: typography.fontFamily,
              fontSize: 13,
            }}
          >
            {unit.subtitle}
          </Text>
        </View>
        <Text
          style={{
            color: unit.color,
            fontFamily: typography.fontFamily,
            fontSize: 13,
            fontWeight: "900",
          }}
        >
          {completed}/{unit.lessons.length}
        </Text>
      </View>
      <DuoProgress value={progress} color={unit.color} />
      {unit.lessons.length > 0 ? (
        <View style={{ height: pathHeight, position: "relative", marginTop: spacing.md }}>
          <Svg
            width="100%"
            height={pathHeight}
            viewBox={`0 0 360 ${pathHeight}`}
            preserveAspectRatio="none"
            style={{ position: "absolute", top: 0, left: 0 }}
          >
            {points.slice(0, -1).map((point, index) => {
              const next = points[index + 1];
              const halfway = (point.y + next.y) / 2;
              const color =
                unit.lessons[index].status === "completed"
                  ? unit.color
                  : learningColors.border;

              return (
                <Path
                  key={unit.lessons[index].id}
                  d={`M ${point.x} ${point.y} C ${point.x} ${halfway}, ${next.x} ${halfway}, ${next.x} ${next.y}`}
                  fill="none"
                  stroke={color}
                  strokeWidth={12}
                  strokeLinecap="round"
                />
              );
            })}
          </Svg>
          {unit.lessons.map((lesson, index) => (
            <LessonNode
              key={lesson.id}
              lesson={lesson}
              color={unit.color}
              left={`${(nodePositions[index % nodePositions.length] / 360) * 100}%`}
              top={index * rowHeight}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

function LessonNode({
  lesson,
  color,
  left,
  top,
}: {
  lesson: LearningPathLesson;
  color: string;
  left: string;
  top: number;
}) {
  const reducedMotion = useReducedMotion();
  const pulse = useRef(new Animated.Value(1)).current;
  const isLocked = lesson.status === "locked";
  const isCurrent = lesson.status === "current";
  const backgroundColor =
    lesson.status === "completed"
      ? color
      : isCurrent
        ? color
        : isLocked
          ? learningColors.canvas
          : learningColors.snow;
  const borderColor = isLocked ? learningColors.border : color;
  const iconColor =
    lesson.status === "completed" || isCurrent
      ? learningColors.snow
      : isLocked
        ? learningColors.muted
        : color;
  const Icon =
    lesson.status === "completed"
      ? Check
      : isLocked
        ? Lock
        : isCurrent
          ? BookOpen
          : Star;

  useEffect(() => {
    if (!isCurrent || reducedMotion) {
      pulse.setValue(1);
      return;
    }
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1.06,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ]),
    );
    animation.start();
    return () => animation.stop();
  }, [isCurrent, pulse, reducedMotion]);

  return (
    <View
      accessibilityLabel={`${lesson.title}, ${lesson.status}`}
      accessibilityRole="button"
      accessibilityState={{ disabled: isLocked, selected: isCurrent }}
      style={{
        position: "absolute",
        top,
        left,
        width: 96,
        marginLeft: -48,
        alignItems: "center",
        gap: spacing.xs,
      }}
    >
      <Animated.View
        style={{
          width: nodeSize,
          height: nodeSize,
          alignItems: "center",
          justifyContent: "center",
          borderWidth: 3,
          borderBottomWidth: isLocked ? 3 : 6,
          borderColor,
          borderRadius: radius.pill,
          backgroundColor,
          transform: [{ scale: pulse }],
          opacity: isLocked ? 0.68 : 1,
        }}
      >
        <Icon color={iconColor} size={27} strokeWidth={3} />
      </Animated.View>
      <Text
        numberOfLines={1}
        style={{
          maxWidth: 96,
          color: isLocked ? learningColors.muted : learningColors.ink,
          fontFamily: typography.fontFamily,
          fontSize: 12,
          fontWeight: isCurrent ? "900" : "700",
          textAlign: "center",
        }}
      >
        {lesson.title}
      </Text>
    </View>
  );
}
