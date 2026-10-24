import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { DuoProgress } from "../components/Foundations/DuoProgress";

const meta = {
  title: "Progress/Bar",
  component: DuoProgress,
  args: { value: 0.65, color: "#58cc02" },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
    color: { control: "color" },
  },
} satisfies Meta<typeof DuoProgress>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Fill: Story = {
  render: (args) => (
    <View style={{ width: "100%", maxWidth: 520 }}>
      <DuoProgress {...args} />
    </View>
  ),
};
