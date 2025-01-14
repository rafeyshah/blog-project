<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">Welcome to My Blog</h1>

        <!-- Search Bar -->
        <div class="mb-6">
            <input v-model="searchQuery" type="text" placeholder="Search posts..."
                class="w-full p-2 border rounded-md" />
        </div>

        <!-- Loading Indicator -->
        <div v-if="loading" class="mt-4 flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>

        <!-- Error Message -->
        <div v-else-if="error" class="text-red-500">
            {{ error }}
        </div>

        <!-- Paginated Posts -->
        <div v-else>
            <ul class="space-y-4">
                <li v-for="post in paginatedPosts" :key="post.id" class="p-4 border rounded-md shadow">
                    <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
                    <p class="text-gray-700">{{ post.excerpt }}</p>
                    <nuxt-link :to="`/posts/${post.id}`" class="text-blue-600 hover:underline mt-2 inline-block">
                        Read More
                    </nuxt-link>
                </li>
            </ul>

            <!-- Pagination Controls -->
            <div class="flex justify-center items-center mt-6 space-x-2">
                <button @click="currentPage--" :disabled="currentPage === 1"
                    class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50">
                    Previous
                </button>
                <span>Page {{ currentPage }} of {{ totalPages }}</span>
                <button @click="currentPage++" :disabled="currentPage === totalPages"
                    class="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 disabled:opacity-50">
                    Next
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { usePosts } from '~/composables/usePosts';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);
const searchQuery = ref('');
const currentPage = ref(1);
const postsPerPage = 5; // Number of posts per page

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
        post.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.value.toLowerCase())
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