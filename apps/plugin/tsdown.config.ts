import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  outDir: "../../dist/wave-link",
  clean: false,
  copy: [
    { from: "../../manifest.json" },
    { from: "../../icons/*.svg", to: "../../dist/wave-link/icons" },
  ],
  deps: { alwaysBundle: [/.*/], onlyBundle: false },
});
