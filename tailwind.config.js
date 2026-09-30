/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          base: "#F6F4EE",
          subtle: "#EFECE4",
          elevated: "#FCFAF6",
          sunken: "#E5E0D5",
          dark: "#161513",
          "dark-card": "#1E1C19",
          "dark-subtle": "#272420",
        },
        ink: {
          primary: "#181715",
          secondary: "#4D4842",
          tertiary: "#787268",
          muted: "#A49E93",
          inverse: "#F7F5F0",
          "inverse-sub": "#B8B2A6",
          "inverse-mute": "#706B62",
        },
        olive: {
          DEFAULT: "#3F5744",
          light: "#526F58",
          dim: "#253328",
          wash: "#E8ECE7",
        },
        amber: {
          DEFAULT: "#A36A26",
          wash: "#F7F0E4",
        },
        rust: {
          DEFAULT: "#8C382A",
          wash: "#F9ECE9",
        },
        hairline: {
          light: "#DDD7CB",
          strong: "#BDB5A4",
          dark: "#2C2925",
          "dark-subtle": "#22201D",
        }
      },
      fontFamily: {
        display: ['"Newsreader"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', 'monospace'],
      },
      borderRadius: {
        xs: "2px",
        sm: "3px",
        md: "5px",
      },
      maxWidth: {
        layout: "1200px",
        readable: "720px",
        narrow: "960px",
      },
      boxShadow: {
        subtle: "0 1px 2px rgba(24, 23, 21, 0.04)",
        card: "0 1px 3px rgba(24, 23, 21, 0.05), 0 4px 12px rgba(24, 23, 21, 0.02)",
        terminal: "0 12px 32px -8px rgba(10, 9, 8, 0.35)",
        inset: "inset 0 1px 2px rgba(0, 0, 0, 0.04)",
      }
    },
  },
  plugins: [],
}
