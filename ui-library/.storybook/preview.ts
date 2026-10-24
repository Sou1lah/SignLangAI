import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/react-vite";

import "./preview.css";

const preview: Preview = {
  decorators: [
    withThemeByClassName({
      themes: {
        Light: "light",
        Dark: "dark",
      },
      defaultTheme: "Light",
    }),
  ],
  parameters: {
    options: {
      storySort: {
        // https://storybook.js.org/docs/writing-stories/naming-components-and-hierarchy
        order: [
          "Home",
          "Foundations",
          "Progress",
          "Navigation",
          "Learning Path",
          "Buttons",
          "Call",
          "Chat",
          "Gamification",
          "Sign Language",
        ],
      },
    },
  },
};

export default preview;
