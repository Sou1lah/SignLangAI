import { Text, View } from "react-native";
import {
  Award,
  Check,
  Flame,
  Trophy,
} from "lucide-react-native";

import { AnimatedFlame } from "../../animation/AnimatedFlame";
import { AnimatedHearts } from "../../animation/AnimatedHearts";
import { PopIn } from "../../animation/PopIn";
import { DuoProgress } from "../Foundations/DuoProgress";
import { ClonePointsIcon } from "../Icons/CloneReferenceIcons";
import { learningColors, radius, spacing, typography } from "../../tokens";

export function HeartsBar({
  count,
  max = 5,
}: {
  count: number;
  max?: number;
}) {
  return (
    <View
      accessibilityLabel={`${count} of ${max} hearts`}
      style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
    >
      <AnimatedHearts count={count} />
      <Text
        style={{
          color: count > 0 ? learningColors.red : learningColors.muted,
          fontFamily: typography.fontFamily,
          fontSize: 18,
          fontWeight: "900",
        }}
      >
        {count}/{max}
      </Text>
    </View>
  );
}

export function StreakCard({
  days,
  done,
  todayIndex,
}: {
  days: number;
  done: boolean[];
  todayIndex: number;
}) {
  return (
    <View
      style={{
        maxWidth: 520,
        gap: spacing.lg,
        padding: spacing.lg,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: learningColors.border,
        borderRadius: radius.lg,
        backgroundColor: learningColors.snow,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center", gap: spacing.md }}>
        <View
          style={{
            width: 52,
            height: 52,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 26,
            backgroundColor: "#fff2e0",
          }}
        >
          <Flame color={learningColors.orange} fill={learningColors.orange} size={30} />
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{
              color: learningColors.ink,
              fontFamily: typography.fontFamily,
              fontSize: 17,
              fontWeight: "800",
            }}
          >
            {days}-day streak
          </Text>
          <Text style={{ color: learningColors.muted, fontSize: 13 }}>
            Keep your learning streak going!
          </Text>
        </View>
        <Text
          style={{
            color: learningColors.orange,
            fontFamily: typography.fontFamily,
            fontSize: 18,
            fontWeight: "900",
          }}
        >
          {days}
        </Text>
      </View>
      <StreakWeek done={done} todayIndex={todayIndex} />
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: spacing.sm,
          paddingTop: spacing.md,
          borderTopWidth: 1,
          borderTopColor: learningColors.border,
        }}
      >
        <Check color={learningColors.green} size={16} />
        <Text style={{ color: learningColors.muted, fontSize: 12 }}>
          One lesson a day keeps your streak alive.
        </Text>
      </View>
    </View>
  );
}

export function XpChip({ xp }: { xp: number }) {
  return (
    <View
      style={{
        minHeight: 36,
        flexDirection: "row",
        alignItems: "center",
        gap: 5,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.xs,
        borderWidth: 2,
        borderColor: learningColors.border,
        borderRadius: radius.pill,
        backgroundColor: learningColors.snow,
      }}
    >
      <ClonePointsIcon size={18} />
      <Text
        style={{
          color: learningColors.navy,
          fontFamily: typography.fontFamily,
          fontWeight: "800",
        }}
      >
        {xp} XP
      </Text>
    </View>
  );
}

export function StreakBadge({
  days,
  active = true,
}: {
  days: number;
  active?: boolean;
}) {
  const color = active ? learningColors.orange : learningColors.muted;

  return (
    <View
      accessibilityLabel={`${days} day streak`}
      style={{ flexDirection: "row", alignItems: "center", gap: 4 }}
    >
      <AnimatedFlame active={active}>
        <Flame color={color} fill={active ? color : "transparent"} size={24} />
      </AnimatedFlame>
      <Text
        style={{
          color,
          fontFamily: typography.fontFamily,
          fontSize: 20,
          fontWeight: "900",
        }}
      >
        {days}
      </Text>
    </View>
  );
}

const weekdays = ["M", "T", "W", "T", "F", "S", "S"];

