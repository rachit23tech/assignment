<template>
  <nav>
    <div> Electric Vehicle Charging Pointer </div>
    <div>
      <router-link to="/">Chargers</router-link>
      <router-link to="/map">Map</router-link>
      <button v-if="isLoggedIn" @click="handleLogout">Logout</button>
      <router-link v-else to="/login">Login</router-link>
      
    </div>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isLoggedIn = computed(() => {
    const token = localStorage.getItem('token')
    return !!token
    })

const handleLogout = () => {
    const token = localStorage.getItem('token')
    if (token) {
      localStorage.removeItem('token')
      router.push('/login')
    }
}
</script>
<style scoped>
nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
  align-items: center;
  padding: 16px 24px;
}

nav > div:last-child {
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 18px;
  font-weight: normal;
  color: #fff;
}
nav a {
  color: white;
  text-decoration: none;
}
</style>