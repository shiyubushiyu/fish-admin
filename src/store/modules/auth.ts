import { defineStore } from 'pinia'

interface AuthState {}

/* 授权 */
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({}),
  getters: {},
  actions: {}
})
