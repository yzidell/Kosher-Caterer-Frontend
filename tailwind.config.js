/* eslint-disable no-unused-vars */
/** @type {import('tailwindcss').Config} */

//import configMyColors from './src/configMyColors'
//import plugin from 'tailwindcss'

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
          //'frontend-primary-color1': configMyColors.STR_FRONTEND_PRIMARY_COLOR1,
          //'frontend-primary-color2': configMyColors.STR_FRONTEND_PRIMARY_COLOR2,
      },
    },
    screens: {
      '2xl':    {'max': '1360px'},
      'xl':     {'max': '1200px'},
      'lg':     {'max': '1080px'},
      'md-lg':  {'max': '991px'},
      'md':     {'max': '768px'},
      'sm':     {'max': '576px'},
      'xs':     {'max': '480px'},
      '2xs':    {'max': '340px'},
    }
  },
  plugins: [
    //https://www.youtube.com/watch?v=XlIaBYA2GnI


  ],
}
