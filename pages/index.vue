<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">{{ $t('welcome') }}</h1>

        <!-- Search Bar -->
        <div class="mb-6">
            <input v-model="searchQuery" :placeholder="$t('searchPlaceholder')" class="w-full p-2 border rounded-md" />
        </div>

        <!-- Paginated and Filtered Posts -->
        <div v-if="loading" class="mt-4 flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
        <div v-else-if="error" class="text-red-500">
            {{ error }}
        </div>
        <div v-else>
            <ul class="space-y-4">
                <li v-for="post in paginatedPosts" :key="post.id" class="p-4 border rounded-md shadow">
                    <!-- Localized Post Title -->
                    <h2 class="text-2xl font-semibold">{{ post.title[$i18n.locale] }}</h2>
                    <!-- Excerpt (First 100 Characters) -->
                    <p class="text-gray-700">{{ post.content[$i18n.locale].slice(0, 100) }}...
                        <!-- Read More Button -->
                        <nuxt-link :to="`/posts/${post.id}`" class="text-blue-600 hover:underline mt-2 inline-block">
                            {{ $t('readMore') }}
                        </nuxt-link>
                    </p>
                </li>
            </ul>

            <!-- Pagination Controls -->
            <div class="flex justify-center items-center mt-6 space-x-2">
                <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50">
                    {{ $t('previous') }}
                </button>
                <span>
                    {{ $t('page') }} {{ currentPage }} {{ $t('of') }} {{ totalPages }}
                </span>
                <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50">
                    {{ $t('next') }}
                </button>
            </div>
        </div>
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
const postsPerPage = 5;

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