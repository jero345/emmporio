import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        base: '#0B0F14',
        // Mismo valor que `base`, pero para color de texto: `text-base` choca
        // con la utilidad de tamaño de fuente de Tailwind, `text-ink` no.
        ink: '#0B0F14',
        surface: '#141A20',
        surface2: '#1E252C',
        gold: '#B08048',
        goldSoft: '#C99F67',
        bone: '#E9EDE1',
        text: '#F2F3F0',
        muted: '#97A0A8',
        border: 'rgba(233,237,225,0.10)',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      fontSize: {
        h1: ['clamp(2.5rem, 5vw, 4.25rem)', { lineHeight: '1.06', letterSpacing: '-0.02em' }],
        h2: ['clamp(2rem, 3.5vw, 3rem)', { lineHeight: '1.12', letterSpacing: '-0.015em' }],
        h3: ['clamp(1.35rem, 2vw, 1.75rem)', { lineHeight: '1.25' }],
      },
      maxWidth: {
        container: '1280px',
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #B08048, #C99F67)',
        'hero-overlay':
          'linear-gradient(115deg, rgba(11,15,20,0.94) 0%, rgba(11,15,20,0.78) 42%, rgba(11,15,20,0.35) 100%)',
        'card-overlay': 'linear-gradient(180deg, rgba(11,15,20,0) 35%, rgba(11,15,20,0.92) 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'ken-burns': {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.12)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
        marquee: 'marquee 32s linear infinite',
        'spin-slow': 'spin-slow 18s linear infinite',
        'ken-burns': 'ken-burns 9s ease-out both',
      },
      typography: ({ theme }) => ({
        invert: {
          css: {
            '--tw-prose-body': theme('colors.muted'),
            '--tw-prose-headings': theme('colors.text'),
            '--tw-prose-bold': theme('colors.text'),
            '--tw-prose-links': theme('colors.goldSoft'),
            '--tw-prose-bullets': theme('colors.gold'),
            '--tw-prose-quotes': theme('colors.text'),
            '--tw-prose-quote-borders': theme('colors.gold'),
          },
        },
      }),
    },
  },
  plugins: [typography],
};
