import { ref } from 'vue';

const postsCache = ref(null);

export const usePosts = async () => {
    if (!postsCache.value) {
        const response = await fetch('/posts.json');
        if (!response.ok) throw new Error('Failed to fetch posts');
        postsCache.value = await response.json();
    }
    return postsCache.value;
};
