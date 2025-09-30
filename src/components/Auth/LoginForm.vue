<template>
  <!-- Formulario de login -->
  <form @submit.prevent="onSubmit" class="space-y-6">
    <div>
      <label for="documento" class="block text-sm font-medium text-gray-300 mb-2">Número de documento</label>
      <input
        id="documento"
        v-model="form.documentNumber"
        type="text"
        required
        class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
        placeholder="Ingresa tu número de documento"
      />
    </div>
    
    <div>
      <label for="password" class="block text-sm font-medium text-gray-300 mb-2">Contraseña</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        minlength="6"
        class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
        placeholder="••••••••"
      />
      <p class="text-xs text-gray-400 mt-1">Mínimo 6 caracteres</p>
    </div>

    <!-- Enlace de recuperación -->
    <div class="text-right">
      <a 
        href="/recuperar-contraseña" 
        class="text-sm text-[#24DEFF] hover:text-[#1cb8d9] transition-colors"
      >
        ¿Olvidaste tu contraseña?
      </a>
    </div>

    <!-- Mensaje de error -->
    <div v-if="error" class="p-3 bg-red-900/30 border border-red-700 rounded-lg">
      <p class="text-red-400 text-sm flex items-center gap-2">
        <span>⚠</span>
        {{ error }}
      </p>
    </div>

    <!-- Mensaje de éxito -->
    <div v-if="success" class="p-3 bg-green-900/30 border border-green-700 rounded-lg">
      <p class="text-green-400 text-sm flex items-center gap-2">
        <span>✅</span>
        {{ success }}
      </p>
    </div>

    <button 
      type="submit" 
      class="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg"
    >
      🔐 Ingresar
    </button>

    <!-- Enlace a registro -->
    <div class="text-center pt-4 border-t border-gray-700">
      <p class="text-gray-400 text-sm">
        ¿No tienes cuenta? 
        <RouterLink to="/register" class="text-[#24DEFF] hover:text-[#1cb8d9] font-semibold transition-colors">
          Regístrate aquí
        </RouterLink>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

// Store del usuario (perfil)
import { useUserStore } from '../../store/userStore'
// Store de autenticación (navbar reactivo)
import { useAuthStore } from '@/store/useAuthStore'
// Función para mapear el perfil
import { mapBackendUser } from '../../utils/userMapper'

interface LoginFormData {
  documentNumber: string
  password: string
}

const form = reactive<LoginFormData>({
  documentNumber: '',
  password: '',
})

const error = ref('')
const success = ref('')
const router = useRouter()

// ✅ Instanciar los stores de Pinia
const userStore = useUserStore()
const authStore = useAuthStore()

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' },
})

// ✅ Axios instancia con la URL desde .env
// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL_DEPLOY,
//   headers: { 'Content-Type': 'application/json' },
// })

async function onSubmit() {
  error.value = ''
  success.value = ''

  try {
    // 1. Enviar credenciales al backend
    const res = await api.post('/login/', {
      documento: form.documentNumber,
      password: form.password,
    })

    // 2. Guardar tokens
    localStorage.setItem('access_token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)

    // 3. Traer perfil del usuario autenticado
    const perfilRes = await api.get('/perfil/', {
      headers: { Authorization: `Bearer ${res.data.access}` },
    })

    const userMapped = mapBackendUser(perfilRes.data)
    userStore.setUser(userMapped)
    localStorage.setItem('cba_user', JSON.stringify(userMapped))

    // 4. Notificar al store de auth (Navbar reacciona)
    authStore.loginSuccess(userMapped)

    success.value = '🎉 Ingreso exitoso. Redirigiendo...'

    // 5. Redirigir según rol
    const userRole = res.data.role
    setTimeout(() => {
      if (userRole === 'Aprendiz') router.push({ name: 'dashboard-aprendiz' })
      else if (userRole === 'Instructor') router.push({ name: 'dashboard-instructor' })
      else if (userRole === 'Administrativo') router.push({ name: 'dashboard-admin' })
      else error.value = 'Rol de usuario no reconocido'
    }, 1500)
    
  } catch (err: any) {
    console.error('Error completo del backend:', err)
    error.value = err.response?.data?.error || 'Error en el login. Verifica tus credenciales.'
  }
}
</script>