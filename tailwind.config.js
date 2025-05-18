/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: ['selector', '[class~="my-app-dark"]'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-primeui')],
}
