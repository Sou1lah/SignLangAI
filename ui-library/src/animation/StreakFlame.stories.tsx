import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, View } from "react-native";

import { spacing, typography } from "../tokens";
import { StreakFlame } from "./StreakFlame";

const meta = {
  title: "Gamification/Streak Flame",
  component: StreakFlame,
  args: { state: "active", size: 96 },
  argTypes: {
    state: {
      control: "select",
      options: ["idle", "active", "super", "frozen", "out"],
    },
    size: { control: { type: "range", min: 32, max: 160, step: 8 } },
  },
} satisfies Meta<typeof StreakFlame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const AllStates: Story = {
  render: () => (
    <View
      style={{
        flexDirection: "row",
        flexWrap: "wrap",
        gap: spacing.lg,
      }}
    >
      {(["idle", "active", "super", "frozen", "out"] as const).map((state) => (
        <View key={state} style={{ alignItems: "center", gap: spacing.sm }}>
          <StreakFlame state={state} />
          <Text style={{ fontFamily: typography.fontFamily }}>{state}</Text>
        </View>
      ))}
    </View>
  ),
};
