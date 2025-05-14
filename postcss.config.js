import daisyui from 'daisyui';

export default {
  plugins: {
    '@tailwindcss/postcss': {
      theme: {
        extend: {},
      },
      plugins: [
        daisyui,
      ],
      daisyui: {
        themes: ["light", "dark"],
      },
    },
    autoprefixer: {},
  },
}