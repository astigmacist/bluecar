import { defineConfig, globalIgnores } from "eslint/config";
import eslint from "@eslint/js";
import jsxA11y from "eslint-plugin-jsx-a11y";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import globals from "globals";
import tseslint from "typescript-eslint";

export default defineConfig([
  globalIgnores(["dist/**", ".next/**", "build/**", "backend/**", "db/**", "drizzle/**", "examples/**", "worker/**", ".vinext/**"]),
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat["jsx-runtime"],
  reactHooks.configs.flat["recommended-latest"],
  jsxA11y.flatConfigs.recommended,
  { settings: { react: { version: "detect" } } },
  {
    files: ["src/**/*.{ts,tsx}", "app/page.tsx", "app/components/**/*.{ts,tsx}", "app/data/**/*.ts"],
    languageOptions: { globals: { ...globals.browser } },
  },
  { files: ["tests/**/*.mjs", "*.config.mjs"], languageOptions: { globals: { ...globals.node } } },
]);
