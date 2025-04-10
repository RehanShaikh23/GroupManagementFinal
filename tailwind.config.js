module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: '#1E40AF', // Example blue
        secondary: '#F59E0B', // Example amber
        danger: '#DC2626', // Red for delete buttons
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Clean UI font
      },
      borderRadius: {
        xl: '1rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
