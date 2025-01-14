<template>
    <div>
      <h1 class="text-3xl font-bold mb-6">Welcome to My Blog</h1>
      <div v-if="loading" class="text-gray-500">Loading posts...</div>
      <div v-else>
        <ul class="space-y-4">
          <li v-for="post in posts" :key="post.id" class="p-4 border rounded-md shadow">
            <h2 class="text-2xl font-semibold">{{ post.title }}</h2>
            <p class="text-gray-700">{{ post.excerpt }}</p>
            <nuxt-link
              :to="`/posts/${post.id}`"
              class="text-blue-600 hover:underline mt-2 inline-block"
            >
              Read More
            </nuxt-link>
          </li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  
  const posts = ref([]);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const response = await fetch('/posts.json');
      console.log(response)
      posts.value = await response.json();
    } catch (error) {
      console.error('Failed to load posts:', error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  