<template>
    <div>
      <nuxt-link to="/" class="text-blue-600 hover:underline">&larr; Back to Home</nuxt-link>
      <div v-if="loading" class="text-gray-500 mt-4">Loading post...</div>
      <div v-else>
        <h1 class="text-3xl font-bold mb-4">{{ post.title }}</h1>
        <p class="text-gray-700">{{ post.content }}</p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute();
  const post = ref(null);
  const loading = ref(true);
  
  onMounted(async () => {
    try {
      const response = await fetch('/posts.json');
      const posts = await response.json();
      post.value = posts.find(p => p.id === parseInt(route.params.id));
      if (!post.value) throw new Error('Post not found');
    } catch (error) {
      console.error('Error loading post:', error);
    } finally {
      loading.value = false;
    }
  });
  </script>
  