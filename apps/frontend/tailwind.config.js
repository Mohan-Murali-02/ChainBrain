/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "accent-cyan": "#06b6d4",
        "accent-blue": "#2563eb",
        "accent-indigo": "#6366f1",
        "primary-container": "#131b2e",
        "on-primary-fixed-variant": "#3f465c",
        "surface-variant": "#e0e3e5",
        "secondary-container": "#2170e4",
        "tertiary-container": "#001f26",
        "surface-container-lowest": "#ffffff",
        "on-surface-variant": "#45464d",
        "error-container": "#ffdad6",
        "surface-bright": "#f7f9fb",
        "surface-dim": "#d8dadc",
        "on-primary-container": "#7c839b",
        "primary-fixed": "#dae2fd",
        "surface-container-low": "#f2f4f6",
        "on-error-container": "#93000a",
        "on-surface": "#191c1e",
        "on-background": "#191c1e",
        "inverse-surface": "#2d3133",
        "inverse-on-surface": "#eff1f3",
        "surface-container-highest": "#e0e3e5",
        "surface-container-high": "#e6e8ea",
        "surface-container": "#eceef0",
        "outline-variant": "#c6c6cd",
      },

      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        "4xl": "2rem",
        full: "9999px",
      },

      spacing: {
        "margin-desktop": "48px",
        "margin-mobile": "16px",
        gutter: "24px",
        "container-max": "1440px",
        unit: "8px",
        "section-gap": "80px",
      },

      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "Courier New", "monospace"],
      },
    },
  },
  plugins: [],
};