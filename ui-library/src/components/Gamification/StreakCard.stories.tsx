import type { Meta, StoryObj } from "@storybook/react-vite";

import { StreakCard } from "./Gamification";

const meta = {
  title: "Gamification/Streak Template",
  component: StreakCard,
  args: {
    days: 12,
    done: [true, true, false, true, false, true, false],
    todayIndex: 4,
  },
} satisfies Meta<typeof StreakCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WeeklyProgress: Story = {};
