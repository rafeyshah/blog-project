<template>
    <div class="flex items-center">
        <div v-for="(locale, index) in locales" :key="locale.code" class="flex items-center">
            <button @click="$emit('switch', locale.code)" class="px-2 py-2 border-b-2" :class="[
                locale.code === currentLocale
                    ? 'border-indigo-600 text-indigo-600 font-bold'
                    : 'border-transparent text-gray-600 hover:border-gray-400'
            ]">
                {{ locale.code.toUpperCase() }}
            </button>
            <span v-if="index < locales.length - 1" class="px-1 text-gray-400">|</span>
        </div>
    </div>
</template>

<script setup>
defineProps({
    locales: { type: Array, required: true },
    currentLocale: { type: String, required: true },
});
</script>