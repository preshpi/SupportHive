/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        black: "#333333",
        "gray-50": "#CCCCCC",
        "gray-100": "#D0D5DD",
        "Light-50": "#EAF6EC",
        "Light-100": "#DFF2E3",
        "Light-200": "#97D699",
        "normal-300": "#28A745",
        "normal-400": "#24963E",
        "normal-500": "#208637",
        "Dark-600": "#1E7D34",
        "Dark-700": "#186429",
        "Dark-800": "#124B1F",
        "Dark-900": "#000E04",
        "light-red": "#F62C23",
        "dark-red": "#F62C23",
      },
    },
  },
  plugins: [],
};
