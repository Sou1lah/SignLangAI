import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, View } from "react-native";

import { Button } from "./Button";
import type { ButtonSize, ButtonVariant } from "./Button";

const meta = {
  title: "Buttons/Button",
  component: Button,
  args: {
    label: "Continue",
    variant: "primary",
    size: "medium",
  },
  argTypes: {
    variant: {
      control: "select",
      options: [
        "default",
        "primary",
        "primaryOutline",
        "secondary",
        "secondaryOutline",
        "outline",
        "danger",
        "dangerOutline",
        "super",
        "superOutline",
        "locked",
        "ghost",
      ],
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
    },
    visualState: {
      control: "select",
      options: ["default", "pressed", "disabled", "loading"],
    },
    iconOnly: { control: "boolean" },
    leadingIcon: { control: "boolean" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { visualState: "default" },
};

export const Pressed: Story = {
  args: { visualState: "pressed" },
};

export const Disabled: Story = {
  args: { visualState: "disabled" },
};

export const Loading: Story = {
  args: { visualState: "loading" },
};

export const IconOnly: Story = {
  args: {
    label: "More options",
    accessibilityLabel: "More options",
    iconOnly: true,
  },
};

export const LeadingIcon: Story = {
  args: { leadingIcon: true },
};

const variants: ButtonVariant[] = [
  "default",
  "primary",
  "primaryOutline",
  "secondary",
  "secondaryOutline",
  "outline",
  "ghost",
  "danger",
  "dangerOutline",
  "super",
  "superOutline",
  "locked",
];
const sizes: ButtonSize[] = ["small", "medium", "large"];

export const AllButtons: Story = {
  render: () => (
    <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 24 }}>
      {variants.map((variant) => (
        <View key={variant} style={{ gap: 12, minWidth: 180 }}>
          <Text
            style={{
              color: "var(--ui-muted)",
              fontFamily: "system-ui, sans-serif",
              fontSize: 13,
            }}
          >
            {variant}
          </Text>
          {sizes.map((size) => (
            <Button
              key={`${variant}-${size}`}
              label={`${size} ${variant}`}
              size={size}
              variant={variant}
            />
          ))}
        </View>
      ))}
    </View>
  ),
};
