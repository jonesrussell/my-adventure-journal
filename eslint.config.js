import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import importPlugin from 'eslint-plugin-import';

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
  pluginReact.configs.flat.recommended,
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
    },
    ignores: [
      '.next/',
      'node_modules/',
    ]
  },
  {
    files: ['**/*.{js,mjs,cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
    },
  },
  importPlugin.flatConfigs.recommended,
  {
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: [
            'path/to/folder',
            'packages/*/tsconfig.json',
            [
              'packages/module-a/tsconfig.json',
              'packages/module-b/tsconfig.json',
            ],
            [
              'packages/*/tsconfig.json',
              'other-packages/*/tsconfig.json',
            ],
          ],
        },
      },
    },
  },
  // {
  //   plugins: {
  //     next: nextPlugin,
  //   },
  //   rules: {
  //     // Extend the recommended rules from @next/eslint-plugin-next
  //     ...nextPlugin.configs.recommended.rules,
  //   },
  // },
]; 