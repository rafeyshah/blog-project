<template>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
        <!-- Back to Home Button -->
        <!-- <nuxt-link to="/"
            class="text-white bg-indigo-500 hover:bg-indigo-600 tracking-wide text-sm px-4 py-2.5 rounded outline-none">
            &larr; {{ $t('backToHome') }}
        </nuxt-link> -->

        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center mt-4">
            <div class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-red-500 mt-4 text-center">
            {{ error }}
        </div>

        <!-- Post Content -->
        <div v-else>
            <!-- Header Image -->
            <div class="bg-cover bg-center text-center overflow-hidden"
                :style="{ 'min-height': '500px', 'background-image': `url(${post.img})` }" title="Header Image"></div>

            <!-- Article Content -->
            <div class="max-w-3xl mx-auto">
                <div class="mt-3 bg-white rounded-lg shadow-md flex flex-col justify-between leading-normal">
                    <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
                        <!-- Title -->
                        <h1 class="text-gray-900 font-bold text-3xl mb-4 text-center">
                            {{ post.title }}
                        </h1>

                        <!-- Content -->
                        <p class="text-base leading-8 mb-5">
                            {{ post.content }}
                        </p>

                        <!-- Highlighted Section -->
                        <blockquote class="border-l-4 pl-4 italic text-indigo-600 text-base leading-8 mb-5">
                            {{ post.content }}
                        </blockquote>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { usePosts } from '~/composables/usePosts'; // Assuming a composable for fetching posts

// Reactive state variables
const route = useRoute();
const { locale } = useI18n();
const post = ref(null);
const loading = ref(true);
const error = ref(null);

// Fetch post data
const fetchPost = async () => {
    loading.value = true;
    error.value = null; // Clear previous errors
    try {
        const posts = await usePosts(); // Fetch posts
        const currentPost = posts.find((p) => p.id === parseInt(route.params.id));

        if (currentPost) {
            // Map post content based on the current locale
            post.value = {
                img: currentPost.img,
                title: currentPost.title[locale.value],
                content: currentPost.content[locale.value],
            };
        } else {
            throw new Error('Post not found');
        }
    } catch (err) {
        error.value = err.message || 'An error occurred while fetching the post.';
    } finally {
        loading.value = false;
    }
};

// Fetch post data when route or locale changes
onMounted(fetchPost);
watch([() => route.params.id, locale], fetchPost);
</script>