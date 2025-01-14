import { defineNuxtPlugin } from '#app';
import { useRouter } from 'vue-router';
import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
  const router = useRouter();

  nuxtApp.vueApp.use(VueGtag, {
    property: {
      id: 'G-SV1D309D78' // Replace with your Google Analytics Measurement ID
    }
  });

  router.afterEach((to) => {
    nuxtApp.vueApp.$gtag.pageview(to.fullPath);
  });
});
