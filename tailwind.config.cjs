const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue,mjs}'],
  darkMode: 'media',
  mode: 'jit',
  theme: {
    extend: {
      typography: {
        DEFAULT: {
          css: {
            lineHeight: '2',
            h2: {
              marginTop: '0',
            },
          },
        },
      },
      fontFamily: {
        sans: ['Niramit', ...defaultTheme.fontFamily.sans],
        header: ['LINE Seed', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography')],
}
