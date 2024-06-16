import type { Config } from 'tailwindcss';
const colors = require('tailwindcss/colors');

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      animation: {
        'bg-breathing': 'bg-breathing 3s ease-in-out infinite',
      },
      keyframes: {
        'bg-breathing': {
          '0%,100%': {
            'background-color': colors.gray[50],
            color: colors.gray[500],
          },
          '50%': {
            'background-color': colors.sky[50],
            color: colors.sky[500],
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
