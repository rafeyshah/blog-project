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

    // Ensure page views are tracked after router navigation
    router.afterEach((to) => {
        if (nuxtApp.vueApp.$gtag) {
            nuxtApp.vueApp.$gtag.pageview(to.fullPath);
        } else {
            console.warn('Google Analytics is not initialized yet.');
        }
    });
});



