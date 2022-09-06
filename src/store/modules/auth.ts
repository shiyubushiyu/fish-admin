import { defineStore } from 'pinia'
import { fetchMockLogin } from '@/service'

interface AuthState {
  /** 用户信息 */
  userInfo: any
}

/* 授权 */
export const useAuthStore = defineStore('auth-store', {
  state: (): AuthState => ({
    userInfo: {}
  }),
  getters: {},
  actions: {
    // 登录逻辑
    async login(userName: string, password: string) {
      const res = await fetchMockLogin({ userName, password })
      console.log(res)
    }
  }
})
