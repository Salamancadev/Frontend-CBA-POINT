// Importa las funciones necesarias de vue-router para crear el router
import { createRouter, createWebHistory } from 'vue-router'
// Importa de forma dinámica la vista principal (Home)
const Home = () => import('../views/HomeView.vue')
// Importa de forma dinámica la vista de login
const Login = () => import('../views/LoginView.vue')
// Importa de forma dinámica la vista de registro
const Register = () => import('../views/RegisterView.vue')
// Crea el router con historial HTML5 y define las rutas de la aplicación
const router = createRouter({
  history: createWebHistory(), // Usa historial web para navegación sin hash
  routes: [
    { path: '/', name: 'home', component: Home }, // Ruta para la página principal
    { path: '/login', name: 'login', component: Login }, // Ruta para login
    { path: '/register', name: 'register', component: Register } // Ruta para registro
  ],
  // Hace que al navegar siempre se desplace al inicio de la página
  scrollBehavior() {
    return { top: 0 }
  }
})
// Exporta el router para usarlo en la aplicación principal
export default router
