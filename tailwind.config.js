module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        header: ['6vw', '5vw'],
        footer: ['3vw'],
        'footer-md': ['2.5vw'],
        'footer-lg': ['1.5vw'],
      },
      fontFamily: {
        charriot: ['Charriot Deluxe'],
      },
      zIndex: {
        60: 60,
        70: 70,
        80: 80,
        90: 90,
        100: 100,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
