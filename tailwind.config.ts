import type { Config } from 'tailwindcss';

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        api: {
          DEFAULT: 'var(--api)',
          tua: 'var(--api-tua)',
        },
        hitam: 'var(--hitam)',
        putih: 'var(--putih)',
        abu: {
          DEFAULT: 'var(--abu)',
          terang: 'var(--abu-terang)',
        },
        cyan: 'var(--cyan)',
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        hud: ['"Saira Semi Condensed"', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        box: 'var(--r-box)',
        pill: 'var(--r-pill)',
        input: 'var(--r-input)',
      },
      transitionDuration: {
        fast: 'var(--dur-fast)',
        base: 'var(--dur-base)',
        draw: 'var(--dur-draw)',
        slow: 'var(--dur-slow)',
      },
      transitionTimingFunction: {
        'ease-out-custom': 'var(--ease-out)',
        'ease-inout-custom': 'var(--ease-inout)',
      },
      spacing: {
        '18': '4.5rem',
        '72px': '4.5rem',
        '128px': '8rem',
      },
      maxWidth: {
        container: '1280px',
      },
    },
  },
  plugins: [],
} satisfies Config;
