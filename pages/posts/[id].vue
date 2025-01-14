<template>
    <div>
        <nuxt-link to="/" class="text-blue-600 hover:underline">&larr; {{ $t('backToHome') }}</nuxt-link>
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
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const route = useRoute();
const router = useRouter();
const { locale } = useI18n(); // Access the current locale
const post = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchPost = async () => {
    loading.value = true;
    try {
        const response = await fetch('/posts.json');
        if (!response.ok) throw new Error('Failed to fetch posts');
        const posts = await response.json();
        post.value = posts.find(p => p.id === parseInt(route.params.id));
        if (post.value) {
            post.value = {
                title: post.value.title[locale.value],
                content: post.value.content[locale.value]
            };
        } else {
            throw new Error('Post not found');
        }
    } catch (err) {
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

// Fetch post data on route change or locale change
onMounted(fetchPost);
watch([() => route.params.id, locale], fetchPost);
</script>