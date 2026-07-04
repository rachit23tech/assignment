import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import ChargerListView from '../views/ChargerListView.vue'
import MapView from '../views/MapView.vue'
import RegisterView from '../views/RegisterView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: LoginView,
    },
    {
      path: '/',
      name: 'home',
      component: ChargerListView,
    },
    {
      path: '/map',
      name: 'map',
      component: MapView,
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterView,
    }

  ],
})

export default router
