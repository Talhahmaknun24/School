/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#16a34a',
        secondary: '#2563eb',
        accent: '#9333ea',
      }
    },
  },
  plugins: [],
}