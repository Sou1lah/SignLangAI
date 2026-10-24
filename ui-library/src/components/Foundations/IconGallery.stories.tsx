import type { Meta, StoryObj } from "@storybook/react-vite";
import {
  Award,
  BookOpen,
  Flame,
  Languages,
  Mic,
  Trophy,
  Video,
} from "lucide-react-native";
import { Text, View } from "react-native";

import { CloneHeartIcon, ClonePointsIcon } from "../Icons/CloneReferenceIcons";

const meta = {
  title: "Foundations/Icons",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const icons = [
  { label: "Hearts", icon: <CloneHeartIcon /> },
  { label: "Points / XP", icon: <ClonePointsIcon /> },
  { label: "Streak", icon: <Flame color="#ff9600" fill="#ff9600" /> },
  { label: "Achievement", icon: <Trophy color="#d89f00" /> },
  { label: "Award", icon: <Award color="#d89f00" /> },
  { label: "Lessons", icon: <BookOpen color="#38bdf8" /> },
  { label: "Sign language", icon: <Languages color="#38bdf8" /> },
  { label: "Microphone", icon: <Mic color="#38bdf8" /> },
  { label: "Video", icon: <Video color="#38bdf8" /> },
];

export const LearningAndCallIcons: Story = {
  render: () => (
    <View
      style={{
        maxWidth: 560,
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
      }}
    >
      {icons.map(({ label, icon }) => (
        <View
          key={label}
          style={{
            width: 118,
            minHeight: 96,
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            borderWidth: 2,
            borderBottomWidth: 4,
            borderColor: "#e5e5e5",
            borderRadius: 12,
            backgroundColor: "#ffffff",
          }}
        >
          {icon}
          <Text style={{ color: "#64748b", fontSize: 12, fontWeight: "700" }}>
            {label}
          </Text>
        </View>
      ))}
    </View>
  ),
};
