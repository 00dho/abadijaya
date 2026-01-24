/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'], // Untuk teks biasa
        display: ['Montserrat', 'sans-serif'], // Untuk Judul Besar
      },
      colors: {
        'abadi-black': '#0f172a', // Hitam kebiruan (elegan)
        'abadi-blue': '#2563eb',  // Biru terang (tombol)
      }
    },
  },
  plugins: [],
}