import type { Meta, StoryObj } from "@storybook/react-vite";

import { GoalRing } from "./GoalRing";

const meta = {
  title: "Progress/Goal Ring",
  component: GoalRing,
  args: { xp: 65, goal: 100, size: 96 },
  argTypes: {
    xp: { control: { type: "range", min: 0, max: 500, step: 5 } },
    goal: { control: { type: "range", min: 10, max: 500, step: 10 } },
    size: { control: { type: "range", min: 48, max: 180, step: 8 } },
  },
} satisfies Meta<typeof GoalRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DailyGoal: Story = {};
