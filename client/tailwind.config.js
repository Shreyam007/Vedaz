import plugin from 'tailwindcss/plugin';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bgPrimary: '#0A0F1E',
        bgSecondary: '#0F1629',
        bgTertiary: '#141D35',
        accentIndigo: '#6366F1',
        accentTeal: '#0D9488',
        textPrimary: '#F1F5F9',
        textSecondary: '#94A3B8',
        textMuted: '#475569',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'shimmer': 'shimmer 1.5s infinite',
        'fade-slide-up': 'fadeSlideUp 0.4s ease-out forwards',
        'stagger-in': 'stagger-in 0.5s ease-out forwards',
        'pulse-glow': 'pulse-glow 2s infinite',
        'spin-slow': 'spin-slow 8s linear infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'confetti-fall': 'confetti-fall 3s ease-in forwards',
        'slot-taken': 'slot-taken 0.6s ease forwards',
        'toast-in': 'toast-in 0.3s ease forwards',
        'progress-drain': 'progress-drain 4s linear forwards',
        'ripple': 'ripple 1.5s ease infinite',
        'float': 'float 8s ease infinite',
        'float-reverse': 'float 10s ease infinite reverse',
      },
      keyframes: {
        // We will define the actual CSS keyframes in index.css as requested,
        // but adding them here in Tailwind config is optional if defined in CSS.
        // I will define them in index.css for maximum flexibility.
      }
    },
  },
  plugins: [
    plugin(function({ addUtilities }) {
      addUtilities({
        '.glass': {
          backgroundColor: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 255, 255, 0.06)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '1rem', // 16px
        },
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      });
    })
  ],
}
