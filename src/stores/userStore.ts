import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    isLoggedIn: false, // Determina si el usuario está logueado
    role: '',           // Guardar el rol del usuario
  }),

  actions: {
    setUser(role: string) {
      this.role = role
      this.isLoggedIn = true
    },
    logout() {
      this.role = ''
      this.isLoggedIn = false
    },
  }
})