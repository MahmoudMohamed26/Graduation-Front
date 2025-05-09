/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}' , './public/**/*.html'], // Adjust this to match your project structure
  darkMode: 'class',
  theme: {
    extend: {
      translate: {
        '1/2': '-50%',
      },
      fontFamily: {
        cairo: ['Cairo', 'sans-serif'], // Add Cairo as a custom font
      },
    },
  },
  plugins: [],
};
