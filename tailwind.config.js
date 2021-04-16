module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontSize: {
      'header': '7vw'
    },
    fontFamily: {
      charriot: ['Charriot Deluxe']
    }
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
