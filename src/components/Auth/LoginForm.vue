<template>
  <!-- Formulario de login -->
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <label for="documento" class="block text-sm font-medium text-white">Documento</label>
      <input
        id="documento"
        v-model="form.documentNumber"
        type="text"
        required
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        placeholder="x.xxx.xxx.xxx"
      />
    </div>
    <div>
      <label for="password" class="block text-sm font-medium text-white">Contraseña</label>
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        minlength="6"
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        placeholder="••••••••"
      />
    </div>

    <!-- Mensaje de error -->
    <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>

    <!-- Mensaje de éxito -->
    <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>

    <button type="submit" class="w-full btn bg-[#7ED957] text-[#0b1220] hover:brightness-90">
      Ingresar
    </button>
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

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   headers: { 'Content-Type': 'application/json' },
// })

// ✅ Axios instancia con la URL desde .env
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_DEPLOY,
  headers: { 'Content-Type': 'application/json' },
})

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

    success.value = 'Ingreso exitoso ✅'

    // 5. Redirigir según rol
    const userRole = res.data.role
    if (userRole === 'Aprendiz') router.push({ name: 'dashboard-aprendiz' })
    else if (userRole === 'Instructor') router.push({ name: 'dashboard-instructor' })
    else if (userRole === 'Administrativo') router.push({ name: 'dashboard-admin' })
    else error.value = 'Rol de usuario no reconocido'
  } catch (err: any) {
    console.error('Error completo del backend:', err)
    error.value = err.response?.data?.error || 'Error en el login'
  }
}
</script>

