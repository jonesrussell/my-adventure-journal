import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import typescriptEslintPlugin from "@typescript-eslint/eslint-plugin";
import typescriptParser from "@typescript-eslint/parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaVersion: "latest",
        jsx: true,
        project: "./tsconfig.json",
      },
      globals: {
        // Define global variables for the environment
        es2024: "readonly", // Indicate that es2024 is a global variable
        node: "readonly",   // Indicate that node is a global variable
      },
    },
    ignores: [
      ".next",
      "node_modules",
      ".env",
      ".env.local",
      ".env.development.local",
      ".env.test.local",
      ".env.production.local",
      ".devcontainer",
      ".vscode",
      ".gitignore",
      ".eslintrc",
      ".prettierrc",
      ".prettierignore",
    ],
    plugins: {
      "@typescript-eslint": typescriptEslintPlugin,
    },
    rules: {
      "@typescript-eslint/no-floating-promises": "warn",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
    },
  },
];

export default eslintConfig;