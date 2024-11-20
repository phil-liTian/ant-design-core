import { createRouter, createWebHistory } from 'vue-router'
import WrapView from '../views/wrap/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: WrapView,
    },
  ],
})

export default router
