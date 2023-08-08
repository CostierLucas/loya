import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#061024",
          sky: "#BBEEFF",
          navy: "#2256BC",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
