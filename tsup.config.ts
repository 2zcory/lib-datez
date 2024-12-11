import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/plugins/index.ts"],
  outDir: "dist",
  format: ["esm"],
  target: "esnext",
  clean: true,
  dts: true,
  minify: false,
});
