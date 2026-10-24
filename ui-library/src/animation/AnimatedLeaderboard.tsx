import { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Text,
  View,
} from "react-native";
import { ChevronDown, ChevronUp, Crown } from "lucide-react-native";

import { learningColors, radius, spacing, typography } from "../tokens";
import { CountUp } from "./CountUp";
import { useNativeDriver } from "./nativeDriver";
import { useReducedMotion } from "./useReducedMotion";

const rowHeight = 64;
const rowGap = 8;
const rowStep = rowHeight + rowGap;
const medals: Record<number, string> = {
  1: learningColors.gold,
  2: "#c0c0c0",
  3: "#cd7f32",
};

export type AnimatedLeaderboardEntry = {
  userId: string;
  name: string;
  xp: number;
};

export function AnimatedLeaderboard({
  entries,
  meId,
}: {
  entries: AnimatedLeaderboardEntry[];
  meId: string;
}) {
  const sorted = useMemo(
    () => [...entries].sort((a, b) => b.xp - a.xp),
    [entries],
  );
  const previousRanks = useRef<Record<string, number>>({});
  const rows = sorted.map((entry, index) => ({
    entry,
    rank: index + 1,
    delta: previousRanks.current[entry.userId]
      ? previousRanks.current[entry.userId] - (index + 1)
      : 0,
  }));

  useEffect(() => {
    previousRanks.current = Object.fromEntries(
      sorted.map((entry, index) => [entry.userId, index + 1]),
    );
  }, [sorted]);

  return (
    <View style={{ height: Math.max(0, sorted.length * rowStep - rowGap) }}>
      {rows.map((row) => (
        <RankRow
          key={row.entry.userId}
          entry={row.entry}
          rank={row.rank}
          delta={row.delta}
          isMe={row.entry.userId === meId}
        />
      ))}
    </View>
  );
}

function RankRow({
  entry,
  rank,
  delta,
  isMe,
}: {
  entry: AnimatedLeaderboardEntry;
  rank: number;
  delta: number;
  isMe: boolean;
}) {
  const reducedMotion = useReducedMotion();
  const y = useRef(new Animated.Value((rank - 1) * rowStep)).current;
  const flash = useRef(new Animated.Value(0)).current;
  const crownOffset = useRef(new Animated.Value(0)).current;
  const [badge, setBadge] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    if (!reducedMotion) {
      Animated.spring(y, {
        toValue: (rank - 1) * rowStep,
        damping: 16,
        stiffness: 140,
        useNativeDriver,
      }).start();
    } else {
      y.setValue((rank - 1) * rowStep);
    }
  }, [rank, reducedMotion, y]);

  useEffect(() => {
    if (!delta) return;
    setBadge(delta);
    if (delta > 0 && !reducedMotion) {
      flash.setValue(0);
      Animated.sequence([
        Animated.timing(flash, {
          toValue: 0.8,
          duration: 200,
          useNativeDriver,
        }),
        Animated.timing(flash, {
          toValue: 0,
          duration: 1000,
          useNativeDriver,
        }),
      ]).start();
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setBadge(0), 2500);
  }, [delta, flash, rank, reducedMotion]);

  useEffect(() => () => clearTimeout(timer.current), []);

  useEffect(() => {
    if (rank !== 1 || reducedMotion) {
      crownOffset.setValue(0);
      return;
    }
    const bob = Animated.loop(
      Animated.sequence([
        Animated.timing(crownOffset, {
          toValue: -3,
          duration: 600,
          useNativeDriver,
        }),
        Animated.timing(crownOffset, {
          toValue: 0,
          duration: 600,
          useNativeDriver,
        }),
      ]),
    );
    bob.start();
    return () => bob.stop();
  }, [crownOffset, rank, reducedMotion]);

  return (
    <Animated.View
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: rowHeight,
        zIndex: delta > 0 ? 2 : 1,
        flexDirection: "row",
        alignItems: "center",
        gap: spacing.md,
        paddingHorizontal: spacing.md,
        borderRadius: radius.md,
        borderWidth: 2,
        borderBottomWidth: 4,
        borderColor:
          rank === 1
            ? learningColors.gold
            : isMe
              ? learningColors.green
              : learningColors.border,
        backgroundColor: isMe ? learningColors.greenTint : learningColors.snow,
        overflow: "hidden",
        transform: [{ translateY: y }],
      }}
    >
      <Animated.View
        pointerEvents="none"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: learningColors.greenTint,
          opacity: flash,
        }}
      />
      <View style={{ width: 30, alignItems: "center" }}>
        {rank === 1 ? (
          <Animated.View style={{ transform: [{ translateY: crownOffset }] }}>
            <Crown
              size={26}
              color={learningColors.greenDark}
              fill={learningColors.gold}
            />
          </Animated.View>
        ) : (
          <Text
            style={{
              fontFamily: typography.fontFamily,
              fontSize: 18,
              fontWeight: "900",
              color: medals[rank] ?? learningColors.muted,
            }}
          >
            {rank}
          </Text>
        )}
      </View>
      <View
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          backgroundColor: learningColors.blue,
          alignItems: "center",
          justifyContent: "center",
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
          fontFamily: typography.fontFamily,
          fontSize: 16,
          color: learningColors.ink,
          fontWeight: "800",
        }}
      >
        {entry.name}
      </Text>
      {badge !== 0 ? (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {badge > 0 ? (
            <ChevronUp size={18} color={learningColors.green} />
          ) : (
            <ChevronDown size={18} color={learningColors.red} />
          )}
          <Text
            style={{
              fontFamily: typography.fontFamily,
              fontWeight: "800",
              color: badge > 0 ? learningColors.greenDark : learningColors.redDark,
            }}
          >
            {Math.abs(badge)}
          </Text>
        </View>
      ) : null}
      <View style={{ flexDirection: "row", gap: 4 }}>
        <CountUp to={entry.xp} style={{ color: learningColors.muted }} />
        <Text style={{ color: learningColors.muted, fontWeight: "800" }}>XP</Text>
      </View>
    </Animated.View>
  );
}
