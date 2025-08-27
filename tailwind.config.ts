import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "off-white": "#F8F7F4",
        "soft-grey": "#EAEAEA",
        charcoal: "#333333",
        "mocha-mousse": "#A08D82", // Our primary accent color
      },
      fontFamily: {
        montserrat: ["var(--font-montserrat)", "sans-serif"],
        merriweather: ["var(--font-merriweather)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
