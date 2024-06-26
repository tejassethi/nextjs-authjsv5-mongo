import type { Config } from "tailwindcss";

const config = {
  theme: {
    extend: {
      colors: {
        // gray: {
        //   light: "#9CA3AF",
        //   DEFAULT: "#535353",
        //   dark: "#2D2D2D",
        //   new: "1E1E1E",
        // },
        white: "#FAF9FC",
        black: "#000000",
        red: { DEFAULT: "#dc2626", light: "#f87171" },
      },
      fontFamily: {
        OpenSans: ["Open Sans", "sans-serif"],
        NerkoOne: ["Nerko One"],
        GMSans: ["DM Sans"],
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
  },
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],

  plugins: [require("tailwindcss-animate"), require("tailwindcss-animated")],
} satisfies Config;

export default config;
