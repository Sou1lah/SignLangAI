import type { Meta, StoryObj } from "@storybook/react-vite";

import { IndeterminateBar } from "./IndeterminateBar";

const meta = {
  title: "Progress/Indeterminate",
  component: IndeterminateBar,
  args: { color: "#1cb0f6", height: 12 },
  argTypes: {
    color: { control: "color" },
    height: { control: { type: "range", min: 6, max: 24, step: 2 } },
  },
} satisfies Meta<typeof IndeterminateBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Indeterminate: Story = {};
