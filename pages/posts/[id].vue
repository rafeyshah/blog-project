<template>
    <div class="max-w-screen-xl mx-auto p-5 sm:p-10 md:p-16 relative">
        <!-- Back to Home Button -->
        <!-- <nuxt-link to="/"
            class="text-white bg-indigo-500 hover:bg-indigo-600 tracking-wide text-sm px-4 py-2.5 w-full outline-none">&larr;
            {{ $t('backToHome')
            }}</nuxt-link> -->

        <div v-if="loading" class="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-600"></div>
        <div v-else-if="error" class="text-red-500 mt-4">
            {{ error }}
        </div>

        <div v-else>
            <!-- Header Image -->
            <div class="bg-cover bg-center text-center overflow-hidden"
                :style="{ 'min-height': '500px', 'background-image': `url(${post.img})` }" title="Header Image">
            </div>

            <!-- Article Content -->
            <div class="max-w-3xl mx-auto">
                <div
                    class="mt-3 bg-white rounded-b lg:rounded-b-none lg:rounded-r flex flex-col justify-between leading-normal">
                    <div class="bg-white relative top-0 -mt-32 p-5 sm:p-10">
                        <!-- Title -->
                        <h1 class="text-gray-900 font-bold text-3xl mb-2">{{ post.title }}</h1>

                        <!-- Content -->
                        <p class="text-base leading-8 my-5">
                            {{ post.content }}
                        </p>

                        <!-- Highlighted Section -->
                        <blockquote class="border-l-4 text-base italic leading-8 my-5 p-5 text-indigo-600">
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

const route = useRoute();
const { locale } = useI18n(); // Access the current locale
const post = ref(null);
const loading = ref(true);
const error = ref(null);

const fetchPost = async () => {
    loading.value = true;
    try {
        const posts = await usePosts();
        post.value = posts.find(p => p.id === parseInt(route.params.id));
        if (post.value) {
            post.value = {
                img: post.value.img,
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