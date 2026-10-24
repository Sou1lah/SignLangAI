import { Pressable, View } from "react-native";
import { Mic, MicOff, PhoneOff, Video, VideoOff } from "lucide-react-native";

import { learningColors } from "../../tokens";

export type CallControlsProps = {
  micOn?: boolean;
  cameraOn?: boolean;
};

function Control({
  label,
  icon: Icon,
  active = true,
  danger = false,
}: {
  label: string;
  icon: typeof Mic;
  active?: boolean;
  danger?: boolean;
}) {
  const background = danger
    ? learningColors.red
    : active
      ? learningColors.blue
      : learningColors.muted;

  return (
    <Pressable
      accessibilityLabel={label}
      accessibilityRole="button"
      accessibilityState={{ disabled: true }}
      disabled
      style={{
        width: 60,
        height: 60,
        minWidth: 44,
        minHeight: 44,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 30,
        borderBottomWidth: 4,
        borderBottomColor: danger ? learningColors.redDark : "#168cc4",
        backgroundColor: background,
      }}
    >
      <Icon color={learningColors.snow} size={24} />
    </Pressable>
  );
}

export function CallControls({
  micOn = true,
  cameraOn = true,
}: CallControlsProps) {
  return (
    <View
      accessibilityLabel="Static call controls preview"
      style={{
        flexDirection: "row",
        justifyContent: "center",
        gap: 18,
        padding: 12,
      }}
    >
      <Control
        label={micOn ? "Microphone on" : "Microphone off"}
        icon={micOn ? Mic : MicOff}
        active={micOn}
      />
      <Control
        label={cameraOn ? "Camera on" : "Camera off"}
        icon={cameraOn ? Video : VideoOff}
        active={cameraOn}
      />
      <Control label="Leave call" icon={PhoneOff} danger />
    </View>
  );
}
