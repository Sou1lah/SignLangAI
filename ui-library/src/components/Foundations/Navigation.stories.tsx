import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { DuoTabBar } from "./DuoTabBar";

const meta = {
  title: "Navigation/Bottom Tabs",
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <View style={{ maxWidth: 600 }}>
      <View style={{ borderWidth: 1, borderColor: "#e5e5e5", borderRadius: 12 }}>
        <DuoTabBar
          active="learn"
          tabs={[
            { key: "learn", label: "Learn", icon: "learn" },
            { key: "dictionary", label: "Dictionary", icon: "dictionary" },
            { key: "messages", label: "Messages", icon: "messages" },
            { key: "leaderboard", label: "Leaderboard", icon: "leaderboard" },
            { key: "profile", label: "Profile", icon: "profile" },
          ]}
        />
      </View>
    </View>
  ),
};
