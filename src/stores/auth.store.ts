import { defineStore } from 'pinia'
import { login } from '../api/auth.api'
import type { Permission, UserProfile } from '../types/mes'

interface AuthState {
  accessToken: string | null
  user: UserProfile | null
  loading: boolean
  error: string
}

const storedUser = localStorage.getItem('userProfile')

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    accessToken: localStorage.getItem('accessToken'),
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
        localStorage.setItem('accessToken', response.accessToken)
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
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userProfile')
    },
  },
})
