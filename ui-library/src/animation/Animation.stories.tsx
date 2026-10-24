import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pressable, Text, View } from "react-native";

import { PopIn } from "./PopIn";
import { DuoProgress } from "../components/Foundations/DuoProgress";
import { StreakBadge } from "../components/Gamification/Gamification";
import { learningColors, spacing, typography } from "../tokens";

const meta = {
  title: "Foundations/Animation",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const ProgressAndStreak: Story = {
  render: function Render() {
    const [progress, setProgress] = useState(0.35);

    return (
      <View style={{ maxWidth: 520, gap: spacing.xl }}>
        <View style={{ gap: spacing.md }}>
          <Text style={{ fontWeight: "700" }}>
            Progress eases to {Math.round(progress * 100)}%
          </Text>
          <DuoProgress value={progress} />
          <Pressable
            accessibilityRole="button"
            onPress={() =>
              setProgress((value) => (value >= 1 ? 0.2 : value + 0.2))
            }
            style={{
              minHeight: 44,
              justifyContent: "center",
              alignSelf: "flex-start",
              paddingHorizontal: spacing.md,
              borderRadius: 10,
              backgroundColor: learningColors.blue,
            }}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>
              Advance progress
            </Text>
          </Pressable>
        </View>
        <View style={{ gap: spacing.sm }}>
          <Text style={{ fontWeight: "700" }}>Active streak pulse</Text>
          <StreakBadge days={12} />
        </View>
      </View>
    );
  },
};

export const PopInPreview: Story = {
  render: function Render() {
    const [key, setKey] = useState(0);

    return (
      <View style={{ alignItems: "flex-start", gap: spacing.lg }}>
        <Pressable
          accessibilityRole="button"
          onPress={() => setKey((value) => value + 1)}
          style={{
            minHeight: 44,
            justifyContent: "center",
            paddingHorizontal: spacing.md,
            borderRadius: 10,
            backgroundColor: learningColors.blue,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: typography.fontFamily,
              fontWeight: "700",
            }}
          >
            Replay badge pop
          </Text>
        </Pressable>
        <PopIn key={key}>
          <View
            style={{
              width: 84,
              height: 84,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 42,
              backgroundColor: learningColors.gold,
            }}
          >
            <Text style={{ fontSize: 34 }}>★</Text>
          </View>
        </PopIn>
      </View>
    );
  },
};
