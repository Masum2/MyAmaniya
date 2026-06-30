/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', 
content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#3b82f6",
        background: {
          light: "#ffffff",
          dark: "#121212",
        },
      },
    },
  },
  plugins: [],
}