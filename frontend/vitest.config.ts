import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";
import path from "path";

export default defineConfig({
  plugins: [vue()],
  test: {
    globals: true,
    environment: "jsdom",
  },
  // Point Vitest to the test tsconfig
  esbuild: {
    tsconfigRaw: require("./tsconfig.vitest.json"),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./"),
      "~": path.resolve(__dirname, "./"),
    },
  },
});
