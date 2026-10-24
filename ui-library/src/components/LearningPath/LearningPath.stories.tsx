import type { Meta, StoryObj } from "@storybook/react-vite";

import { LearningPath } from "./LearningPath";
import type { LearningPathUnit } from "./LearningPath";

const units: LearningPathUnit[] = [
  {
    id: "first-signs",
    title: "First Signs",
    subtitle: "Greetings and introductions",
    color: "#58cc02",
    lessons: [
      { id: "hello", title: "Hello", status: "completed" },
      { id: "names", title: "Names", status: "completed" },
      { id: "greetings", title: "Greetings", status: "current" },
      { id: "practice", title: "Practice", status: "available" },
      { id: "review", title: "Unit review", status: "locked" },
    ],
  },
  {
    id: "everyday",
    title: "Everyday Life",
    subtitle: "People, places, and routines",
    color: "#1cb0f6",
    lessons: [
      { id: "people", title: "People", status: "completed" },
      { id: "places", title: "Places", status: "current" },
      { id: "routines", title: "Routines", status: "locked" },
      { id: "conversation", title: "Conversation", status: "locked" },
    ],
  },
  {
    id: "stories",
    title: "Tell a Story",
    subtitle: "Connect signs into a story",
    color: "#ce82ff",
    lessons: [
      { id: "sequence", title: "Sequence", status: "locked" },
      { id: "expressions", title: "Expressions", status: "locked" },
      { id: "story", title: "Your story", status: "locked" },
    ],
  },
];

const meta = {
  title: "Learning Path/Units and Lessons",
  component: LearningPath,
  args: { units },
  argTypes: { units: { control: "object" } },
  parameters: { layout: "padded" },
} satisfies Meta<typeof LearningPath>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Journey: Story = {};
