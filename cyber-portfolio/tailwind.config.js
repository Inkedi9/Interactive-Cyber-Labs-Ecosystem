/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: "#0B0B0F",
          900: "#111218",
          850: "#161821",
          800: "#1B1E28",
        },
        surface: {
          DEFAULT: "#111218",
          2: "#161821",
          3: "#1B1E28",
          "brand-red": "#e63946",
          "brand-redSoft": "#ff4d5a",
          "brand-cyan": "#22D3EE",
          "ui-secondary": "#A1A1B5",
          "ui-muted": "#7C7C96",
          "ui-border": "#232336",
          "ui-borderStrong": "#2C2C40",
          "text-primary": "#F5F7FA",
        },
        ui: {
          border: "#262A36",
          borderStrong: "#32384A",
          text: "#F3F4F8",
          secondary: "#A7ADBA",
          muted: "#7C8394",
        },
        brand: {
          red: "#e63946",
          redSoft: "#ff4d5a",
          cyan: "#06B6D4",
          cyanSoft: "#22D3EE",
          emerald: "#10B981",
          emeraldSoft: "#34D399",
        },
      },
      boxShadow: {
        redGlow: "0 0 30px rgba(230,57,70,0.18)",
        cyanGlow: "0 0 30px rgba(6,182,212,0.16)",
        emeraldGlow: "0 0 24px rgba(16,185,129,0.16)",
      },
    },
  },
  plugins: [],
};
