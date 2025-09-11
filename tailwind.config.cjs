/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      textDecorationSkipInk: {
        none: 'none',
        auto: 'auto',
      },
      fontFamily: {
        helvetica: ['"Helvetica Neue"', 'sans-serif'],
      },
      screens: {
        xs: '320px', 
        xls: '1440px'
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.text-decoration-skip-none': {
          'text-decoration-skip-ink': 'none',
        },
        '.text-decoration-skip-auto': {
          'text-decoration-skip-ink': 'auto',
        },
      });
    },
  ],
};
