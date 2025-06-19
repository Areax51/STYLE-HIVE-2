/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#FFD700",
        dark: "#0a0a0a",
      },
      boxShadow: {
        gold: "0 0 15px rgba(255, 215, 0, 0.5)",
      },
      height: {
        "screen-80": "80vh",
        "screen-90": "90vh",
      },
      fontFamily: {
        sans: ["Outfit", "ui-sans-serif", "system-ui"],
      },
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwind-scrollbar"),
  ],
  darkMode: "class",
};
