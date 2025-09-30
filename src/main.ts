import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import { useUserStore } from './store/userStore'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)

// Inicializar userStore desde localStorage de forma segura
const userStore = useUserStore(pinia)
const storedUser = localStorage.getItem('cba_user')

if (storedUser && storedUser !== 'undefined') {
  try {
    const parsedUser = JSON.parse(storedUser)
    userStore.setUser(parsedUser.role) // setUser espera un rol
  } catch (err) {
    console.error('Error al parsear user en localStorage', err)
    localStorage.removeItem('cba_user')
  }
}

app.mount('#app')
