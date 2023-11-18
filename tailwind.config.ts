import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      screens: {
        '2xl': { max: '1535px' },
        xl: { max: '1279px' },
        lg: { max: '1023px' },
        md: { max: '900px' },
        sm: { max: '760px' },
  
        minsm: { min: '640px' },
        minmd: { min: '768px' },
        minlg: { min: '1024px' },
        minxl: { min: '1280px' },
        min2xl: { min: '1536px' },
      },
      colors: {
        'black-rgba': 'rgba(0, 0, 0, 0.54)',
        'black-rgba2': 'rgba(0, 0, 0, 0.7)',
        'black-rgba3': 'rgba(0, 0, 0, 0.8)',
        'black-rgb': 'rgb(33, 33, 33)',
        'black-rgb1': 'rgb(12, 12, 12)',
        'black-rgb2': 'rgb(24, 24, 24)',
        'black-rgb3': 'rgb(12, 12, 15)',
        "pink-gb1": "#f4abba",
        "pink-gb2": "#F698BD",
        "pink-gb3": "#F88CAE",
        "pink-rgb4": "rgb(234, 208, 214)",
        "pink-rgb5": "rgb(212, 152, 177)",
        'red-bg1' : "#990000",
        'red-bg2' : "#7f0000",
        'red-bg3' : "#660000"
      },
      boxShadow :{
        "3xl" : "rgba(244, 171, 186, 0.25) 0px 54px 55px, rgba(248, 140, 174, 0.12) 0px -12px 30px, rgba(246, 152, 189, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(221, 149, 180, 0.09) 0px -3px 5px",
        "4xl" : "rgba(204, 21, 18, 0.25) 0px 54px 55px, rgba(127, 0, 0, 0.12) 0px -12px 30px, rgba(246, 152, 189, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(221, 149, 180, 0.09) 0px -3px 5px",
        "5xl" : "rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;"
      },
      animation: {
        "animate-pulse"	: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "animate-spin" : "spin 1s linear infinite"
      }
    },
  },
  plugins: [],
}
export default config
