/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    theme: {
      fontFamily: {
        sans: ["Mulish", "sans-serif"],
        mono: ["Rokkitt", "monospace"],
      },
    },
  },
  plugins: [],
};
