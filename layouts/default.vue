<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->
        <nav class="bg-white py-2 md:py-4 fixed top-0 left-0 w-full z-50">
            <div class="container px-4 mx-auto md:flex md:items-center">
                <div class="flex justify-between items-center">
                    <nuxt-link :to="localePath('/')" class="font-bold text-xl text-indigo-600">
                        e-Mission
                    </nuxt-link>
                    <button class="px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
                        @click="toggleMenu">
                        <font-awesome-icon icon="bars"
                            class="text-indigo-600 text-xl border border-indigo-600 p-2 rounded" />
                    </button>
                </div>

                <!-- Standard Menu for Medium+ Screens -->
                <div v-if="currentTranslations.menu"
                    class="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0">
                    <nuxt-link v-for="menuItem in menuItems" :key="menuItem.path" :to="localePath(menuItem.path)"
                        :class="[
                            'p-2 lg:px-4 md:mx-2 rounded transition-colors duration-300',
                            menuItem.active ? 'text-white bg-indigo-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700'
                        ]">
                        {{ menuItem.label }}
                    </nuxt-link>
                    <language-switcher :locales="$i18n.locales" :current-locale="$i18n.locale"
                        @switch="switchLanguage" />
                </div>
            </div>
        </nav>

        <!-- Overlay and Side Navigation -->
        <side-nav :open="isMenuOpen" :menu-items="menuItems" :locales="$i18n.locales" :current-locale="$i18n.locale"
            @switch-language="switchLanguage" @close="toggleMenu" />

        <!-- Main Content -->
        <main class="flex-1 mt-10 container mx-auto p-6">
            <slot />
        </main>

        <!-- Footer -->
        <FooterComponent />
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import SideNav from '~/components/SideNav.vue';
import FooterComponent from '~/components/FooterComponent.vue';
import LanguageSwitcher from '~/components/LanguageSwitcher.vue';

const router = useRouter();
const { locale, t } = useI18n(); // Access translation function and locale
const isMenuOpen = ref(false);
const translations = ref({});
const loading = ref(true);
const error = ref(null);

// Fetch translations (mocked example using composable `useMenus`)
const fetchTranslations = async () => {
    try {
        // Use composable to fetch translations
        const response = await useMenus();
        translations.value = response;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Current translations based on locale
const currentTranslations = computed(() => translations.value[locale.value] || {});

// Dynamic menu items that update when locale changes
const menuItems = computed(() => {
    const menu = currentTranslations.value.menu || {};
    return [
        { path: '/', label: menu.home || t('home'), active: isActiveBasePath('/') || isActiveBasePath('') },
        { path: '/contact', label: menu.contact || t('contact'), active: isActiveBasePath('/contact') },
    ];
});

// Helper: Locale-prefixed path
const localePath = (path) => `/${locale.value}${path}`;

// Toggle menu state
const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

// Check active base path
const isActiveBasePath = (basePath) => {
    const currentPath = router.currentRoute.value.path.replace(/^\/[a-z]{2}/, ''); // Strip locale prefix
    return currentPath === basePath;
};

// Switch language
const switchLanguage = (newLocale) => {
    const currentRoute = router.currentRoute.value;
    locale.value = newLocale; // Update locale
    router.push({
        path: `/${newLocale}${currentRoute.fullPath.replace(/^\/[^/]+/, '')}`,
    });
};

// Fetch translations on mount
onMounted(fetchTranslations);
</script>