module.exports = {
  content: ['./src/**/*.{ts,html}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#22c55e',
        accent: '#f59e0b',
        danger: '#ef4444',
        background: '#f3f4f6',
        darkbg: '#1e293b',
      },
      borderRadius: {
        layout: '0.75rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      spacing: {
        layout: '1.5rem',
      },
    },
  },
};
