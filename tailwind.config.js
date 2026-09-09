module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        mytheme: {
          "primary": "#006CB2",
          "secondary": "#212121",
          "accent": "#008968",
          "neutral": "#003334",
          "base-100": "#f5f5f5",
          "info": "#00aaec",
          "success": "#76ad00",
          "warning": "#955d00",
          "error": "#ef4b6e",
        },
      },
    ],
  },
};
