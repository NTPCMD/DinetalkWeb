import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(214, 13%, 85%)',
        input: 'hsl(214, 13%, 85%)',
        ring: 'hsl(215, 20%, 65%)',
        background: '#f8fafc',
        foreground: '#0f172a',
        primary: {
          DEFAULT: '#4f46e5',
          foreground: '#ffffff',
        },
        muted: {
          DEFAULT: '#e2e8f0',
          foreground: '#475569',
        },
      },
      borderRadius: {
        lg: '0.75rem',
        md: '0.5rem',
        sm: '0.375rem',
      },
      boxShadow: {
        card: '0 10px 30px rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};

export default config;
