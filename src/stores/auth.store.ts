import { defineStore } from 'pinia'
import { login } from '../api/auth.api'
import type { Permission, UserProfile } from '../types/mes'
import { deleteCookie, getCookie, setCookie } from '../utils/cookie'

interface AuthState {
  accessToken: string | null
  user: UserProfile | null
  loading: boolean
  error: string
}

const accessTokenCookieName = 'accessToken'
const storedUser = localStorage.getItem('userProfile')

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: getCookie(accessTokenCookieName),
    user: storedUser ? JSON.parse(storedUser) as UserProfile : null,
    loading: false,
    error: '',
  }),
  getters: {
    isAuthenticated: (state) => Boolean(state.accessToken),
    hasPermission: (state) => (permission: Permission) => Boolean(state.user?.permissions.includes(permission)),
  },
  actions: {
    async login(username: string, password: string) {
      this.loading = true
      this.error = ''

      try {
        const response = await login({ username, password })
        this.accessToken = response.accessToken
        this.user = response.user
        setCookie(accessTokenCookieName, response.accessToken, 60 * 60)
        localStorage.setItem('userProfile', JSON.stringify(response.user))
      } catch (error) {
        this.error = error instanceof Error ? error.message : '登入失敗'
        throw error
      } finally {
        this.loading = false
      }
    },
    logout() {
      this.accessToken = null
      this.user = null
      deleteCookie(accessTokenCookieName)
      localStorage.removeItem('userProfile')
    },
  },
})
