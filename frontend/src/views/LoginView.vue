<template>
<div>
<h1> LoginPage </h1>
<form @submit.prevent="handleLogin">
<input v-model="email" type="email" placeholder="Email" />
<input v-model="password" type="password" placeholder="Password" />
<button type="submit">Login</button>
</form>
<p v-if="errorMessage">{{ errorMessage }}</p>
</div>
<p>Don't have an account? <router-link to="/register">Register here</router-link></p>
</template>
<script setup>
import {ref} from 'vue'
import {useRouter} from 'vue-router'
import api from '../api/axios.js'

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const router = useRouter()

const handleLogin = async () => {
try {
const response = await api.post('/auth/login', {
email: email.value,
password: password.value
})
localStorage.setItem('token', response.data.token)
router.push('/')
} catch (error) {
errorMessage.value = 'Login failed. Please check your credentials.'
}
}
</script>