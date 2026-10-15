//  @ts-check

import { tanstackConfig } from "@tanstack/eslint-config"

export default [
  ...tanstackConfig,
  {
    rules: {
      "import/no-cycle": "off",
      "import/order": "off",
      "import/consistent-type-specifier-style": "off",
      "sort-imports": "off",
      "@typescript-eslint/array-type": "off",
      "@typescript-eslint/require-await": "off",
      "pnpm/json-enforce-catalog": "off",
      // Design-system rule: colours come from tokens (src/styles.css), never
      // raw hex in class names. Data files (products) may hold fabric hexes.
      "no-restricted-syntax": [
        "error",
        {
          selector:
            "JSXAttribute[name.name='className'] Literal[value=/\\[#[0-9a-fA-F]{3,8}\\]/]",
          message:
            "Use a design token utility (e.g. bg-sun, text-ink) instead of an arbitrary hex colour.",
        },
      ],
    },
  },
  {
    ignores: [
      "eslint.config.js",
      ".prettierrc",
      "dist/**",
      ".wrangler/**",
      ".output/**",
      ".tanstack/**",
      "coverage/**",
      "playwright-report/**",
      "test-results/**",
      "src/routeTree.gen.ts",
      // Vendored shadcn/ui primitives — managed by the shadcn CLI.
      "src/components/ui/**",
      "src/hooks/**",
      "src/lib/highlighter.tsx",
    ],
  },
]
