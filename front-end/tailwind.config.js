/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        black1: "rgba(0,0,0,0.8)",
        banner: "rgb(255,192,23)",

      },
      fontFamily:{
        title:"gt-super,Georgia,Cambria,Times New Roman,Times,serif;",
        text:"sohnem,Helvetic Neue,Helvetic,Arial.san-serif",
      },
      gridTemplateColumns:{
        card: "repeat(auto-fit,minmax(280px,1fr)",
      }
    },
  },
  plugins: [],
}
