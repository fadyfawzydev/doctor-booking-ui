/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // High contrast colors
        'hc-blue': {
          800: '#003366',
          900: '#002244',
        },
        'hc-red': {
          800: '#990000',
          900: '#660000',
        },
      },
    },
  },
  plugins: [],
}; 