/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#030712",
          panel: "rgba(255,255,255,0.04)",
          panelStrong: "rgba(255,255,255,0.07)",
          border: "rgba(255,255,255,0.10)",
          borderSoft: "rgba(255,255,255,0.08)",
          muted: "#94A3B8",
          text: "#F8FAFC",
          emerald: "#34D399",
          emeraldSoft: "rgba(52,211,153,0.12)",
        },
      },
      boxShadow: {
        pro: "0 20px 80px rgba(0,0,0,0.38)",
        proSoft: "0 10px 40px rgba(0,0,0,0.30)",
        emeraldGlow: "0 0 36px rgba(52,211,153,0.18)",
      },
      borderRadius: {
        pro: "32px",
        card: "28px",
      },
      backdropBlur: {
        pro: "28px",
      },
    },
  },
  plugins: [],
};
