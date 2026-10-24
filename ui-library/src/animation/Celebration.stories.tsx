import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { View } from "react-native";

import { Button } from "../components/Button/Button";
import { Celebration } from "./Celebration";
import { spacing } from "../tokens";

const meta = {
  title: "Gamification/Celebration",
  component: Celebration,
  args: { xp: 25 },
  argTypes: {
    xp: { control: { type: "range", min: 5, max: 100, step: 5 } },
  },
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const LessonComplete: Story = {
  render: function Render(args) {
    const [celebration, setCelebration] = useState(0);

    return (
      <View style={{ alignItems: "flex-start", gap: spacing.lg }}>
        <Button
          label="Complete lesson"
          variant="secondary"
          onPress={() => setCelebration((value) => value + 1)}
        />
        {celebration > 0 ? (
          <Celebration key={celebration} xp={args.xp} />
        ) : null}
      </View>
    );
  },
};
