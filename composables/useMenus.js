import { ref } from 'vue';

const menuCache = ref(null);

export const useMenus = async () => {
    if (!menuCache.value) {
        const response = await fetch('/pages.json');
        if (!response.ok) throw new Error('Failed to fetch posts');
        menuCache.value = await response.json();
    }
    return menuCache.value;
};
