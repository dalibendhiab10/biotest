/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'custom-green': '#D6EFD8',
        "green-green":'#1E664D',
        "primary-blue": "#233368",
        "secondary-blue": "#0096DC",
        "light-blue": "#699BF7",
        "primary-gray": "#F2F2F3",
        "secondary-gray": "#D9D9D9",
        "dark-gray": "#CFD7E8",
        "gray-button": "#8F8989",
        "gray-table": "#F3F3F5",
        "placeholder-gray": "#777171",
        "light-black": "#04060C",
        "white-shade": "#FFFFFF",
        "primary-red": "#FF3A00",
        "secondary-red": "#FF3636",
        "orange-shade": "#FCA119",
        "green-shade": "#00FF1A",
      },

      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
        },

    },




  },
  plugins: [      
    function ({ addBase, theme }) {
    addBase({
      body: {
        fontFamily: theme('fontFamily.sans'), 
      }
    });
  },  
]
};
