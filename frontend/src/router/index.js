import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import ChargerListView from '../views/ChargerListView.vue'
import MapView from '../views/MapView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', 
      redirect: '/login' 
    },
    { path: '/login', 
      name: 'login', 
      component: LoginView 
    },
    { path: '/register', 
      name: 'register', 
      component: RegisterView 
    },
    { path: '/chargers', 
      name: 'chargers', 
      component: ChargerListView 
    },
    { path: '/map', 
      name: 'map', 
      component: MapView 
    },
  ],
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  const protectedPaths = ['/chargers', '/map']

  if (protectedPaths.includes(to.path) && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router