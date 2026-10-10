/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        saffron: {
          light: '#F8A555',
          DEFAULT: '#F28C28',
          deep: '#C65316',
          dark: '#A33E0A',
        },
        templeRed: {
          light: '#AB2828',
          DEFAULT: '#8B1E1E',
          dark: '#6B1212',
        },
        cream: {
          light: '#FFFCF5',
          DEFAULT: '#FFF8E8',
          dark: '#F7EDD2',
          card: '#FFFDF9',
        },
        gold: {
          light: '#E6BE68',
          DEFAULT: '#D4A64A',
          dark: '#B0832B',
        },
        templeText: {
          muted: '#6B4A38',
          DEFAULT: '#3D2418',
          dark: '#26130B',
        }
      },
      fontFamily: {
        devanagari: ['"Noto Sans Devanagari"', 'Mukta', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Rozha One"', '"Noto Sans Devanagari"', 'serif'],
      },
      boxShadow: {
        'temple': '0 4px 20px -2px rgba(139, 30, 30, 0.08), 0 2px 6px -1px rgba(198, 83, 22, 0.06)',
        'temple-hover': '0 10px 25px -3px rgba(139, 30, 30, 0.12), 0 4px 10px -2px rgba(198, 83, 22, 0.1)',
        'temple-sm': '0 2px 8px rgba(61, 36, 24, 0.06)',
      }
    },
  },
  plugins: [],
}
