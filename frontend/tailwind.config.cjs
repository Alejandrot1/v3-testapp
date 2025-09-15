/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        fire: {
          red: "#E11D48",
          dark: "#7F1D1D",
          amber: "#F59E0B"
        }
      }
    },
  },
  plugins: [],
}