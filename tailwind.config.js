/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Enables class-based dark mode
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
        // Dark mode colors (existing ones)
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

        // Light mode colors (new ones)
        light: {
          border: "#FFDCE6", // Light pink for borders
          input: "#E2F5B6", // Soft pastel green for input backgrounds
          background: "#FFFFFF", // White for main background
          foreground: "#111827", // Black for text readability
          primary: {
            DEFAULT: "#85E0D6", // Aqua for primary elements
            foreground: "#FFFFFF", // White text on primary buttons
          },
          secondary: {
            DEFAULT: "#FFDCE6", // Light pink for secondary backgrounds
            foreground: "#111827", // Black text
            color2: "#ADD057", // Lime green for highlights
            color3: "#00BCA3", // Aqua for accents
            color4: "#E2F5B6", // Soft green for subtle elements
            color5: "#85E0D6", // Aqua for secondary accents
          },
          destructive: {
            DEFAULT: "#FF6347", // Tomato red for destructive actions
            foreground: "#FFFFFF", // White text on destructive elements
          },
          muted: {
            DEFAULT: "#E2F5B6", // Soft green for muted elements
            foreground: "#6B7280", // Gray text for muted elements
          },
          accent: {
            DEFAULT: "#FFDCE6", // Light pink for accents
            foreground: "#6B7280", // Gray text for accents
          },
          popover: {
            DEFAULT: "#FFCBAD", // Warm peach for popovers
            foreground: "#111827", // Black text
          },
          card: {
            DEFAULT: "#E2F5B6", // Soft green for cards
            foreground: "#111827", // Black text
          },
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
  plugins: [require("tailwindcss-animate")],
};
