import type { Meta, StoryObj } from "@storybook/react-vite";

import { SegmentedRing } from "./SegmentedRing";

const meta = {
  title: "Progress/Segmented Ring",
  component: SegmentedRing,
  args: { total: 8, done: 3, size: 96, stroke: 10, color: "#58cc02" },
  argTypes: {
    total: { control: { type: "range", min: 2, max: 20, step: 1 } },
    done: { control: { type: "range", min: 0, max: 20, step: 1 } },
    size: { control: { type: "range", min: 48, max: 180, step: 8 } },
    stroke: { control: { type: "range", min: 4, max: 24, step: 2 } },
    color: { control: "color" },
  },
} satisfies Meta<typeof SegmentedRing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const UnitLessons: Story = {};
