/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream:      '#FAF6EF',
        warm:       '#F2E8D9',
        sage:       '#7A9E7E',
        'sage-dk':  '#4F7A54',
        'sage-lt':  '#A3C9A8', // New: Lighter sage for badges/tags
        clay:       '#C4784A',
        'clay-lt':  '#E8A87C',
        ink:        '#1E2B1F',
        muted:      '#6B7B6C',
      },
      fontFamily: {
        display:     ['"Playfair Display"', 'serif'],
        body:        ['"DM Sans"', 'sans-serif'],
        handwriting: ['"Dancing Script"', 'cursive'], // New: For signatures
      },
      animation: {
        'fade-up': 'fadeUp 0.7s ease both',
        'fade-in': 'fadeIn 1s ease both',
        'slide-right': 'slideRight 0.8s 0.6s ease both',
        'shimmer': 'shimmer 2s infinite', // New: For skeleton loaders
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
};