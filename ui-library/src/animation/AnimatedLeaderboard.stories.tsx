import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { Button } from "../components/Button/Button";
import { Leaderboard } from "../components/Gamification/Gamification";
import { spacing } from "../tokens";
import { AnimatedLeaderboard } from "./AnimatedLeaderboard";
import type { AnimatedLeaderboardEntry } from "./AnimatedLeaderboard";

const seed: AnimatedLeaderboardEntry[] = [
  { userId: "amira", name: "Amira", xp: 420 },
  { userId: "karim", name: "Karim", xp: 390 },
  { userId: "you", name: "You", xp: 350 },
  { userId: "lina", name: "Lina", xp: 310 },
  { userId: "yacine", name: "Yacine", xp: 280 },
];

const meta = {
  title: "Gamification/Leaderboard",
  component: AnimatedLeaderboard,
  args: { entries: seed, meId: "you" },
  argTypes: {
    entries: { control: "object" },
    meId: { control: "text" },
  },
  parameters: { layout: "padded" },
} satisfies Meta<typeof AnimatedLeaderboard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StaticSnapshot: Story = {
  render: () => (
    <View style={{ maxWidth: 620 }}>
      <Leaderboard
        meId="you"
        entries={[
          { userId: "amira", name: "Amira", xp: 420, rank: 1 },
          { userId: "you", name: "You", xp: 360, rank: 2 },
          { userId: "karim", name: "Karim", xp: 290, rank: 3 },
        ]}
      />
    </View>
  ),
};

export const SimulateXp: Story = {
  render: function Render(args) {
    const [entries, setEntries] = useState(args.entries);
    const gainXp = (userId: string, amount: number) =>
      setEntries((current) =>
        current.map((entry) =>
          entry.userId === userId
            ? { ...entry, xp: entry.xp + amount }
            : entry,
        ),
      );

    return (
      <View style={{ maxWidth: 620, gap: spacing.md }}>
        <Button
          label="You gain 100 XP (move up)"
          variant="secondary"
          onPress={() => gainXp(args.meId, 100)}
        />
        <Button
          label="Amira gains 200 XP (you move down)"
          variant="danger"
          onPress={() => gainXp("amira", 200)}
        />
        <AnimatedLeaderboard entries={entries} meId={args.meId} />
      </View>
    );
  },
};
