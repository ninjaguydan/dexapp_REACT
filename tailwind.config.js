/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#f12849",
        primaryDark: "#ca0b2b",
        secondary: "#009df1",
        gray1: "#151415",
        gray2: "#1c1c1f",
        gray3: "#6c757d",
        gray4: "#898989",
        gray5: "#ced4da",
      },
    },
  },
  plugins: [],
};
