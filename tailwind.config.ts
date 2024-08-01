// tailwind.config.js
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        'cormorant': ['"Cormorant Garamond"', 'serif'],
      },
      colors: {
        'crred': '#8D131E',
        'crred-50': 'rgba(141, 19, 30, 0.5)',
        'crred-75': 'rgba(141, 19, 30, 0.75)',
        'crred-90': 'rgba(141, 19, 30, 0.9)',
        'crred-title': '#8C141F',
        'crred-light': '#B71C1C',
        'back': '#FFFBF7',
        'back-50': 'rgba(255, 251, 247, 0.5)',
        'back-75': 'rgba(255, 251, 247, 0.75)',
        'back-90': 'rgba(255, 251, 247, 0.9)',
      },
      height: {
        '4screen/5': 'calc(400vh / 5)',
        '2screen/3': 'calc(200vh / 3)',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        'screen/6': 'calc(100vh / 6)',
        '60': '15rem',
        '100': '25rem',
        '126': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',

      },
      width: {
        '4screen/5': 'calc(400vh / 5)',
        '2screen/3': 'calc(200vh / 3)',
        'screen/2': '50vh',
        'screen/3': 'calc(100vh / 3)',
        'screen/4': 'calc(100vh / 4)',
        'screen/5': 'calc(100vh / 5)',
        'screen/6': 'calc(100vh / 6)',
        '30': '7.5rem',
        '60': '15rem',
        '100': '25rem',
        '126': '32rem',
        '144': '36rem',
        '160': '40rem',
        '192': '48rem',

      },
      fontSize: {
        'xxs': ['0.75rem', { lineHeight: '1rem' }], /* 12px, 16px */
        'xxxs': ['0.625rem', { lineHeight: '0.75rem' }], /* 10px, 12px */
        'xxxxs': ['0.5rem', { lineHeight: '0.625rem' }], /* 8px, 10px */
      },
    },
  },
  plugins: [],
};

export default config;
