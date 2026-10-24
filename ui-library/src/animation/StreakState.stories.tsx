import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Pressable, Text, View } from "react-native";

import { Button } from "../components/Button/Button";
import { learningColors, spacing, typography } from "../tokens";
import { deriveStreakState } from "./deriveStreakState";
import { StreakFlame } from "./StreakFlame";

const meta = {
  title: "Gamification/Streak States",
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

export const StatePlayground: Story = {};

export const DeriveFromProgress: Story = {
  render: function Render() {
    const [days, setDays] = useState(12);
    const [doneToday, setDoneToday] = useState(true);
    const [freezeUsed, setFreezeUsed] = useState(false);
    const [lost, setLost] = useState(false);
    const state = deriveStreakState({ days, doneToday, freezeUsed, lost });

    return (
      <View style={{ alignItems: "flex-start", gap: spacing.lg }}>
        <View style={{ alignItems: "center", gap: spacing.sm }}>
          <StreakFlame state={state} />
          <Text style={{ fontFamily: typography.fontFamily, fontWeight: "800" }}>
            {state} · {days} days
          </Text>
        </View>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: spacing.sm }}>
          <Button
            label="Add a day"
            variant="secondary"
            onPress={() => setDays((value) => value + 1)}
          />
          <Button
            label={doneToday ? "Not practiced today" : "Practice today"}
            onPress={() => setDoneToday((value) => !value)}
          />
          <Button
            label="Use freeze"
            variant="outline"
            onPress={() => setFreezeUsed((value) => !value)}
          />
          <Button
            label="Toggle lost"
            variant="danger"
            onPress={() => setLost((value) => !value)}
          />
          <Pressable
            accessibilityRole="button"
            onPress={() => {
              setDays(12);
              setDoneToday(true);
              setFreezeUsed(false);
              setLost(false);
            }}
            style={{ minHeight: 44, justifyContent: "center" }}
          >
            <Text style={{ color: learningColors.blue, fontWeight: "700" }}>
              Reset
            </Text>
          </Pressable>
        </View>
      </View>
    );
  },
};
