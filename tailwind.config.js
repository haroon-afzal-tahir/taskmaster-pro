/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#63CB21",
        secondary: "#263238",
        primaryLight: "#E6FEED",
      },
      boxShadow: {
        "all-around": "0 0 10px 0 rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}

