<template>
    <div class="flex flex-col min-h-screen">
        <!-- Header -->
        <nav class="bg-white py-2 md:py-4 fixed top-0 left-0 w-full z-50">
            <div class="container px-4 mx-auto md:flex md:items-center">
                <div class="flex justify-between items-center">
                    <nuxt-link :to="localePath('/') || localePath('')" class="font-bold text-xl text-indigo-600">
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
                    <nav-link v-for="menuItem in menuItems" :key="menuItem.path" :to="localePath(menuItem.path)"
                        :text="menuItem.label" :active="isActiveBasePath(menuItem.path)" />
                    <language-switcher :locales="$i18n.locales" :current-locale="$i18n.locale"
                        @switch="switchLanguage" />
                </div>
            </div>
        </nav>

        <!-- Overlay and Side Navigation -->
        <div>
            <!-- Overlay -->
            <div v-if="isMenuOpen"
                class="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity md:hidden"
                @click="toggleMenu"></div>

            <!-- Side Navigation for Small Screens -->
            <side-nav :open="isMenuOpen" :menu-items="menuItems" :locales="$i18n.locales" :current-locale="$i18n.locale"
                @switch-language="switchLanguage" @close="toggleMenu" />

        </div>

        <!-- Main Content -->
        <main class="flex-1 mt-10 container mx-auto p-6">
            <slot />
        </main>

        <!-- Footer -->
        <FooterComponent />
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useMenus } from '~/composables/useMenus';
import { ref, computed, onMounted } from 'vue';

import NavLink from '~/components/NavLink.vue';
import LanguageSwitcher from '~/components/LanguageSwitcher.vue';
import SideNav from '~/components/SideNav.vue';
import FooterComponent from '~/components/FooterComponent.vue';

const router = useRouter();
const { locale } = useI18n();
const isMenuOpen = ref(false);
const translations = ref({});
const loading = ref(true);
const error = ref(null);

const localePath = (path) => `/${locale.value}${path}`;

const fetchTranslations = async () => {
    try {
        const response = await useMenus();
        translations.value = response;
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const currentTranslations = computed(() => translations.value[locale.value] || {});

const menuItems = computed(() => [
    { path: '/', label: 'Home', active: isActiveBasePath('/') || isActiveBasePath('') },
    { path: '/contact', label: 'Contact', active: isActiveBasePath('/contact') },
]);


const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
};

const isActiveBasePath = (basePath) => {
    const currentPath = router.currentRoute.value.path.replace(/^\/[a-z]{2}/, '');
    return currentPath === basePath;
};

const switchLanguage = (newLocale) => {
    const currentRoute = router.currentRoute.value;
    locale.value = newLocale;
    router.push({
        path: `/${newLocale}${currentRoute.fullPath.replace(/^\/[^/]+/, '')}`,
    });
};

onMounted(fetchTranslations);
</script>