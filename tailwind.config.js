/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*.{vue,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    /* https://tailwindcss.com/docs/customizing-colors#color-palette-reference */
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: colors.white,
      black: colors.black,
      'blue-gray': colors.blueGray,
      'cool-gray': colors.coolGray,
      gray: colors.gray,
      'true-gray': colors.trueGray,
      'warm-gray': colors.warmGray,
      red: colors.red,
      orange: colors.orange,
      amber: colors.amber,
      yellow: colors.yellow,
      lime: colors.lime,
      green: colors.green,
      emerald: colors.emerald,
      teal: colors.teal,
      cyan: colors.cyan,
      'light-blue': colors.lightBlue,
      blue: colors.blue,
      indigo: colors.indigo,
      violet: colors.violet,
      purple: colors.purple,
      fuchsia: colors.fuchsia,
      pink: colors.pink,
      rose: colors.rose,
      /* FIXME: 切换主题色到 Tailwind 色板 */
      primary: '#60bdca',
    },
    extend: {
      width: {
        160: '40rem',
      },
      maxWidth: {
        '14xl': '160rem',
      },
      boxShadow: {
        popover: '0 2px 8px rgb(0 0 0 / 15%)',
      },
      fontSize: {
        xxs: ['0.625rem', '0.75rem'],
      },
      minHeight: {
        28: '7rem',
      },
    },
  },
  variants: {
    extend: {
      margin: ['first'],
      backgroundColor: ['odd', 'even'],
      borderWidth: ['last'],
    },
  },
  plugins: [],
};
