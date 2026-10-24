import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, View } from "react-native";

import { CallControls } from "./CallControls";

const meta = {
  title: "Call/Controls",
  component: CallControls,
} satisfies Meta<typeof CallControls>;

export default meta;
type Story = StoryObj<typeof meta>;

export const StaticPreview: Story = {
  render: () => (
    <View style={{ alignItems: "center", gap: 12 }}>
      <Text style={{ color: "var(--ui-muted)", fontFamily: "system-ui, sans-serif" }}>
        Visual preview only — controls are disabled and not connected to LiveKit.
      </Text>
      <CallControls />
      <CallControls micOn={false} cameraOn={false} />
    </View>
  ),
};
