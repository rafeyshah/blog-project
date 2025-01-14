<template>
    <div>
        <nuxt-link to="/" class="text-blue-600 hover:underline">&larr; Back to Home</nuxt-link>
        <div v-if="loading" class="mt-4 flex justify-center">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>
        <div v-else-if="error" class="text-red-500 mt-4">
            {{ error }}
        </div>
        <div v-else>
            <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
            <p class="text-gray-700">{{ post.content }}</p>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { usePosts } from '~/composables/usePosts';

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref(null);


onMounted(async () => {
    try {
        const posts = await usePosts();
        post.value = posts.find(p => p.id === parseInt(route.params.id));
        if (!post.value) throw new Error('Post not found');
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
});

</script>