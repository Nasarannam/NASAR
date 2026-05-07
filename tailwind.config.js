/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#06080f',
        panel: 'rgba(255,255,255,0.06)',
        neon: '#7c6cff',
        cyan: '#34d6ff',
      },
      boxShadow: {
        glow: '0 0 30px rgba(124,108,255,.35)',
      },
      animation: {
        'spin-slow': 'spin 10s linear infinite',
        float: 'float 6s ease-in-out infinite',
        marquee: 'marquee 24s linear infinite',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
};
