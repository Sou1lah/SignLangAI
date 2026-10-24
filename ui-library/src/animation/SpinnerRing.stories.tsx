import type { Meta, StoryObj } from "@storybook/react-vite";

import { SpinnerRing } from "./SpinnerRing";

const meta = {
  title: "Progress/Spinner",
  component: SpinnerRing,
  args: { size: 48, stroke: 6, color: "#1cb0f6" },
  argTypes: {
    size: { control: { type: "range", min: 24, max: 120, step: 4 } },
    stroke: { control: { type: "range", min: 2, max: 16, step: 1 } },
    color: { control: "color" },
  },
} satisfies Meta<typeof SpinnerRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Loading: Story = {};
