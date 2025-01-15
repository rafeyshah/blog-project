<template>
  <section class="bg-white">
    <div class="max-w-screen-xl px-4 py-12 mx-auto space-y-8 overflow-hidden sm:px-6 lg:px-8">
      <nav class="flex flex-wrap justify-center -mx-5 -my-2">
        <div v-for="link in footerLinks" :key="link.label" class="px-5 py-2">
          <nuxt-link v-if="link.to" :to="link.to" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            {{ link.label }}
          </nuxt-link>
          <a v-else :href="link.href" class="text-base leading-6 text-gray-500 hover:text-gray-900">
            {{ link.label }}
          </a>
        </div>
      </nav>
      <div class="flex justify-center mt-8 space-x-6">
        <a v-for="social in socialLinks" :key="social.label" :href="social.href"
          class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ social.label }}</span>
          <font-awesome-icon :icon="social.icon" class="w-6 h-6" />
        </a>
      </div>
      <p class="mt-8 text-base leading-6 text-center text-gray-400">
        © e Mission, Inc. All rights reserved.
      </p>
    </div>
  </section>
</template>

<script setup>
defineProps({
  footerLinks: {
    type: Array,
    default: () => [
      { label: 'About', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Team', href: '#' },
      { label: 'Pricing', href: '#' },
      { label: 'Contact', href: '#' },
      { label: 'Terms', href: '#' },
    ],
  },
  socialLinks: {
    type: Array,
    default: () => [
      { label: 'Facebook', icon: ['fab', 'facebook'], href: '#' },
      { label: 'Instagram', icon: ['fab', 'instagram'], href: '#' },
      { label: 'Twitter', icon: ['fab', 'twitter'], href: '#' },
      { label: 'GitHub', icon: ['fab', 'github'], href: '#' },
      { label: 'Dribbble', icon: ['fab', 'dribbble'], href: '#' },
    ],
  },
});
</script>