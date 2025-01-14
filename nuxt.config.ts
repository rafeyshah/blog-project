// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/i18n', '@nuxtjs/google-analytics'],
  css: ['~/styles/tailwind.css'],
  plugins: ['~/plugins/vue-gtag.client.ts'],

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

  googleAnalytics: {
    id: 'G-SV1D309D78' // Replace with your Measurement ID
  },

  // Other configurations...
  nitro: {
    preset: 'vercel',
  },

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