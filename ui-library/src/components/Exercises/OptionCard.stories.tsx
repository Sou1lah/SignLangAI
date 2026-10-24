import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, View } from "react-native";

import { OptionCard } from "./OptionCard";

const meta = {
  title: "Gamification/Exercise Cards",
  component: OptionCard,
} satisfies Meta<typeof OptionCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const States: Story = {
  args: { label: "Answer option" },
  render: () => (
    <View style={{ maxWidth: 520, gap: 12 }}>
      <Text style={{ fontWeight: "700" }}>Answer option states</Text>
      <OptionCard label="Idle answer" />
      <OptionCard label="Selected answer" state="selected" />
      <OptionCard label="Correct answer" state="correct" />
      <OptionCard label="Incorrect answer" state="wrong" />
      <OptionCard label="Pressed visual state" visualState="pressed" />
    </View>
  ),
};
