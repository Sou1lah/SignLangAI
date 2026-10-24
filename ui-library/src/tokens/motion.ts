export const motion = {
  duration: { fast: 120, base: 250, slow: 450 },
  spring: {
    soft: { damping: 15, stiffness: 150 },
    pop: { damping: 8, stiffness: 140 },
  },
} as const;
