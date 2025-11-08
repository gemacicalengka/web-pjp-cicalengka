/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'hover:bg-green-500',
    'hover:bg-yellow-500',
    'hover:bg-sky-500',
    'hover:text-white',
  ],
};