import { createRequire } from "node:module";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs", "@storybook/addon-themes"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  viteFinal: async (viteConfig) =>
    mergeConfig(viteConfig, {
      resolve: {
        extensions: [
          ".web.mjs",
          ".web.js",
          ".web.ts",
          ".web.tsx",
          ".mjs",
          ".js",
          ".mts",
          ".ts",
          ".jsx",
          ".tsx",
          ".json",
        ],
        alias: [
          {
            find: /^react-native-svg$/,
            replacement: require.resolve(
              "react-native-svg/lib/module/elements.web.js",
            ),
          },
          {
            find: /^react-native$/,
            replacement: require.resolve("react-native-web"),
          },
        ],
      },
    }),
};

export default config;
