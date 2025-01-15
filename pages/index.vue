<template>
    <div>
        <!-- Search Bar -->
        <div class="mb-6">
            <input v-model="searchQuery" :placeholder="$t('searchPlaceholder')" class="w-full p-2 border rounded-md" />
        </div>

        <section class="py-24 ">
            <!-- Paginated and Filtered Posts -->
            <div v-if="loading" class="mt-4 flex justify-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>
            <div v-else-if="error" class="text-red-500">
                {{ error }}
            </div>
            <div v-else class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 class="font-manrope text-4xl font-bold text-gray-900 text-center mb-16">{{ $t('welcome') }}</h2>
                <div
                    class="flex justify-center  gap-y-8 lg:gap-y-0 flex-wrap md:flex-wrap lg:flex-nowrap lg:flex-row lg:justify-between lg:gap-x-8">
                    <div v-for="post in paginatedPosts" :key="post.id"
                        class="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
                        <div class="flex items-center">
                            <img :src="post.img" alt="blogs tailwind section" class="rounded-t-2xl w-full object-cover">
                        </div>
                        <div class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                            <span class="text-indigo-600 font-medium mb-3 block">Jan 01, 2023</span>
                            <h4 class="text-xl text-gray-900 font-medium leading-8 mb-5">{{
                                post.title[$i18n.locale].slice(0, 30) }}</h4>
                            <p class="text-gray-500 leading-6 mb-10">{{ post.content[$i18n.locale].slice(0, 50) }}...
                            </p>
                            <nuxt-link :to="`/posts/${post.id}`"
                                class="cursor-pointer text-lg text-indigo-600 font-semibold">
                                {{ $t('readMore') }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>
                <span class="flex justify-center items-center mt-6 space-x-1">
                    {{ $t('page') }} {{ currentPage }} {{ $t('of') }} {{ totalPages }}
                </span>
                <div class="flex justify-center items-center mt-6 space-x-1">
                    <button @click="currentPage--" :disabled="currentPage === 1"
                        class="px-6 py-2 border-2 border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-500 hover:text-white disabled:opacity-50 disabled:bg-indigo-500 disabled:text-white">
                        {{ $t('previous') }}
                    </button>
                    <button @click="currentPage++" :disabled="currentPage === totalPages"
                        class="px-6 py-2 border-2 border-indigo-500 text-indigo-600 rounded-md hover:bg-indigo-500 hover:text-white disabled:opacity-50 disabled:bg-indigo-500 disabled:text-white">
                        {{ $t('next') }}
                    </button>
                </div>

            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePosts } from '~/composables/usePosts';

const { locale } = useI18n(); // Access current locale
const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 3;

onMounted(async () => {
    try {
        posts.value = await usePosts();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

// Filtered posts based on search query
const filteredPosts = computed(() => {
    if (!searchQuery.value) return posts.value;
    return posts.value.filter(post =>
        post.title[locale.value].toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Total pages
const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));

// Paginated posts for the current page
const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    return filteredPosts.value.slice(start, start + postsPerPage);
});
</script>