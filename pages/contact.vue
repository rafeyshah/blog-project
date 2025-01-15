<template>
    <div class="container mt-10 mx-auto p-6">
        <div class="p-4 mx-auto max-w-xl bg-white font-[sans-serif]">
            <h1 class="text-2xl text-gray-800 font-bold text-center">{{ $t('contact') }}</h1>
            <form @submit.prevent="submitForm" class="mt-8 space-y-4">
                <!-- Name Field -->
                <input type="text" :placeholder="$t('name')" v-model="form.name" @input="validateField('name')"
                    class="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm outline-none transition-all" />
                <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>

                <!-- Email Field -->
                <input type="email" :placeholder="$t('email')" v-model="form.email" @input="validateField('email')"
                    class="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm outline-none transition-all" />
                <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>

                <!-- Subject Field -->
                <input type="text" :placeholder="$t('phone')" v-model="form.phone" @input="validateField('phone')"
                    class="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm outline-none transition-all" />
                <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>

                <!-- Message Field -->
                <textarea :placeholder="$t('message')" rows="4" v-model="form.message" @input="validateField('message')"
                    class="w-full px-4 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm pt-3 outline-none transition-all"></textarea>
                <p v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</p>

                <!-- Submit Button -->
                <button type="submit"
                    class="text-white bg-indigo-500 hover:bg-indigo-600 tracking-wide text-sm px-4 py-2.5 w-full outline-none">
                    Send
                </button>
            </form>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const form = ref({
    name: '',
    email: '',
    phone: '',
    message: ''
});

const errors = ref({
    name: null,
    email: null,
    phone: null,
    message: null
});

const validateField = (field) => {
    if (field === 'name') {
        errors.value.name = form.value.name.trim() ? null : 'Name is required.';
    } else if (field === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        errors.value.email = emailRegex.test(form.value.email)
            ? null
            : 'Please enter a valid email address.';
    } else if (field === 'phone') {
        const phoneRegex = /^\+?[1-9]\d{1,14}$/; // International E.164 format
        errors.value.phone = phoneRegex.test(form.value.phone)
            ? null
            : 'Please enter a valid phone number (e.g., +1234567890).';
    } else if (field === 'message') {
        errors.value.message = form.value.message.trim() ? null : 'Message is required.';
    }
};

const validateForm = () => {
    validateField('name');
    validateField('email');
    validateField('phone');
    validateField('message');
    return !errors.value.name && !errors.value.email && !errors.value.phone && !errors.value.message;
};

const submitForm = () => {
    if (validateForm()) {
        alert('Form submitted successfully!');
        // Reset form fields
        form.value = { name: '', email: '', phone: '', message: '' };
    } else {
        alert('Please correct the errors in the form.');
    }
};
</script>

<style>
/* Add any custom styles here */
</style>