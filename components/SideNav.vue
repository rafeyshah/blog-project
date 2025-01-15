<template>
  <div>
    <!-- Overlay -->
    <div v-if="open" class="fixed inset-0 z-40 bg-gray-900 bg-opacity-50 backdrop-blur-sm transition-opacity"
      @click="$emit('close')"></div>

    <!-- Side Navigation -->
    <div class="fixed top-0 left-0 z-50 w-64 h-full bg-white shadow-lg transition-transform duration-300 ease-in-out"
      :class="{ 'translate-x-0': open, '-translate-x-full': !open }">
      <!-- Close Button -->
      <button class="absolute top-4 right-4 text-gray-600 hover:text-gray-800" @click="$emit('close')">
        <font-awesome-icon icon="times" />
      </button>

      <!-- Menu Items -->
      <ul class="mt-20">
        <li v-for="menuItem in menuItems" :key="menuItem.path">
          <nuxt-link :to="menuItem.path" :class="[
            'block px-6 py-4 transition-colors duration-300',
            menuItem.active ? 'text-indigo-600' : 'text-gray-600 hover:bg-gray-100'
          ]" @click="$emit('close')">
            {{ menuItem.label }}
          </nuxt-link>
        </li>
      </ul>

      <!-- Language Switcher -->
      <div class="block px-4 py-2 text-gray-600 mt-6">
        <language-switcher :locales="locales" :current-locale="currentLocale"
          @switch="$emit('switch-language', $event)" />
      </div>
    </div>
  </div>
</template>

<script setup>
import LanguageSwitcher from './LanguageSwitcher.vue';

defineProps({
  open: { type: Boolean, required: true },
  menuItems: { type: Array, required: true },
  locales: { type: Array, required: true },
  currentLocale: { type: String, required: true },
});
</script>
