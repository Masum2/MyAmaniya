/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: app ফোল্ডার এবং src ফোল্ডারের সব ফাইল এখানে যুক্ত করা হয়েছে
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}" 
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}