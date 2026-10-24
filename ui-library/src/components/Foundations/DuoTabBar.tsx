import { Text, View } from "react-native";
import { BookOpen, Dumbbell, Trophy, UserRound } from "lucide-react-native";

import { learningColors, typography } from "../../tokens";

export type DuoTab = {
  key: string;
  label: string;
  icon: "learn" | "practice" | "leaderboard" | "profile";
};

const icons = {
  learn: BookOpen,
  practice: Dumbbell,
  leaderboard: Trophy,
  profile: UserRound,
};

export type DuoTabBarProps = {
  tabs: DuoTab[];
  active: string;
};

export function DuoTabBar({ tabs, active }: DuoTabBarProps) {
  return (
    <View
      accessibilityRole="tablist"
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        borderTopWidth: 2,
        borderTopColor: learningColors.border,
        backgroundColor: learningColors.snow,
        paddingVertical: 8,
      }}
    >
      {tabs.map((tab) => {
        const selected = tab.key === active;
        const color = selected ? learningColors.blue : learningColors.muted;
        const Icon = icons[tab.icon];

        return (
          <View
            key={tab.key}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            style={{ minWidth: 56, alignItems: "center", gap: 2 }}
          >
            <View
              style={{
                minWidth: 40,
                minHeight: 40,
                alignItems: "center",
                justifyContent: "center",
                borderWidth: 2,
                borderColor: selected ? learningColors.blue : "transparent",
                borderRadius: 12,
                backgroundColor: selected ? "#e5f7ff" : "transparent",
              }}
            >
              <Icon color={color} size={20} />
            </View>
            <Text
              style={{
                color,
                fontFamily: typography.fontFamily,
                fontSize: 11,
                fontWeight: "700",
              }}
            >
              {tab.label}
            </Text>
          </View>
        );
      })}
    </View>
  );
}
