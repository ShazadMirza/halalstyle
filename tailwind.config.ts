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
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        halal: {
          obsidian: "#0C0C0C",
          forest: "#0C0C0C",
          "forest-2": "#141414",
          "forest-3": "#242424",
          gold: "#D4AF37",
          "gold-2": "#E4C76A",
          "gold-3": "#F0E6C8",
          "gold-light": "#E8D5A0",
          cream: "#FAF7F2",
          "cream-2": "#F0EBE0",
          "cream-3": "#E5DDD0",
          muted: "#9A9A95",
          border: "#2A2A28",
          "border-light": "#3A3A36",
          surface: "#121212",
          "surface-2": "#181818",
        },
      },
      boxShadow: {
        card: "0 8px 40px -8px rgba(0,0,0,0.45), 0 2px 8px -2px rgba(0,0,0,0.25)",
        "card-hover": "0 20px 60px -12px rgba(0,0,0,0.55), 0 4px 16px -4px rgba(0,0,0,0.3)",
        gold: "0 4px 24px -4px rgba(212,175,55,0.35)",
        "shop-glow": "0 0 15px rgba(212,175,55,0.5)",
        "inner-gold": "inset 0 1px 0 rgba(212,175,55,0.2)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #E4C76A 45%, #C9A54A 100%)",
        "forest-gradient": "linear-gradient(160deg, #0C0C0C 0%, #141414 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(12,12,12,0.95) 0%, rgba(12,12,12,0.75) 60%, rgba(12,12,12,0.95) 100%)",
        "card-gradient": "linear-gradient(160deg, #181818 0%, #121212 100%)",
        "placeholder-luxury": "linear-gradient(135deg, rgba(212,175,55,0.35) 0%, #0C0C0C 48%, #1a1a18 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-in": "fadeIn 0.4s ease both",
        shimmer: "shimmer 2s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        shimmer: { "0%,100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      transitionTimingFunction: { luxury: "cubic-bezier(0.23, 1, 0.32, 1)" },
    },
  },
  plugins: [],
};

export default config;
