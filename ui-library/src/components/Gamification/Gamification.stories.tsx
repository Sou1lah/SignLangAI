import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, View } from "react-native";

import {
  AchievementBadge,
  HeartsBar,
  StreakCard,
  StreakBadge,
  StreakWeek,
  XpChip,
} from "./Gamification";

const meta = {
  title: "Gamification/Components",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  render: () => (
    <View style={{ maxWidth: 620, gap: 24 }}>
      <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center", gap: 24 }}>
        <HeartsBar count={4} />
        <XpChip xp={120} />
        <StreakBadge days={12} />
        <StreakBadge days={3} active={false} />
      </View>
      <View style={{ gap: 12 }}>
        <Text style={{ fontWeight: "700" }}>Streak card</Text>
        <StreakCard
          days={12}
          done={[true, true, false, true, false, true, false]}
          todayIndex={4}
        />
        <Text style={{ fontWeight: "700" }}>Weekly streak</Text>
        <StreakWeek
          done={[true, true, false, true, false, true, false]}
          todayIndex={4}
        />
      </View>
      <View style={{ gap: 12 }}>
        <Text style={{ fontWeight: "700" }}>Achievement</Text>
        <AchievementBadge title="Consistent learner" progress={0.72} unlocked={false} />
        <AchievementBadge title="First steps" progress={1} unlocked />
      </View>
    </View>
  ),
};
