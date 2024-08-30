import type { Config } from "tailwindcss";
import { withUt } from "uploadthing/tw";

const defaultTheme = require("tailwindcss/defaultTheme");

let plugin = require("tailwindcss/plugin");

const config = withUt({
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    screens: {
      md900: "900px",
      md830: "830px",
      xs: "400px",
      ...defaultTheme.screens,
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        gotham: ["var(--font-gotham)", "Arial", "sans-serif"],
        gothamBlack: ["var(--font-gothamBlack)", "Arial", "sans-serif"],
        gothamXLight: ["var(--font-gothamXLight)", "Arial", "sans-serif"],
        gothamLight: ["var(--font-gothamLight)", "Arial", "sans-serif"],
        gothamThin: ["var(--font-gothamThin)", "Arial", "sans-serif"],
        gothamBook: ["var(--font-gothamBook)", "Arial", "sans-serif"],
      },
      maxWidth: {
        "8xl": "88rem",
      },
      minHeight: {
        "50vh": "50vh",
      },
      height: {
        "88": "22rem",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
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
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addVariant }: { addVariant: any }) {
      addVariant("onelast", "&:nth-last-of-type(-n+2)");
    }),
  ],
}) satisfies Config;

export default config;
