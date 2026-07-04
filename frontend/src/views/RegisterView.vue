<template>
<div>
<h1> LoginPage </h1>
<form @submit.prevent="handleRegister">
<input v-model="email" type="email" placeholder="Email" />
<input v-model="password" type="password" placeholder="Password" />
<button type="submit">Register</button>
</form>
<p v-if="errorMessage">{{ errorMessage }}</p>
</div>
</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import api from '../api/axios.js'    

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleRegister = async () => {
try {
await api.post('/auth/register', {
email: email.value,
password: password.value
})
successMessage.value = 'Registration successful! Please log in.'
setTimeout(() => {
router.push('/login')
}, 3000)
} catch (error) {
errorMessage.value = 'Registration failed. Please try again.'
}
}
</script>   