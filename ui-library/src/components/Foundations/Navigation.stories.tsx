import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, View } from "react-native";

import { DuoProgress } from "./DuoProgress";
import { DuoTabBar } from "./DuoTabBar";

const meta = {
  title: "Foundations/Navigation & Progress",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <View style={{ maxWidth: 600, gap: 24 }}>
      <View style={{ gap: 10 }}>
        <Text style={{ fontWeight: "700" }}>Lesson progress · 65%</Text>
        <DuoProgress value={0.65} />
      </View>
      <View style={{ borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 12 }}>
        <DuoTabBar
          active="learn"
          tabs={[
            { key: "learn", label: "Learn", icon: "learn" },
            { key: "practice", label: "Practice", icon: "practice" },
            { key: "leaderboard", label: "Leaders", icon: "leaderboard" },
            { key: "profile", label: "Profile", icon: "profile" },
          ]}
        />
      </View>
    </View>
  ),
};
