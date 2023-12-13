import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        blueviolet: '#9747ff',
        'dark-connectbuttonbackground': '#1a1b1f',
        'dark-actionbuttonsecondarybackground': 'rgba(255, 255, 255, 0.06)',
        'white-gold-itsc': '#f1dfd5',
        'itsc-black': '#1a1a1a',
        black: '#000',
        // gray: '#23262f',
        gray: '#1a1a1a',
        'dusty-red': '#d15454',
        lightslategray: '#89969f',
        silver: '#b8c5d0',
        white: '#fff',
        darkslategray: '#3a3a3a',
        khaki: '#ffe299',
        mediumorchid: 'rgba(208, 58, 184, 0.19)',
      },
      spacing: {},
      fontFamily: {
        bold: 'var(--font-sf-pro-rounded)',
        outfit: 'var(--font-outfit)',
        'button-1': 'var(--font-open-sans)',
        omegle: 'var(--font-omegle)',
        'open-sans': 'var(--font-open-sans)',
        title: 'var(--font-omegle)',
        'rainbow-buttons-1': 'var(--font-sf-pro-rounded)',
        inherit: 'inherit',
      },
      borderRadius: {
        '50xl': '69px',
        sm: '14px',
        smi: '13px',
        xl: '20px',
        '15xl': '34px',
        '76xl': '95px',
        '8xs-3': '4.3px',
        '17xl': '36px',
        '3xs': '10px',
      },
    },
    fontSize: {
      '45xl': '64px',
      base: '16px',
      '5xl': '24px',
      xs: '12px',
      xl: '20px',
      inherit: 'inherit',
    },
  },
  corePlugins: {
    preflight: false,
  },
};
export default config;
