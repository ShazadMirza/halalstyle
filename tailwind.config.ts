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
        /** Editorial / lookbook headlines — Playfair Display */
        serif: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
        display: ["var(--font-playfair)", "Georgia", "serif"],
        /** Logo + section headings — Playfair with strong Georgia fallbacks */
        brand: ["var(--font-playfair)", "Georgia", "Cambria", "Times New Roman", "serif"],
        mono: ["var(--font-dm-mono)", "monospace"],
      },
      colors: {
        obsidian: "#062C1D",
        gold: "#D4AF37",
        emerald: {
          700: "#0A4D32",
          900: "#062C1D",
        },
        halal: {
          obsidian: "#062C1D",
          forest: "#062C1D",
          "forest-2": "#0A3D28",
          "forest-3": "#0E4A32",
          gold: "#D4AF37",
          "gold-2": "#E4C76A",
          "gold-3": "#F0E6C8",
          "gold-light": "#E8D5A0",
          cream: "#FAF7F2",
          "cream-2": "#F0EBE0",
          "cream-3": "#E5DDD0",
          muted: "#8BA99A",
          border: "#145239",
          "border-light": "#1E6B45",
          surface: "#071F15",
          "surface-2": "#0A2E1F",
          /** Deepest forest — digital lookbook canvas */
          "forest-dark": "#021910",
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
        "forest-gradient": "linear-gradient(160deg, #062C1D 0%, #0A3D28 100%)",
        "hero-gradient":
          "linear-gradient(180deg, rgba(6,44,29,0.96) 0%, rgba(6,44,29,0.78) 60%, rgba(6,44,29,0.96) 100%)",
        "card-gradient": "linear-gradient(160deg, #0A2E1F 0%, #071F15 100%)",
        "placeholder-luxury":
          "linear-gradient(135deg, rgba(212,175,55,0.35) 0%, #062C1D 48%, #0A3D28 100%)",
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
