/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        space: {
          dark: "#070A12",
          panel: "#0F1626",
          card: "#141C2E",
          cardBorder: "#26334D",
          gold: "#F59E0B",
          goldHover: "#D97706",
          goldGlow: "rgba(245, 158, 11, 0.4)",
          cyan: "#06B6D4",
          cyanGlow: "rgba(6, 182, 212, 0.4)",
          purple: "#8B5CF6",
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
      },
      boxShadow: {
        'gold-cosmic': '0 0 25px rgba(245, 158, 11, 0.35)',
        'cyan-cosmic': '0 0 25px rgba(6, 182, 212, 0.35)',
        'glass-space': '0 8px 32px 0 rgba(0, 0, 0, 0.6)',
      }
    },
  },
  plugins: [],
}
