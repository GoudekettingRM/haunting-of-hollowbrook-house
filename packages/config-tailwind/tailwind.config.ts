import type { Config } from 'tailwindcss';

// We want each package to be responsible for its own content.
const config: Omit<Config, 'content'> = {
  theme: {
    extend: {
      colors: {
        parchment: '#f0e6d9',
        'old-paper': '#e6d9c7',
        'dark-wood': '#402e1e',
        'medium-wood': '#6b4e2c',
        'light-wood': '#8b6b43',
      },
      fontFamily: {
        serif: ['Times New Roman', 'Times', 'serif'],
      },
      boxShadow: {
        antique: '0 0 10px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
export default config;
