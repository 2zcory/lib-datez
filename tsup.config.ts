import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts", "src/types.d.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  target: "esnext",
  clean: true,
  dts: true,
  minify: false,
});
