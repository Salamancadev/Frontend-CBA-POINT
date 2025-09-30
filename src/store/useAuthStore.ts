import { defineStore } from 'pinia'

type User = { id?: string; name?: string; email?: string; role?: string } | null

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null as User,
  }),
  actions: {
    // Llamar esto cuando el BACKEND confirme el login:
    loginSuccess(user: User) {
      this.isAuthenticated = true
      this.user = user
      // (Opcional) persistir para que el navbar sobreviva recargas
      localStorage.setItem('auth_isAuthenticated', '1')
      localStorage.setItem('auth_user', JSON.stringify(user || {}))
    },
    // Logout SIMULADO (no llama a backend):
    simulateLogout() {
      this.isAuthenticated = false
      this.user = null
      localStorage.removeItem('auth_isAuthenticated')
      localStorage.removeItem('auth_user')
    },
    // Hidratar desde localStorage (por si recargas)
    hydrate() {
      this.isAuthenticated = localStorage.getItem('auth_isAuthenticated') === '1'
      const raw = localStorage.getItem('auth_user')
      this.user = raw ? JSON.parse(raw) : null
    },
  },
})
