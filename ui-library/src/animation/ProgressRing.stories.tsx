import type { Meta, StoryObj } from "@storybook/react-vite";

import { ProgressRing } from "./ProgressRing";

const meta = {
  title: "Progress/Ring",
  component: ProgressRing,
  args: { progress: 0.68, size: 96, stroke: 10, color: "#58cc02" },
  argTypes: {
    progress: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    size: { control: { type: "range", min: 48, max: 180, step: 8 } },
    stroke: { control: { type: "range", min: 4, max: 24, step: 2 } },
    color: { control: "color" },
  },
} satisfies Meta<typeof ProgressRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Determinate: Story = {};
