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
          border: "#D1D5DB", // Light gray
          input: "#E5E7EB", // Slightly darker gray
          background: "#FFFFFF", // White
          foreground: "#111827", // Dark gray
          primary: {
            DEFAULT: "#3B82F6", // Blue
            foreground: "#FFFFFF", // White
          },
          secondary: {
            DEFAULT: "#F3F4F6", // Light gray
            foreground: "#111827", // Dark gray
            color2: "#60A5FA", // Light blue
            color3: "#93C5FD", // Lighter blue
            color4: "#E5E7EB", // Light gray
            color5: "#F59E0B", // Amber
          },
          destructive: {
            DEFAULT: "#EF4444", // Red
            foreground: "#FFFFFF", // White
          },
          muted: {
            DEFAULT: "#F9FAFB", // Off-white
            foreground: "#6B7280", // Gray
          },
          accent: {
            DEFAULT: "#F9FAFB", // Off-white
            foreground: "#6B7280", // Gray
          },
          popover: {
            DEFAULT: "#FFFFFF", // White
            foreground: "#111827", // Dark gray
          },
          card: {
            DEFAULT: "#F3F4F6", // Light gray
            foreground: "#111827", // Dark gray
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
