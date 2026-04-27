/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#F5F2ED',
        card:    '#EFEBE4',
        ink:     '#1A1714',
        muted:   '#6B6560',
        accent:  '#C8891A',
        'accent-dark':  '#9E6B10',
        'accent-light': '#F2C76A',
        'accent-bg':    '#FDF6E7',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body:    ['DM Sans', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};