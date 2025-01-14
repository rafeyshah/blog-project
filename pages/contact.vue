<template>
    <div class="container mx-auto p-6">
        <h1 class="text-3xl font-bold mb-6">Contact Us</h1>

        <form @submit.prevent="submitForm" class="space-y-4">
            <!-- Name Field -->
            <div>
                <label for="name" class="block text-sm font-medium">Name</label>
                <input type="text" id="name" v-model="form.name" @input="validateField('name')"
                    class="w-full p-2 border rounded-md" />
                <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
            </div>

            <!-- Email Field -->
            <div>
                <label for="email" class="block text-sm font-medium">Email</label>
                <input type="email" id="email" v-model="form.email" @input="validateField('email')"
                    class="w-full p-2 border rounded-md" />
                <p v-if="errors.email" class="text-red-500 text-sm">{{ errors.email }}</p>
            </div>

            <!-- Phone Number Field -->
            <div>
                <label for="phone" class="block text-sm font-medium">Phone Number</label>
                <input type="text" id="phone" v-model="form.phone" @input="validateField('phone')"
                    class="w-full p-2 border rounded-md" />
                <p v-if="errors.phone" class="text-red-500 text-sm">{{ errors.phone }}</p>
            </div>

            <!-- Message Field -->
            <div>
                <label for="message" class="block text-sm font-medium">Message</label>
                <textarea id="message" v-model="form.message" @input="validateField('message')"
                    class="w-full p-2 border rounded-md" rows="4"></textarea>
                <p v-if="errors.message" class="text-red-500 text-sm">{{ errors.message }}</p>
            </div>

            <!-- Submit Button -->
            <button type="submit" class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Submit
            </button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

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