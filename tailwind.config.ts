import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        white: '#fff',
        darkslateblue: 'rgba(68, 51, 122, 0.53)',
        'purple-500': '#805ad5',
        'carl-frost-white': '#e2e8f0',
        lightgray: '#cecece',
        'light-purp-carl': '#be97fe',
        gray: '#1a202c',
        'purple-400': '#9f7aea',
        'purp-carl': '#673ea9',
      },
      spacing: {},
      fontFamily: {
        coda: 'Coda',
        uniform: 'Uniform',
        'text-md-lineheight-6-font-semibold': 'Inter',
        'archivo-black': "'Archivo Black'",
        chivo: 'Chivo',
        'covered-by-your-grace': "'Covered By Your Grace'",
      },
      borderRadius: {
        'base-8': '15.8px',
        '980xl': '999px',
      },
    },
    fontSize: {
      base: '16px',
      '5xl': '24px',
      lgi: '19px',
      '3xl': '22px',
      lg: '18px',
      '29xl': '48px',
      '10xl': '29px',
      '45xl': '64px',
      '32xl': '51px',
      '19xl': '38px',
      sm: '14px',
      '3xs': '10px',
      mini: '15px',
      xs: '12px',
      '59xl': '78px',
      '43xl': '62px',
      '28xl': '47px',
      '161xl': '180px',
      '53xl': '72px',
      '26xl': '45px',
      '66xl': '85px',
      '23xl': '42px',
      '6xl': '25px',
      inherit: 'inherit',
    },
  },
  plugins: [],
};

export default config;
