/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customBlue: "#073873",
        customRed: "#730707",
        customGreen: "#077313",
        customCyan: "#08736d",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": {
            transform: "rotate(0deg)",
            transformOrigin: "50% 50%",
          },
          "10%": {
            transform: "rotate(8deg)",
          },
          "20%, 40%, 60%": {
            transform: "rotate(-10deg)",
          },
          "30%, 50%, 70%": {
            transform: "rotate(10deg)",
          },
          "80%": {
            transform: "rotate(-8deg)",
          },
          "90%": {
            transform: "rotate(8deg)",
          },
        },
      },
      animation: {
        wiggle: "wiggle 1s ease-in-out infinite",
      },
    },
  },
  plugins: [require("daisyui")],
};
