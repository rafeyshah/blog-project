<template>
    <div>
        <h1 class="text-3xl font-bold mb-6">Welcome to My Blog</h1>
        <div v-if="loading" class="mt-4 flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
        <div v-else-if="error" class="text-red-500">
            {{ error }}
        </div>
        <div v-else>
            <ul class="space-y-4">
                <li v-for="post in posts" :key="post.id" class="p-4 border rounded-md shadow">
                    <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
                    <p class="text-gray-700">{{ post.excerpt }}</p>
                    <nuxt-link :to="`/posts/${post.id}`" class="text-blue-600 hover:underline mt-2 inline-block">
                        Read More
                    </nuxt-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePosts } from '~/composables/usePosts';

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

onMounted(async () => {
    try {
        posts.value = await usePosts();
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

</script>