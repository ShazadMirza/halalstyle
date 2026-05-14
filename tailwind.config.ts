import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
      },
      colors: {
        halal: {
          forest: "#1B3A2D",
          gold: "#C9A84C",
          "gold-light": "#E8C97A",
          cream: "#FAF7F2",
          muted: "#6b7280",
          border: "#E8E0D5",
        },
      },
      boxShadow: {
        card:
          "0 10px 40px -10px rgba(0, 0, 0, 0.12), 0 4px 16px -8px rgba(0, 0, 0, 0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
