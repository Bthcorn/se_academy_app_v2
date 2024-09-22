/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1440px",
      },
    },
    extend: {
      colors: {
        border: "#343B4F",
        input: "#343B4F",
        background: "#081028",
        foreground: "#FAFAFA",
        primary: {
          DEFAULT: "#CB3CFF",
          foreground: "#FAFAFA",
        },
        secondary: {
          DEFAULT: "#0B1739",
          foreground: "#FAFAFA",
          color2: "#9A91FB",
          color3: "#00C2FF",
          color4: "#343B4F",
          color5: "#FDB52A",
        },
        destructive: {
          DEFAULT: "#FF5A65",
          foreground: "#FAFAFA",
        },
        muted: {
          DEFAULT: "#0A1330",
          foreground: "#AEB9E1",
        },
        accent: {
          DEFAULT: "#0A1330",
          foreground: "#AEB9E1",
        },
        popover: {
          DEFAULT: "#081028",
          foreground: "#FAFAFA",
        },
        card: {
          DEFAULT: "#0B1739",
          foreground: "#FAFAFA",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      keyframes: {},
      animation: {},
      backgroundImage: {
        gradient: "linear-gradient(128deg, #CB3CFF 19.86%, #7F25FB 68.34%)",
      },
    },
  },
  plugins: [import("tailwindcss-animate")],
};
