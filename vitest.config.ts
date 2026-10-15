import { defineConfig } from "vitest/config"
import viteReact from "@vitejs/plugin-react"

export default defineConfig({
  resolve: { tsconfigPaths: true },
  plugins: [viteReact()],
  test: {
    environment: "jsdom",
    globals: false,
    setupFiles: ["./tests/setup.ts"],
    include: ["src/**/*.test.{ts,tsx}", "tests/unit/**/*.test.{ts,tsx}"],
    css: false,
    coverage: {
      provider: "v8",
      include: ["src/lib/**", "src/features/**", "src/content/**"],
      exclude: ["**/*.test.*"],
    },
  },
})
