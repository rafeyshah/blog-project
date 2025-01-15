<template>
    <div>
        <section class="py-24">
            <!-- Loading State -->
            <div v-if="loading" class="mt-4 flex justify-center">
                <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
            </div>

            <!-- Error State -->
            <div v-else-if="error" class="text-red-500 text-center">
                {{ error }}
            </div>

            <!-- Main Content -->
            <div v-else class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div class="flex flex-wrap justify-between items-center mb-6 gap-4">
                    <!-- Left Side: Welcome Message -->
                    <h2
                        class="font-manrope text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 w-full md:w-auto text-left">
                        {{ $t('welcome') }}
                    </h2>

                    <!-- Right Side: Search Bar -->
                    <div class="w-full lg:w-1/3 md:ml-auto">
                        <label for="default-search" class="sr-only">Search</label>
                        <div class="relative">
                            <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <svg class="w-4 h-4 text-gray-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                                    viewBox="0 0 20 20" aria-hidden="true">
                                    <path d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" stroke="currentColor"
                                        stroke-linecap="round" stroke-linejoin="round" stroke-width="2" />
                                </svg>
                            </div>
                            <input v-model="searchQuery" :placeholder="$t('searchPlaceholder')" type="search"
                                id="default-search"
                                class="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-indigo-500 focus:border-indigo-500 focus:outline-none" />
                        </div>
                    </div>
                </div>

                <!-- Posts -->
                <div
                    class="flex justify-center gap-y-8 lg:gap-y-0 flex-wrap lg:flex-nowrap lg:justify-between lg:gap-x-8">
                    <div v-for="post in paginatedPosts" :key="post.id"
                        class="group w-full max-lg:max-w-xl lg:w-1/3 border border-gray-300 rounded-2xl">
                        <img :src="post.img" :alt="post.title[locale]" class="rounded-t-2xl w-full object-cover" />
                        <div class="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
                            <span class="text-indigo-600 font-medium mb-3 block">Jan 01, 2023</span>
                            <h4 class="text-xl text-gray-900 font-medium leading-8 mb-5">
                                {{ post.title[locale]?.slice(0, 30) || '' }}
                            </h4>
                            <p class="text-gray-500 leading-6 mb-10">
                                {{ post.content[locale]?.slice(0, 50) || '' }}...
                            </p>
                            <nuxt-link :to="`/posts/${post.id}`"
                                class="cursor-pointer text-lg text-indigo-600 font-semibold">
                                {{ $t('readMore') }}
                            </nuxt-link>
                        </div>
                    </div>
                </div>

                <!-- Pagination -->
                <div class="flex items-center justify-center py-10">
                    <div class="w-full lg:w-3/5 flex items-center justify-between border-t border-gray-200">
                        <!-- Previous Button -->
                        <div class="flex items-center pt-3 cursor-pointer text-gray-600 hover:text-indigo-700"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === 1 }"
                            @click="goToPage(currentPage - 1)">
                            <svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg"
                                fill="none">
                                <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.1665 4L4.49984 7.33333" stroke="currentColor" stroke-width="1.25"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M1.1665 4.00002L4.49984 0.666687" stroke="currentColor" stroke-width="1.25"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                            <p class="text-sm ml-3 font-medium leading-none">{{ $t('previous') }}</p>
                        </div>

                        <!-- Page Numbers -->
                        <div class="hidden sm:flex">
                            <span v-for="page in totalPages" :key="page" @click="goToPage(page)"
                                class="text-sm font-medium leading-none cursor-pointer text-gray-600 hover:text-indigo-700 border-t border-transparent hover:border-indigo-400 pt-3 mr-4 px-2"
                                :class="{ 'text-indigo-700 border-indigo-400': currentPage === page }">
                                {{ page }}
                            </span>
                        </div>

                        <!-- Next Button -->
                        <div class="flex items-center pt-3 text-gray-600 cursor-pointer hover:text-indigo-700"
                            :class="{ 'opacity-50 cursor-not-allowed': currentPage === totalPages }"
                            @click="goToPage(currentPage + 1)">
                            <p class="text-sm font-medium leading-none mr-3">{{ $t('next') }}</p>
                            <svg width="14" height="8" viewBox="0 0 14 8" xmlns="http://www.w3.org/2000/svg"
                                fill="none">
                                <path d="M1.1665 4H12.8332" stroke="currentColor" stroke-width="1.25"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.5 7.33333L12.8333 4" stroke="currentColor" stroke-width="1.25"
                                    stroke-linecap="round" stroke-linejoin="round" />
                                <path d="M9.5 0.666687L12.8333 4.00002" stroke="currentColor" stroke-width="1.25"
                                    stroke-linecap="round" stroke-linejoin="round" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePosts } from '~/composables/usePosts';

const { locale } = useI18n();
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
        error.value = err.message || 'An error occurred while fetching posts.';
    } finally {
        loading.value = false;
    }
});

const filteredPosts = computed(() => {
    if (!searchQuery.value) return posts.value;
    return posts.value.filter((post) =>
        post.title[locale.value].toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

const totalPages = computed(() => Math.ceil(filteredPosts.value.length / postsPerPage));

const paginatedPosts = computed(() => {
    const start = (currentPage.value - 1) * postsPerPage;
    return filteredPosts.value.slice(start, start + postsPerPage);
});

const goToPage = (page) => {
    if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
    }
};
</script>