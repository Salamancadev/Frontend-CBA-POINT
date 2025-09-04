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
    <button type="submit" class="w-full btn bg-[#7ED957] text-[#0b1220] hover:brightness-90">
      Ingresar
    </button>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'  // Asegúrate de que 'vue-router' esté correctamente instalado
import axios from 'axios'

interface LoginFormData {
  documentNumber: string
  password: string
}

const form = reactive<LoginFormData>({
  documentNumber: '',
  password: '',
})

const error = ref('')
const router = useRouter()  // Instancia el router correctamente

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: { 'Content-Type': 'application/json' }
})

async function onSubmit() {
  error.value = ''

  try {
    const payload = {
      documento: form.documentNumber,
      password: form.password
    }

    const res = await api.post('/login/', payload)

    // Guardar los tokens en el localStorage
    localStorage.setItem('access_token', res.data.access)
    localStorage.setItem('refresh_token', res.data.refresh)

    console.log('Login exitoso', res.data)
    alert('Login exitoso')

    // Verifica si el router está disponible y si el rol está siendo recibido
    const userRole = res.data.role
    console.log("User role:", userRole)  // Verifica si el rol se está recibiendo

    // Redirigir a la vista correspondiente según el rol
    if (userRole === 'Aprendiz') {
      console.log("Redirigiendo a Dashboard de Aprendiz...")
      router.push({ name: 'dashboard-aprendiz' })
    } else if (userRole === 'Instructor') {
      console.log("Redirigiendo a Dashboard de Instructor...")
      router.push({ name: 'dashboard-instructor' })
    } else if (userRole === 'Administrador') {
      console.log("Redirigiendo a Dashboard de Administrador...")
      router.push({ name: 'dashboard-admin' })
    }

  } catch (err: any) {
    console.error('Error completo del backend:', err)
    error.value = err.response?.data?.error || 'Error en el login'
  }

  const userStore = useUserStore()
userStore.setUser(res.data.role)  // Aquí se setea el rol al iniciar sesión
}
</script>