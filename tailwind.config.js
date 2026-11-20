/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: '#0D0F12',
          card: '#16191F',
          topbar: '#090A0D',
          border: '#262A33',
          primary: '#DC2626',
          hover: '#B91C1C',
          text: '#F8FAFC',
          muted: '#94A3B8',
          gold: '#FACC15',
          trust: '#13161C',
        },
      },
      fontFamily: {
        heading: ['Barlow', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
