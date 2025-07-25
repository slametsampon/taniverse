/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./frontend/src/**/*.{ts,html}'], // Lokasi file yang menggunakan Tailwind
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [], // Menambahkan plugin Tailwind (opsional)
};
