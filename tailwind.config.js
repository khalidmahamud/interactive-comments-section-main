/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/**/*.{html,js}'],
  theme: {
    extend: {
      colors: {
        'Moderate-blue': 'hsl(238, 40%, 52%)',
        'Soft-Red': 'hsl(358, 79%, 66%)',
        'Light-grayish-blue': 'hsl(239, 57%, 85%)',
        'Pale-red': 'hsl(357, 100%, 86%)',
        'Dark-blue': 'hsl(212, 24%, 26%)',
        'Grayish-Blue': 'hsl(211, 10%, 45%)',
        'Light-gray': 'hsl(223, 19%, 93%)',
        'Very-light-gray': 'hsl(228, 33%, 97%)',
      },
      fontFamily: {
        'rubik' : ['Rubik', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

