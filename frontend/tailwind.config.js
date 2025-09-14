/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // A custom color palette for a vibrant feel
        'primary': '#6366f1',  // Tailwind's indigo-500
        'secondary': '#8b5cf6', // Tailwind's violet-500
        'accent': '#a855f7',    // Tailwind's fuchsia-500
        'bg-dark': '#1a1b26',   // A slightly darker gray
        'text-light': '#a9b1d6', // A soft gray for text
      }
    },
  },
  plugins: [],
}