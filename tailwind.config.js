/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './_includes/**/*.njk',
    './*.njk',
    './public/js/**/*.js',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        typewriter: ['"Courier Prime"', '"Courier New"', 'Courier', 'monospace'],
        serif: ['Lora', 'Georgia', 'serif'],
      },
      colors: {
        paper: '#faf9f7',
        ink:   '#1c1917',
        accent: '#c0392b',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
