/** @type {import('tailwindcss').Config} */
const tailwindAnimated = require("tailwindcss-animated");

module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {},
  },
  plugins: [tailwindAnimated],
};
