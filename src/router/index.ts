import { createRouter, createWebHistory } from 'vue-router'

// Vistas por rol
const Home = () => import('../views/HomeView.vue')
const Login = () => import('../views/LoginView.vue')
const Register = () => import('../views/RegisterView.vue')
const DashboardAprendiz = () => import('../views/Aprendiz/DashboardAprendiz.vue')
const DashboardInstructor = () => import('../views/Instructor/DashboardInstructor.vue')
const DashboardAdmin = () => import('../views/Admin/DashboardAdmin.vue')

// Asegúrate de tener la store configurada correctamente para obtener el rol del usuario
import { useUserStore } from '../stores/userStore'

const routes = [
  { path: '/', name: 'home', component: Home },
  { path: '/login', name: 'login', component: Login },
  { path: '/register', name: 'register', component: Register },
  
  // Dashboard específico según el rol
  { path: '/dashboard-aprendiz', name: 'dashboard-aprendiz', component: DashboardAprendiz, meta: { requiresAuth: true, role: 'Aprendiz' } },
  { path: '/dashboard-instructor', name: 'dashboard-instructor', component: DashboardInstructor, meta: { requiresAuth: true, role: 'Instructor' } },
  { path: '/dashboard-admin', name: 'dashboard-admin', component: DashboardAdmin, meta: { requiresAuth: true, role: 'Administrador' } },
  
  // Rutas adicionales específicas para cada rol
  // Para Aprendiz
  { path: '/generar-qr', name: 'generar-qr', component: () => import('../views/Aprendiz/GenerarQR.vue'), meta: { requiresAuth: true, role: 'Aprendiz' } },
  { path: '/consultar-eventos', name: 'consultar-eventos', component: () => import('../views/Aprendiz/ConsultarEventos.vue'), meta: { requiresAuth: true, role: 'Aprendiz' } },
  
  // Para Instructor
  { path: '/scan-qr', name: 'scan-qr', component: () => import('../views/Instructor/ScanQR.vue'), meta: { requiresAuth: true, role: 'Instructor' } },
  { path: '/reportes', name: 'reportes', component: () => import('../views/Instructor/Reportes.vue'), meta: { requiresAuth: true, role: 'Instructor' } },

  // Para Administrador
  { path: '/gestion-usuarios', name: 'gestion-usuarios', component: () => import('../views/Admin/GestionUsuarios.vue'), meta: { requiresAuth: true, role: 'Administrador' } },
  { path: '/gestion-eventos', name: 'gestion-eventos', component: () => import('../views/Admin/GestionEventos.vue'), meta: { requiresAuth: true, role: 'Administrador' } },
  { path: '/registro-asistencias', name: 'registro-asistencias', component: () => import('../views/Admin/RegistroAsistencias.vue'), meta: { requiresAuth: true, role: 'Administrador' } },
  { path: '/reportes-generales', name: 'reportes-generales', component: () => import('../views/Admin/ReportesGenerales.vue'), meta: { requiresAuth: true, role: 'Administrador' } }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  },
})

// Guard para proteger las rutas basadas en el rol
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  const isAuthenticated = userStore.isLoggedIn  // Booleano de login
  const userRole = userStore.role  // 'Aprendiz', 'Instructor', 'Administrador'

  // Si la ruta requiere autenticación
  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      return next({ name: 'login' })
    }
    // Si hay un rol definido en la ruta
    if (to.meta.role && to.meta.role !== userRole) {
      return next({ name: 'home' })  // Si el rol no coincide, redirige a Home
    }
  }
  next()  // Permitir la navegación
})

export default router