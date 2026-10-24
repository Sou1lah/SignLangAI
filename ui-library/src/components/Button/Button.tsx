import { useRef } from "react";
import { Animated, Pressable, Text, View } from "react-native";
import type { TextStyle, ViewStyle } from "react-native";
import { Ellipsis, Sparkles } from "lucide-react-native";

import { colors, learningColors, radius, spacing, typography } from "../../tokens";

export type ButtonVariant =
  | "default"
  | "primary"
  | "primaryOutline"
  | "secondary"
  | "secondaryOutline"
  | "outline"
  | "ghost"
  | "danger"
  | "dangerOutline"
  | "super"
  | "superOutline"
  | "locked";
export type ButtonSize = "small" | "medium" | "large";
export type ButtonVisualState = "default" | "pressed" | "disabled" | "loading";

export type ButtonProps = {
  label: string;
  variant?: ButtonVariant;
  size?: ButtonSize;
  visualState?: ButtonVisualState;
  iconOnly?: boolean;
  leadingIcon?: boolean;
  accessibilityLabel?: string;
  onPress?: () => void;
};

const sizeValues: Record<ButtonSize, { height: number; horizontal: number }> = {
  small: { height: 44, horizontal: spacing.md },
  medium: { height: 48, horizontal: spacing.lg },
  large: { height: 56, horizontal: spacing.xl },
};

const variantColors: Record<
  ButtonVariant,
  {
    background: string;
    foreground: string;
    border: string;
    edge: string;
    pressed: string;
    hasLip: boolean;
  }
> = {
  default: {
    background: learningColors.buttonDefault,
    foreground: learningColors.buttonDefaultText,
    border: learningColors.border,
    edge: learningColors.buttonDefaultEdge,
    pressed: "#f1f5f9",
    hasLip: true,
  },
  primary: {
    background: learningColors.buttonBlue,
    foreground: "#ffffff",
    border: learningColors.buttonBlueBorder,
    edge: learningColors.buttonBlueEdge,
    pressed: "#0ea5e9",
    hasLip: true,
  },
  primaryOutline: {
    background: "#ffffff",
    foreground: "#0ea5e9",
    border: "#ffffff",
    edge: "#ffffff",
    pressed: "#f1f5f9",
    hasLip: false,
  },
  secondary: {
    background: learningColors.buttonGreen,
    foreground: "#ffffff",
    border: learningColors.buttonGreenBorder,
    edge: learningColors.buttonGreenEdge,
    pressed: "#16a34a",
    hasLip: true,
  },
  secondaryOutline: {
    background: "#ffffff",
    foreground: "#22c55e",
    border: "#ffffff",
    edge: "#ffffff",
    pressed: "#f1f5f9",
    hasLip: false,
  },
  outline: {
    background: "#ffffff",
    foreground: "#0ea5e9",
    border: learningColors.buttonBlueBorder,
    edge: learningColors.buttonBlueEdge,
    pressed: "#f1f5f9",
    hasLip: true,
  },
  ghost: {
    background: "transparent",
    foreground: colors.text,
    border: "transparent",
    edge: "transparent",
    pressed: colors.secondary,
    hasLip: false,
  },
  danger: {
    background: learningColors.buttonRose,
    foreground: "#ffffff",
    border: learningColors.buttonRoseBorder,
    edge: learningColors.buttonRoseEdge,
    pressed: "#e11d48",
    hasLip: true,
  },
  dangerOutline: {
    background: "#ffffff",
    foreground: learningColors.buttonRose,
    border: "#ffffff",
    edge: "#ffffff",
    pressed: "#f1f5f9",
    hasLip: false,
  },
  super: {
    background: learningColors.buttonIndigo,
    foreground: "#ffffff",
    border: learningColors.buttonIndigoBorder,
    edge: learningColors.buttonIndigoEdge,
    pressed: "#4f46e5",
    hasLip: true,
  },
  superOutline: {
    background: "#ffffff",
    foreground: learningColors.buttonIndigo,
    border: "#ffffff",
    edge: "#ffffff",
    pressed: "#f1f5f9",
    hasLip: false,
  },
  locked: {
    background: learningColors.buttonLocked,
    foreground: "#ffffff",
    border: learningColors.buttonLocked,
    edge: learningColors.buttonLockedEdge,
    pressed: "#d4d4d4",
    hasLip: true,
  },
};

export function Button({
  label,
  variant = "default",
  size = "medium",
  visualState = "default",
  iconOnly = false,
  leadingIcon = false,
  accessibilityLabel,
  onPress = () => undefined,
}: ButtonProps) {
  const disabled = visualState === "disabled" || visualState === "loading";
  const loading = visualState === "loading";
  const pressed = visualState === "pressed";
  const palette = variantColors[variant];
  const dimensions = sizeValues[size];
  const pressProgress = useRef(new Animated.Value(pressed ? 1 : 0)).current;

  const animatePress = (toValue: number) => {
    Animated.timing(pressProgress, {
      toValue,
      duration: 100,
      useNativeDriver: false,
    }).start();
  };

  const buttonStyle = (isPressed: boolean): ViewStyle => ({
    alignItems: "center",
    backgroundColor: isPressed ? palette.pressed : palette.background,
    borderColor: palette.border,
    borderRadius: radius.md,
    borderWidth: variant === "ghost" ? 0 : 2,
    borderBottomColor: palette.edge,
    borderBottomWidth: palette.hasLip ? (isPressed ? 2 : 4) : 0,
    flexDirection: "row",
    gap: spacing.sm,
    height: dimensions.height,
    justifyContent: "center",
    minHeight: 44,
    minWidth: 44,
    opacity: disabled ? 0.5 : 1,
    paddingHorizontal: iconOnly ? spacing.none : dimensions.horizontal,
  });

  const textStyle: TextStyle = {
    color: palette.foreground,
    fontFamily: typography.fontFamily,
    fontSize: typography.sizes[size],
    fontWeight: typography.weights.semibold,
  };

  return (
    <Pressable
      accessibilityLabel={
        iconOnly ? (accessibilityLabel ?? label ?? "Icon button") : undefined
      }
      accessibilityRole="button"
      accessibilityState={{ busy: loading, disabled }}
      disabled={disabled}
      onPress={onPress}
      onPressIn={() => {
        if (!pressed) animatePress(1);
      }}
      onPressOut={() => {
        if (!pressed) animatePress(0);
      }}
    >
      {({ pressed: isPressed }) => (
        <Animated.View
          style={[
            buttonStyle(pressed || isPressed),
            {
              borderBottomWidth: palette.hasLip
                ? pressProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [4, 2],
                  })
                : 0,
              transform: [
                {
                  translateY: pressProgress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 2],
                  }),
                },
              ],
            },
          ]}
        >
          {loading ? (
            <View
              accessible={false}
              style={{
                borderColor: palette.foreground,
                borderRadius: radius.pill,
                borderTopColor: "transparent",
                borderWidth: 2,
                height: 16,
                width: 16,
              }}
            />
          ) : null}
          {(leadingIcon || iconOnly) && !loading
            ? iconOnly
              ? <Ellipsis color={palette.foreground} size={20} />
              : <Sparkles color={palette.foreground} size={16} />
            : null}
          {!iconOnly && <Text style={textStyle}>{loading ? "Loading" : label}</Text>}
        </Animated.View>
      )}
    </Pressable>
  );
}