export function StreakWeek({
  done,
  todayIndex,
}: {
  done: boolean[];
  todayIndex: number;
}) {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      {weekdays.map((label, index) => {
        const practiced = Boolean(done[index]);
        const today = index === todayIndex;

        return (
          <View
            key={`${label}-${index}`}
            style={{ alignItems: "center", gap: 6 }}
          >
            <Text
              style={{
                color: today ? learningColors.orange : learningColors.muted,
                fontFamily: typography.fontFamily,
                fontWeight: "700",
              }}
            >
              {label}
            </Text>
            <View
              style={{
                width: 38,
                height: 38,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: practiced
                  ? learningColors.orange
                  : today
                    ? learningColors.orange
                    : learningColors.border,
                borderRadius: 19,
                backgroundColor: practiced
                  ? learningColors.orange
                  : learningColors.canvas,
              }}
            >
              {practiced ? (
                <Check color={learningColors.snow} size={18} />
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

export type LeaderboardEntry = {
  userId: string;
  name: string;
  xp: number;
  rank: number;
};

export function Leaderboard({
  entries,
  meId,
}: {
  entries: LeaderboardEntry[];
  meId: string;
}) {
  return (
    <View style={{ gap: spacing.sm }}>
      {entries.map((entry) => {
        const isMe = entry.userId === meId;
        const medal =
          entry.rank === 1
            ? learningColors.gold
            : entry.rank === 2
              ? "#c0c0c0"
              : entry.rank === 3
                ? "#cd7f32"
                : learningColors.muted;

        return (
          <View
            key={entry.userId}
            style={{
              minHeight: 64,
              flexDirection: "row",
              alignItems: "center",
              gap: spacing.md,
              padding: spacing.md,
              borderWidth: 2,
              borderColor: isMe ? learningColors.green : learningColors.border,
              borderRadius: radius.md,
              backgroundColor: isMe ? learningColors.greenTint : learningColors.snow,
            }}
          >
            <Text
              style={{
                width: 28,
                color: medal,
                fontFamily: typography.fontFamily,
                fontSize: 18,
                fontWeight: "900",
                textAlign: "center",
              }}
            >
              {entry.rank}
            </Text>
            <View
              style={{
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 20,
                backgroundColor: learningColors.blue,
              }}
            >
              <Text
                style={{
                  color: learningColors.snow,
                  fontFamily: typography.fontFamily,
                  fontSize: 18,
                  fontWeight: "900",
                }}
              >
                {entry.name.charAt(0).toUpperCase()}
              </Text>
            </View>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: learningColors.ink,
                fontFamily: typography.fontFamily,
                fontSize: 15,
                fontWeight: "700",
              }}
            >
              {entry.name}
            </Text>
            <Text style={{ color: learningColors.muted, fontWeight: "700" }}>
              {entry.xp} XP
            </Text>
          </View>
        );
      })}
    </View>
  );
}

export function AchievementBadge({
  title,
  progress,
  unlocked,
}: {
  title: string;
  progress: number;
  unlocked: boolean;
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        padding: spacing.md,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor: learningColors.border,
        borderRadius: radius.md,
        backgroundColor: learningColors.snow,
      }}
    >
      {unlocked ? (
        <PopIn>
          <View
            style={{
              width: 52,
              height: 52,
              alignItems: "center",
              justifyContent: "center",
              borderWidth: 2,
              borderColor: "#e0aa00",
              borderRadius: 26,
              backgroundColor: learningColors.gold,
            }}
          >
            <Trophy color={learningColors.snow} size={24} />
          </View>
        </PopIn>
      ) : (
        <View
          style={{
            width: 52,
            height: 52,
            alignItems: "center",
            justifyContent: "center",
            borderWidth: 2,
            borderColor: learningColors.border,
            borderRadius: 26,
            backgroundColor: learningColors.canvas,
          }}
        >
          <Award color={learningColors.muted} size={24} />
        </View>
      )}
      <View style={{ flex: 1, gap: spacing.sm }}>
        <Text
          style={{
            color: learningColors.ink,
            fontFamily: typography.fontFamily,
            fontSize: 15,
            fontWeight: "700",
          }}
        >
          {title}
        </Text>
        <DuoProgress
          value={progress}
          color={unlocked ? learningColors.gold : learningColors.green}
        />
      </View>
    </View>
  );
}
