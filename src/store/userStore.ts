import { defineStore } from 'pinia'
import type { User } from '../types/User'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    user: null as User | null, // Guardamos todo el usuario
  }),

  getters: {
    isLoggedIn: (state) => !!state.user, // Verdadero si hay usuario
    role: (state) => state.user?.role || '', // Rol del usuario
    fullName: (state) => state.user ? `${state.user.name} ${state.user.lastName}` : 'Usuario',
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