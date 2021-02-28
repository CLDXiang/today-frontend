module.exports = {
  purge: ['./src/**/*.{vue,ts,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      boxShadow: {
        popover: '0 2px 8px rgb(0 0 0 / 15%)',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
