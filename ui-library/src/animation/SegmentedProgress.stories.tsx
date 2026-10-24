import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { SegmentedProgress } from "./SegmentedProgress";

const meta = {
  title: "Progress/Segments",
  component: SegmentedProgress,
  args: { total: 8, done: 3, color: "#58cc02" },
  argTypes: {
    total: { control: { type: "range", min: 2, max: 20, step: 1 } },
    done: { control: { type: "range", min: 0, max: 20, step: 1 } },
    color: { control: "color" },
  },
} satisfies Meta<typeof SegmentedProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Lesson: Story = {
  render: (args) => (
    <View style={{ width: "100%", maxWidth: 520 }}>
      <SegmentedProgress {...args} />
    </View>
  ),
};
