import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(215 28% 17%)",
        background: "hsl(222 47% 11%)",
        card: "hsl(222 47% 14%)",
        muted: "hsl(215 20% 65%)",
        foreground: "hsl(210 40% 98%)",
        primary: "hsl(199 89% 48%)"
      },
    },
  },
  plugins: [],
};

export default config;
