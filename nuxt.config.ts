// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/styles/tailwind.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Other configurations...
  nitro: {
    preset: 'node-server',
  },

  compatibilityDate: '2025-01-14',
});