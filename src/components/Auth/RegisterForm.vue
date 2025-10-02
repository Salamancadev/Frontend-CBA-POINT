<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
    <!-- Nombre y Apellido -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="name" class="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label for="lastName" class="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          required
          class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          placeholder="Tu apellido"
        />
      </div>
    </div>

    <!-- Rol -->
    <div>
      <label for="role" class="block text-sm font-medium text-gray-300 mb-2">Rol</label>
      <select
        id="role"
        v-model="form.role"
        required
        class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
      >
        <option value="" disabled class="bg-gray-800">Selecciona tu rol</option>
        <option value="Aprendiz" class="bg-gray-800">Aprendiz</option>
        <option value="Instructor" class="bg-gray-800">Instructor</option>
        <option value="Administrativo" class="bg-gray-800">Administrativo</option>
      </select>
    </div>

    <!-- Tipo y número de documento -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="documentType" class="block text-sm font-medium text-gray-300 mb-2"
          >Tipo de documento</label
        >
        <select
          id="documentType"
          v-model="form.documentType"
          required
          class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
        >
          <option value="" disabled class="bg-gray-800">Selecciona el tipo</option>
          <option value="Cédula de ciudadania" class="bg-gray-800">Cédula de ciudadania</option>
          <option value="Tarjeta de identidad" class="bg-gray-800">Tarjeta de identidad</option>
          <option value="Cédula de extranjeria" class="bg-gray-800">Cédula de extranjeria</option>
        </select>
      </div>
      <div>
        <label for="documentNumber" class="block text-sm font-medium text-gray-300 mb-2"
          >Número de documento</label
        >
        <input
          id="documentNumber"
          v-model="form.documentNumber"
          type="text"
          required
          pattern="[0-9]+"
          class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          placeholder="123456789"
        />
      </div>
    </div>

    <!-- Correo -->
    <div>
      <label for="email" class="block text-sm font-medium text-gray-300 mb-2"
        >Correo electrónico</label
      >
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
        placeholder="tu@email.com"
      />
    </div>

    <!-- Contraseña y Confirmación -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="password" class="block text-sm font-medium text-gray-300 mb-2"
          >Contraseña</label
        >
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
      <div>
        <label for="confirm" class="block text-sm font-medium text-gray-300 mb-2"
          >Confirmar contraseña</label
        >
        <input
          id="confirm"
          v-model="form.confirm"
          type="password"
          required
          minlength="6"
          class="w-full bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          placeholder="••••••••"
        />
      </div>
    </div>

    <!-- Términos -->
    <div class="flex items-start gap-3 p-4 bg-gray-800 rounded-lg border border-gray-600">
      <input
        type="checkbox"
        v-model="form.terms"
        required
        class="mt-1 rounded border-gray-600 bg-gray-700 text-[#7ED957] focus:ring-[#7ED957] focus:ring-2 focus:ring-offset-0"
      />
      <div>
        <span class="text-sm text-gray-300">
          Acepto los
          <a
            href="/terminos-y-condiciones"
            class="text-[#7ED957] hover:text-[#66b047] underline transition-colors"
          >
            términos y condiciones
          </a>
          y la
          <a
            href="/politica-privacidad"
            class="text-[#24DEFF] hover:text-[#1cb8d9] underline transition-colors"
          >
            política de privacidad
          </a>
        </span>
      </div>
    </div>

    <!-- Botón -->
    <button
      type="submit"
      class="w-full bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-bold py-3 px-4 rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      :disabled="!form.terms"
    >
      🚀 Crear cuenta
    </button>

    <!-- Error -->
    <div v-if="error" class="p-3 bg-red-900/30 border border-red-700 rounded-lg">
      <p class="text-red-400 text-sm flex items-center gap-2">
        <span>⚠</span>
        {{ error }}
      </p>
    </div>

    <!-- Enlace a login -->
    <div class="text-center pt-4 border-t border-gray-700">
      <p class="text-gray-400 text-sm">
        ¿Ya tienes cuenta?
        <RouterLink
          to="/login"
          class="text-[#24DEFF] hover:text-[#1cb8d9] font-semibold transition-colors"
        >
          Inicia sesión aquí
        </RouterLink>
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

interface RegisterFormData {
  name: string
  lastName: string
  role: string
  documentType: string
  documentNumber: string
  email: string
  password: string
  confirm: string
  terms: boolean
}

const error = ref('')
const form = reactive<RegisterFormData>({
  name: '',
  lastName: '',
  role: '',
  documentType: '',
  documentNumber: '',
  email: '',
  password: '',
  confirm: '',
  terms: false,
})

const router = useRouter()

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   headers: { 'Content-Type': 'application/json' },
// })

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL_DEPLOY,
  headers: { 'Content-Type': 'application/json' },
})

async function onSubmit() {
  error.value = ''

  if (form.password !== form.confirm) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  if (!form.terms) {
    error.value = 'Debes aceptar los términos y condiciones'
    return
  }

  try {
    const payload = {
      nombre: form.name,
      apellido: form.lastName,
      rol: form.role,
      tipo_documento: form.documentType,
      documento: form.documentNumber,
      email: form.email,
      password: form.password,
      confirm: form.confirm,
      acepta_terminos: form.terms,
    }

    await api.post('/register/', payload)

    alert('🎉 Registro exitoso. Ahora puedes iniciar sesión.')
    router.push('/login')
  } catch (err: any) {
    console.error('Error backend:', err)
    error.value =
      err.response?.data?.message ||
      err.response?.data ||
      'Error en el registro. Intenta nuevamente.'
  }
}
</script>
