import { createRequire } from "node:module";
import { dirname } from "node:path";
import { defineConfig } from "vitest/config";

const editorRequire = createRequire(
  new URL("./apps/editor/package.json", import.meta.url),
);

export default defineConfig({
  esbuild: { jsx: "automatic" },
  // A linked SDK must share the editor's React, just as in its Vite build.
  resolve: {
    alias: {
      react: dirname(editorRequire.resolve("react/package.json")),
      "react-dom": dirname(editorRequire.resolve("react-dom/package.json")),
    },
  },
  test: {
    include: ["apps/*/src/**/*.test.{ts,tsx}"],
    restoreMocks: true,
    server: {
      deps: { inline: [/@fluxta\/sdk/] },
    },
  },
});
