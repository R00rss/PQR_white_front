/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'azul': '#132a74',
        'morado': '#282561',
        'gris': '#424242',
        'gris-claro': '#B7B7B7',
        'blanco': '#fafafa',
        'plomo': '#6883ae',
        'azul-claro': '#157afe',
        'azul-login': '#203878',
      },
      backgroundImage: {
        'navbar': "url('./src/assets/navbarbg.png')",
        'fondoazul': "url('/src/assets/fondo_login.png')",
      }

    },
  },
  plugins: [],
}

