import { ImpactFeedbackStyle, NotificationFeedbackType } from "expo-haptics";
import * as Haptics from "expo-haptics";

function reportHapticsError(error: unknown) {
  console.error("Unable to play haptic feedback.", error);
}

export function lightImpact() {
  void Haptics.impactAsync(ImpactFeedbackStyle.Light).catch(reportHapticsError);
}

export function errorFeedback() {
  void Haptics.notificationAsync(NotificationFeedbackType.Error).catch(
    reportHapticsError,
  );
}
