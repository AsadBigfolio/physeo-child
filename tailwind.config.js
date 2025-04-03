/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // container: {
      //   center: true,
      //   padding: {
      //     DEFAULT: "1rem",
      //     sm: "2rem",
      //     lg: "4rem",
      //     xl: "5rem",
      //     "2xl": "6rem",
      //   },
      //   screens: ["sm", "md", "lg", "xl", "2xl"],
      // },
      aspectRatio: {
        '16/6': '16 / 6',
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        border: "hsl(var(--border))",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
          light: "var(--background-light)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        background: {
          DEFAULT: "var(--background)",
          foreground: "var(--background-foreground)",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        mainText: "#202020",
        purpleText: "#8350DF",
        secondaryWhite: "#f7f1ff",
        authWhite: "#eff4f8",
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        poppinsBold: ["Poppinsbold", "sans-serif"],
        syne: ["Syne", "sans-serif"],
        philosopher: ["Philosopher", "sans-serif"],
      },
      fontSize: {
        // 'display-xxl': '64px', //main tittle
        // 'heading-lg': '32px',//main tittle md
        // 'heading-xl': '48px', // tittle
        // 'heading-md': '32px',
        // 'title-xl': '24px',  //title md
        // 'title-lg': '18px', //small tittle
        // 'subtitle-md': '16px', //text
        'para-lg': '20px',
        // 'para-base': '12px',
      },
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
    },
  },
  plugins: [require("tailwindcss-animate")],
};
