import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { Button } from "../components/Button/Button";
import { spacing } from "../tokens";
import { ConfettiBurst } from "./ConfettiBurst";

const meta = {
  title: "Foundations/Animation/Confetti",
  component: ConfettiBurst,
  args: { trigger: 0, mode: "burst", count: 70, duration: 2000, originY: 0.35 },
  argTypes: {
    trigger: { control: false },
    mode: { control: "radio", options: ["burst", "rain"] },
    count: { control: { type: "range", min: 10, max: 200, step: 10 } },
    duration: { control: { type: "range", min: 500, max: 4000, step: 100 } },
    originY: { control: { type: "range", min: 0, max: 1, step: 0.05 } },
  },
} satisfies Meta<typeof ConfettiBurst>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: function Render(args) {
    const [trigger, setTrigger] = useState(0);

    return (
      <View
        style={{
          position: "relative",
          minHeight: 360,
          gap: spacing.lg,
          padding: spacing.xl,
        }}
      >
        <Button
          label="Fire confetti"
          variant="secondary"
          onPress={() => setTrigger((value) => value + 1)}
        />
        <ConfettiBurst {...args} trigger={trigger} />
      </View>
    );
  },
};
