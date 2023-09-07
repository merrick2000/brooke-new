import type { Config } from "tailwindcss";

import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--poppins)", ...defaultTheme.fontFamily.sans],
        serif: ["var(--bricolage-grotesque)", ...defaultTheme.fontFamily.serif],
      },
      fontSize: {
        "10": "10px",
      },
      colors: {
        "light-gray": "#FAF9F7",
        "medium-gray": "#F0F0F0",
        primary: "#00265A", // Blue primary color
        disabled: "#EBEBEB",
        secondary: "#f0bd14", // Yellow secondary color
        tertiary: "#69D63C", // Green tertiary color
        cta: "#48beb9", // Cyan call to action color
        hero: "#eadc70", // Front page hero text color
        points: "#2575FB",
        "switch-on": "#0A2AA9",
      },
    },
  },
  plugins: [],
};
export default config;
