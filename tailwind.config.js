/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  theme: {
    screens: {
      xs: "600px",
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      "2xl": "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    extend: {
      colors : {
        "canvas-color": "#f3f2ef",
        "primary-color": "#73c2fb",
      },
      flex: {
        "25%": "0 0 25%",
        "75%": "0 0 75%",
        "50%": "0 0 50%",
        "full": "0 0 100%",
        "66.66%": "0 0 66.6666%",
        "33.33%": "0 0 33.3333%",
      },
    },
  },
  plugins: [],
}
