import path from "path";
import type { Linter } from "eslint";

const config: Linter.Config = {
  root: true,
  env: {
    node: true,
    browser: true,
    es2021: true,
  },
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: {
      ts: "@typescript-eslint/parser",
      js: "espree", // 👈 para <script lang="ts">
    },
    tsconfigRootDir: __dirname,
    extraFileExtensions: [".vue"],
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:vue/vue3-recommended",
    "prettier",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parser: "@typescript-eslint/parser",
      parserOptions: {
        project: path.resolve(__dirname, "./tsconfig.eslint.json"),
        tsconfigRootDir: __dirname,
      },
      extends: ["plugin:@typescript-eslint/recommended"],
    },
    {
      files: ["*.js", "*.jsx"],
      parser: "espree", // 👈 el parser de JavaScript
      extends: ["eslint:recommended"],
    },
  ],
  rules: {},
};

export default config;
