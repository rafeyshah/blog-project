<template>
  <nuxt-link :to="to" :class="[
    'p-2 lg:px-4 md:mx-2 rounded transition-colors duration-300',
    active ? 'text-white bg-indigo-600' : 'text-gray-600 hover:bg-gray-200 hover:text-gray-700'
  ]">
    {{ text }}
  </nuxt-link>
</template>

<script setup>
defineProps({
  to: { type: String, required: true },
  text: { type: String, required: true },
  active: { type: Boolean, default: false },
});
</script>