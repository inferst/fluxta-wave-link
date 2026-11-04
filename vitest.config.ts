import { defineConfig } from "vitest/config";
export default defineConfig({
  test: { include: ["apps/plugin/src/**/*.test.ts"], restoreMocks: true },
});
