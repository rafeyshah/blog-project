// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['~/styles/tailwind.css'],
  target: 'static', // Use 'static' for static hosting or 'server' for SSR
  ssr: true, // Set to true for server-side rendering
  build: {
    analyze: true // Optional: Analyze bundle size
  },

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // Other configurations...
  nitro: {
    preset: 'vercel',
  },

  modules: ['@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'fr', iso: 'fr-FR', name: 'Français' },
      { code: 'es', iso: 'es-ES', name: 'Español' },
      { code: 'de', iso: 'de-DE', name: 'Deutsch' }
    ],
    defaultLocale: 'en',
    vueI18n: './i18n.config.js',
    strategy: 'prefix', // Add the language code to the URL
  },

  compatibilityDate: '2025-01-14',
});