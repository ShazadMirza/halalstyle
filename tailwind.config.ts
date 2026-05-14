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
          /* Core palette */
          forest:    "#0B2218",
          "forest-2":"#1B3A2D",
          "forest-3":"#2A5243",
          gold:      "#C9A84C",
          "gold-2":  "#E8C97A",
          "gold-3":  "#F5E4B0",
          cream:     "#FAF7F2",
          "cream-2": "#F0EBE0",
          "cream-3": "#E5DDD0",
          /* Semantic */
          muted:     "#7C8C82",
          border:    "#2E4A3E",
          "border-light": "#E5DDD0",
          surface:   "#0F2D1E",
          "surface-2":"#142E22",
        },
      },
      boxShadow: {
        card: "0 8px 40px -8px rgba(0,0,0,0.32), 0 2px 8px -2px rgba(0,0,0,0.16)",
        "card-hover": "0 20px 60px -12px rgba(0,0,0,0.45), 0 4px 16px -4px rgba(0,0,0,0.2)",
        gold: "0 4px 24px -4px rgba(201,168,76,0.35)",
        "inner-gold": "inset 0 1px 0 rgba(201,168,76,0.2)",
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #C9A84C 0%, #E8C97A 50%, #C9A84C 100%)",
        "forest-gradient": "linear-gradient(160deg, #0B2218 0%, #1B3A2D 100%)",
        "hero-gradient": "linear-gradient(180deg, rgba(11,34,24,0.95) 0%, rgba(11,34,24,0.7) 60%, rgba(11,34,24,0.95) 100%)",
        "card-gradient": "linear-gradient(160deg, #142E22 0%, #0F2D1E 100%)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease both",
        "fade-in": "fadeIn 0.4s ease both",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: { from: { opacity: "0", transform: "translateY(20px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        fadeIn: { from: { opacity: "0" }, to: { opacity: "1" } },
        shimmer: { "0%,100%": { opacity: "0.5" }, "50%": { opacity: "1" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-8px)" } },
      },
      transitionTimingFunction: { "luxury": "cubic-bezier(0.23, 1, 0.32, 1)" },
    },
  },
  plugins: [],
};

export default config;
