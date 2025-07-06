// client/postcss.config.cjs
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // if you still want scrollbar styles at the PostCSS layer:
    "tailwind-scrollbar": {},
  },
};
