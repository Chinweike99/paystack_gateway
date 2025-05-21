import js from "@eslint/js";
import parser from "@typescript-eslint/parser";
import plugin from "@typescript-eslint/eslint-plugin";

const config = [
  js.configs.recommended,
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        // Remove the project reference to avoid the error
      },
    },
    plugins: {
      "@typescript-eslint": plugin,
    },
    rules: {
      ...plugin.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
      // Remove type-aware rule since we're not using project reference
      // "@typescript-eslint/explicit-function-return-type": "warn",
    },
  },
  {
    files: ["**/*.test.ts", "**/*.test.js"],
    languageOptions: {
      globals: {
        
      },
    },
  },
];

export default config;