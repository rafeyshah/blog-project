<template>
    <div class="container mt-10 mx-auto p-6">
        <div class="p-4 mx-auto max-w-xl bg-white font-sans">
            <h1 class="text-2xl text-gray-800 font-bold text-center">{{ $t('contact') }}</h1>
            <form @submit.prevent="submitForm" class="mt-8 space-y-4">
                <!-- Name Field -->
                <div>
                    <input type="text" :placeholder="$t('name')" v-model="form.name" @input="validateField('name')"
                        class="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm outline-none transition-all" />
                    <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
                </div>

                <!-- Email Field -->
                <div>
                    <input type="email" :placeholder="$t('email')" v-model="form.email" @input="validateField('email')"
                        class="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm outline-none transition-all" />
                    <p v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
                </div>

                <!-- Phone Field -->
                <div>
                    <input type="text" :placeholder="$t('phone')" v-model="form.phone" @input="validateField('phone')"
                        class="w-full py-2.5 px-4 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm outline-none transition-all" />
                    <p v-if="errors.phone" class="text-red-500 text-sm mt-1">{{ errors.phone }}</p>
                </div>

                <!-- Message Field -->
                <div>
                    <textarea :placeholder="$t('message')" rows="4" v-model="form.message"
                        @input="validateField('message')"
                        class="w-full px-4 py-2.5 text-gray-800 bg-gray-100 border focus:border-indigo-500 focus:bg-transparent text-sm outline-none transition-all"></textarea>
                    <p v-if="errors.message" class="text-red-500 text-sm mt-1">{{ errors.message }}</p>
                </div>

                <!-- Submit Button -->
                <div>
                    <button type="submit"
                        class="text-white bg-indigo-500 hover:bg-indigo-600 tracking-wide text-sm px-4 py-2.5 w-full outline-none transition-all">
                        {{ $t('send') }}
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n(); // Access translation function

// Form state
const form = ref({
    name: '',
    email: '',
    phone: '',
    message: '',
});

// Error state
const errors = ref({
    name: null,
    email: null,
    phone: null,
    message: null,
});

// Field validation
const validateField = (field) => {
    const value = form.value[field].trim();

    switch (field) {
        case 'name':
            errors.value.name = value ? null : t('validation.nameRequired');
            break;

        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            errors.value.email = emailRegex.test(value) ? null : t('validation.invalidEmail');
            break;

        case 'phone':
            const phoneRegex = /^\+?[1-9]\d{1,14}$/; // E.164 format
            errors.value.phone = phoneRegex.test(value)
                ? null
                : t('validation.invalidPhone');
            break;

        case 'message':
            errors.value.message = value ? null : t('validation.messageRequired');
            break;

        default:
            break;
    }
};

// Full form validation
const validateForm = () => {
    validateField('name');
    validateField('email');
    validateField('phone');
    validateField('message');
    return Object.values(errors.value).every((error) => error === null);
};

// Form submission
const submitForm = () => {
    if (validateForm()) {
        alert(t('form.success'));
        // Reset form
        form.value = { name: '', email: '', phone: '', message: '' };
    } else {
        alert(t('form.error'));
    }
};
</script>