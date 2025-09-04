<template>
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- Nombre y Apellido -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="name" class="block text-sm font-medium text-white">Nombre</label>
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <label for="lastName" class="block text-sm font-medium text-white">Apellido</label>
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          required
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          placeholder="Tu apellido"
        />
      </div>
    </div>

    <!-- Rol -->
    <div>
      <label for="role" class="block text-sm font-medium text-white">Rol</label>
      <select
        id="role"
        v-model="form.role"
        required
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
      >
        <option value="" disabled>Selecciona tu rol</option>
        <option value="Aprendiz">Aprendiz</option>
        <option value="Instructor">Instructor</option>
        <option value="Administrativo">Administrativo</option>
      </select>
    </div>

    <!-- Tipo y número de documento -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="documentType" class="block text-sm font-medium text-white">Tipo de documento</label>
        <select
          id="documentType"
          v-model="form.documentType"
          required
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        >
          <option value="" disabled>Selecciona el tipo</option>
          <option value="Cédula de ciudadania">Cédula de ciudadania</option>
          <option value="Tarjeta de identidad">Tarjeta de identidad</option>
          <option value="Cédula de extranjeria">Cédula de extranjeria</option>
        </select>
      </div>
      <div>
        <label for="documentNumber" class="block text-sm font-medium text-white">Número de documento</label>
        <input
          id="documentNumber"
          v-model="form.documentNumber"
          type="text"
          required
          pattern="[0-9]+"
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        />
      </div>
    </div>

    <!-- Correo -->
    <div>
      <label for="email" class="block text-sm font-medium text-white">Correo</label>
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        placeholder="tu@email.com"
      />
    </div>

    <!-- Contraseña y Confirmación -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      <div>
        <label for="confirm" class="block text-sm font-medium text-white">Confirmar contraseña</label>
        <input
          id="confirm"
          v-model="form.confirm"
          type="password"
          required
          minlength="6"
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          placeholder="••••••••"
        />
      </div>
    </div>

    <!-- Términos -->
    <label class="inline-flex items-center gap-2 text-sm text-gray-300">
      <input
        type="checkbox"
        v-model="form.terms"
        required
        class="rounded border-gray-600 bg-[#2b2f33]"
      />
      <span>Acepto los términos y condiciones</span>
    </label>

    <!-- Botón -->
    <button type="submit" class="w-full btn bg-[#7ED957] text-[#0b1220] hover:brightness-90">
      Crear cuenta
    </button>

    <!-- Error -->
    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
  </form>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
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

const emit = defineEmits<{
  (e: 'submit', payload: RegisterFormData): void
}>()

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

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json'
  }
})

async function onSubmit() {
  error.value = ''

  if (form.password !== form.confirm) {
    error.value = 'Las contraseñas no coinciden'
    return
  }

  try {
    // Payload exacto que Django espera
    const payload = {
      nombre: form.name,           // nombre en serializer
      apellido: form.lastName,     // apellido en serializer
      rol: form.role,              // rol en serializer
      tipo_documento: form.documentType, // tipo_documento en serializer
      documento: form.documentNumber,    // documento en serializer
      email: form.email,
      password: form.password,
      confirm: form.confirm,       // confirm en serializer
      acepta_terminos: form.terms  // acepta_terminos en serializer
    }

    const res = await api.post('/register/', payload)

    console.log('Registro exitoso', res.data)
    alert('Registro exitoso')
    router.push('/login')

  } catch (err: any) {
    console.error('Error completo del backend:', err)
    error.value = err.response?.data || 'Error en el registro'
  }

  emit('submit', { ...form })
}
</script>

