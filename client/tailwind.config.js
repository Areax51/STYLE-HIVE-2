// tailwind.config.js
import typography from "@tailwindcss/typography";
import scrollbar from "tailwind-scrollbar";

export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    // anything starting with bg- will now be allowed
    { pattern: /^bg-.*/ },
    // explicitly allow your custom utilities too
    "text-white",
    "font-sans",
    "btn-gold",
  ],
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
  plugins: [typography, scrollbar],
  darkMode: "class",
};
