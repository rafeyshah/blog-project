import { defineNuxtPlugin } from '#app';
import { useRouter } from 'vue-router';
import VueGtag from 'vue-gtag-next';

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();

    nuxtApp.vueApp.use(VueGtag, {
        property: {
            id: 'G-XXXXXXXXXX' // Replace with your Measurement ID
        }
    });

    router.afterEach((to) => {
        // Track page views
        nuxtApp.vueApp.$gtag.pageview(to.fullPath);
    });
});
