import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import { constantRoutes } from './routes'
const { VITE_HASH_ROUTE = 'false', VITE_BASE_URL } = import.meta.env

export const router = createRouter({
  history:
    VITE_HASH_ROUTE === 'true'
      ? createWebHashHistory(VITE_BASE_URL)
      : createWebHistory(VITE_BASE_URL),
  routes: constantRoutes as any
})
