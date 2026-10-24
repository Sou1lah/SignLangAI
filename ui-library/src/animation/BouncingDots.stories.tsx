import type { Meta, StoryObj } from "@storybook/react-vite";

import { BouncingDots } from "./BouncingDots";

const meta = {
  title: "Foundations/Animation/Loaders",
  component: BouncingDots,
  args: { size: 12, color: "#58cc02" },
  argTypes: {
    size: { control: { type: "range", min: 6, max: 24, step: 2 } },
    color: { control: "color" },
  },
} satisfies Meta<typeof BouncingDots>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Bouncing: Story = {};
