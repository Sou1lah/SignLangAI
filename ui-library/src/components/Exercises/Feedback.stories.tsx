import { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import { Text, View } from "react-native";

import { errorFeedback, FeedbackSheet, ShakeView } from "../../animation";
import { Button } from "../Button/Button";
import { OptionCard } from "./OptionCard";
import { HeartsBar } from "../Gamification/Gamification";
import { spacing } from "../../tokens";

const meta = {
  title: "Gamification/Exercise Feedback",
  parameters: { layout: "padded" },
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

export const WrongAnswer: Story = {
  render: function Render() {
    const [selected, setSelected] = useState<string | null>(null);
    const [hearts, setHearts] = useState(5);
    const [attempt, setAttempt] = useState(0);
    const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);

    const checkAnswer = () => {
      setAttempt((value) => value + 1);
      if (selected === "correct") {
        setFeedback("correct");
      } else {
        setFeedback("wrong");
        setHearts((value) => Math.max(0, value - 1));
        errorFeedback();
      }
    };

    return (
      <View style={{ maxWidth: 520, gap: spacing.lg }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Choose the matching sign</Text>
          <HeartsBar count={hearts} />
        </View>
        <ShakeView trigger={attempt}>
          <View style={{ gap: spacing.sm }}>
            {[
              { id: "wrong", label: "Good morning" },
              { id: "correct", label: "Thank you" },
              { id: "other", label: "Please" },
            ].map((answer) => (
              <OptionCard
                key={answer.id}
                label={answer.label}
                state={selected === answer.id ? "selected" : "idle"}
                onPress={() => {
                  setSelected(answer.id);
                  setFeedback(null);
                }}
              />
            ))}
          </View>
        </ShakeView>
        <Button
          label="Check answer"
          variant="secondary"
          onPress={checkAnswer}
        />
        {feedback ? (
          <FeedbackSheet
            key={attempt}
            kind={feedback}
            title={feedback === "correct" ? "Excellent!" : "Not quite"}
            message={
              feedback === "correct"
                ? "You matched the sign."
                : "Try again. Your heart count updates with a bounce."
            }
          />
        ) : null}
      </View>
    );
  },
};
