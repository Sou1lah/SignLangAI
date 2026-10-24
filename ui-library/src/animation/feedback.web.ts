export function lightImpact() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate(40);
  }
}

export function errorFeedback() {
  if (typeof navigator !== "undefined" && "vibrate" in navigator) {
    navigator.vibrate([60, 100, 60, 100, 60]);
  }
}
