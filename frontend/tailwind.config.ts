import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{vue,js,ts}",
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.{vue,js,ts}",
    "./app.vue",
    "./presets/**/*.{js,vue,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

export default config;
