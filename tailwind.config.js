module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        header: ['7vw', '6vw'],
        footer: ['3vw'],
        'footer-md': ['2.5vw'],
        'footer-lg': ['1.5vw'],
      },
      fontFamily: {
        charriot: ['Charriot Deluxe'],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
