/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");
delete colors["lightBlue"];
delete colors["warmGray"];
delete colors["lightBlue"];
delete colors["coolGray"];
delete colors["blueGray"];

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    colors: {
      hover: "#f59bac",

      ...colors,
    },
    backgroundColor: {
      main: "#222831",
      primary: "#131720",
      ...colors,
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
      screens: {
        sm: "640px",
        lg: "840px",
        xl: "1024px",
      },
    },
  },
  plugins: [],
};
