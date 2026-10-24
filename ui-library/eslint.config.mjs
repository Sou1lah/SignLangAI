import tseslint from "typescript-eslint";

export default [
  {
    ignores: ["storybook-static/**"],
  },
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
        sourceType: "module",
      },
    },
    rules: {
      "no-restricted-imports": [
        "error",
        {
          paths: ["livekit-client"],
          patterns: ["@livekit/*"],
        },
      ],
    },
  },
];
