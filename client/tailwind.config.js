// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        dark: "#0a0a0a",
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        gold: "0 0 15px rgba(255,215,0,0.5)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("tailwind-scrollbar")],
  darkMode: "class",
};
