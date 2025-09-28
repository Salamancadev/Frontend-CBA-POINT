import { defineStore } from 'pinia'
import type { User } from '../types/User'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    role: (state) => state.user?.rol || '',
    fullName: (state) => state.user ? `${state.user.nombre} ${state.user.apellido}` : 'Usuario',
  },
  actions: {
    setUser(userData: User) {
      this.user = userData
    },
    logout() {
      this.user = null
      localStorage.removeItem('cba_user')
      localStorage.removeItem('access_token')
      localStorage.removeItem('refresh_token')
    },
  },
})