/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        askedBg: "#050816",
        askedCard: "#0b1020",
        askedAccent: "#4f46e5",
        askedAccentSoft: "#6366f1"
      },
      boxShadow: {
        asked: "0 18px 40px rgba(15,23,42,0.85)"
      },
      borderRadius: {
        "2xl": "1rem"
      }
    }
  },
  plugins: []
};


