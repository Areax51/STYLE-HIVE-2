// postcss.config.cjs
module.exports = {
  plugins: {
    "@tailwindcss/postcss": {}, // uses the new separate package
    autoprefixer: {},
    "tailwind-scrollbar": {},
  },
};
