/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        'oak-white': '#FFFCF2',
        'oak-light': '#D5D9BA',
        'oak-green': '#9CA786',
        'oak-purple': '#967AB5',
        'oak-dark': '#414336',
        'oak-black': '#000000',
      },
      fontFamily: {
        'frank': ['Frank Ruhl Libre', 'serif'],
        'dm': ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}