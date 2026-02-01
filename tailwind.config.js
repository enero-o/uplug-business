/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Government / FIRS green palette */
        gov: {
          primary: '#1b5e20',
          'primary-dark': '#0d3d12',
          'primary-light': '#2e7d32',
          accent: '#388e3c',
          muted: '#4caf50',
          surface: '#e8f5e9',
          border: '#a5d6a7',
          text: '#1b2e1f',
          'text-muted': '#2e4a32',
        },
        sidebar: {
          DEFAULT: '#1e293b',
          hover: '#334155',
          active: '#0f172a',
          border: '#334155',
        },
        surface: {
          DEFAULT: '#f8fafc',
          card: '#ffffff',
          border: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
