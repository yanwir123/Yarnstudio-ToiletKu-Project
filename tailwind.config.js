/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#00ffff",
        dark: "#0a0a0a",
      },
    },
  },
  plugins: [],
};

export default config;
