/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#064e3b',
          dark: '#022c22',
          vibrant: '#065f46',
        },
        accent: {
          DEFAULT: '#10b981',
          light: '#34d399',
          dark: '#059669',
        },
        mint: '#d1fae5',
        surface: '#f8fafc',
        border: '#e2e8f0',
        text: {
          DEFAULT: '#064e3b',
          muted: '#334155',
          light: '#64748b',
        },
        sidebar: {
          DEFAULT: '#064e3b',
          hover: '#065f46',
          active: '#022c22',
          border: 'rgba(255, 255, 255, 0.1)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Bricolage Grotesque', 'Inter', 'sans-serif'],
      },
      borderRadius: {
        premium: '2.5rem',
        card: '2rem',
      },
      boxShadow: {
        premium: '0 40px 80px -20px rgba(6, 78, 59, 0.15), 0 20px 40px -30px rgba(0, 0, 0, 0.2)',
        subtle: '0 10px 30px -10px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-emerald': 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
        'gradient-header': 'linear-gradient(to right, #064e3b, #065f46)',
      }
    },
  },
  plugins: [],
}
