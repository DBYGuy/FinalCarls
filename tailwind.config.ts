// import type { Config } from 'tailwindcss';
/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
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
        linear: '#fbd099',
      },

      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
        'gradient-y': 'gradient-y 15s ease infinite',
        'gradient-xy': 'gradient-xy 1s ease-in-out infinite',
      },
      keyframes: {
        'gradient-y': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'center top',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'center center',
          },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
        'gradient-xy': {
          '0%, 100%': {
            'background-size': '400% 400%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '100% 100%',
            'background-position': 'right center',
          },
        },
      },
      spacing: {},
      fontFamily: {
        bold: 'var(--font-open-sans-bold)',
        outfit: 'var(--font-outfit)',
        'button-1': 'var(--font-open-sans)',
        omegle: 'var(--font-omegle)',
        'open-sans': 'var(--font-open-sans)',
        title: 'var(--font-omegle)',
        'rainbow-buttons-1': 'var(--font-sf-pro-rounded)',
        sfpro: 'var(--font-sf-pro-rounded)',
        inherit: 'inherit',
        light: 'var(--font-outfit)',
      },
      borderRadius: {
        '50xl': '69px',
        sm: '14px',
        smi: '13px',
        xl: '20px',
        lg: '18px',
        '15xl': '34px',
        '76xl': '95px',
        '8xs-3': '4.3px',
        '2xs-3': '10.3px',
        'xs-3': '11.3px',
        '9xs-9': '3.9px',
        '6xs-6': '6.6px',
        '17xl': '36px',
        '3xs': '10px',
        '7xs': '6px',
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
