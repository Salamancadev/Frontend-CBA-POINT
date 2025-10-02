<template>
  <div class="min-h-screen bg-gray-900 p-4 sm:p-6">
    <!-- Botón volver -->
    <button
      @click="$router.back()"
      class="mb-6 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
    >
      ← Volver al menú
    </button>

    <!-- Título y controles -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <h1 class="text-3xl font-bold text-[#7ED957] mb-4 lg:mb-0">👥 Gestión de Usuarios</h1>

      <!-- Controles de búsqueda -->
      <div class="flex flex-col sm:flex-row gap-3">
        <input
          v-model="searchDocument"
          type="text"
          placeholder="Buscar por documento..."
          class="bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
        />
        <input
          v-model="filterFicha"
          type="text"
          placeholder="Filtrar por ficha..."
          class="bg-gray-800 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
        />
        <button
          @click="openCreateModal"
          class="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-bold p-3 rounded-lg transition-all duration-300 hover:scale-105"
        >
          ➕ Crear Usuario
        </button>
      </div>
    </div>

    <!-- Información de resultados -->
    <div class="mb-4 text-sm text-gray-400">
      Mostrando <span class="text-[#7ED957] font-semibold">{{ filteredUsers.length }}</span> de
      <span class="text-[#24DEFF] font-semibold">{{ users.length }}</span> usuarios
    </div>

    <!-- Tabla de usuarios -->
    <div class="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-700">
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">
              Nombre
            </th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">
              Documento
            </th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">
              Correo
            </th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">
              Ficha
            </th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Rol</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in filteredUsers"
            :key="user.id"
            class="border-b border-gray-600 hover:bg-gray-750 transition-colors duration-200"
          >
            <td class="p-4 text-white font-medium">{{ user.nombre }} {{ user.apellido }}</td>
            <td class="p-4 text-gray-300">{{ user.documento }}</td>
            <td class="p-4 text-gray-300">{{ user.email ?? '-' }}</td>
            <td class="p-4 text-gray-300">{{ user.ficha ?? '-' }}</td>
            <td class="p-4">
              <span
                :class="{
                  'bg-green-900/30 text-green-400': user.rol === 'Aprendiz',
                  'bg-blue-900/30 text-blue-400': user.rol === 'Instructor',
                  'bg-purple-900/30 text-purple-400': user.rol === 'Administrativo',
                }"
                class="px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ user.rol }}
              </span>
            </td>
            <td class="p-4">
              <div class="flex gap-2">
                <button
                  @click="editUser(user)"
                  class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#24DEFF] text-[#24DEFF] font-semibold px-3 py-1 rounded transition-all duration-300 hover:scale-105"
                >
                  ✏️ Editar
                </button>
                <button
                  @click="deleteUser(user.id)"
                  class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-red-500 text-red-400 hover:text-red-300 font-semibold px-3 py-1 rounded transition-all duration-300 hover:scale-105"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="filteredUsers.length === 0">
            <td colspan="6" class="text-center p-8 text-gray-400">No se encontraron usuarios</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Crear/Editar -->
    <div
      v-if="showCreate"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md">
        <div class="p-6 border-b border-gray-700">
          <h2 class="text-xl font-bold text-[#7ED957]">
            {{ editingUser ? '✏️ Editar Usuario' : '👤 Crear Usuario' }}
          </h2>
        </div>

        <form @submit.prevent="saveUser" class="p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Nombre</label>
              <input
                v-model="form.nombre"
                placeholder="Nombre"
                required
                class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Apellido</label>
              <input
                v-model="form.apellido"
                placeholder="Apellido"
                required
                class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Documento</label>
            <input
              v-model="form.documento"
              placeholder="Documento"
              required
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Correo</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="correo@ejemplo.com"
              required
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            />
          </div>

          <!-- Contraseña solo al editar -->
          <div v-if="editingUser" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Nueva contraseña</label>
              <input
                v-model="form.password"
                type="password"
                placeholder="Nueva contraseña"
                class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2"
                >Confirmar contraseña</label
              >
              <input
                v-model="form.confirm"
                type="password"
                placeholder="Confirmar contraseña"
                class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Rol</label>
            <select
              v-model="form.rol"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            >
              <option value="Aprendiz" class="bg-gray-700">Aprendiz</option>
              <option value="Instructor" class="bg-gray-700">Instructor</option>
              <option value="Administrativo" class="bg-gray-700">Administrativo</option>
            </select>
          </div>

          <div v-if="form.rol === 'Aprendiz'">
            <label class="block text-sm font-medium text-gray-300 mb-2">Ficha</label>
            <input
              v-model="form.ficha"
              placeholder="Número de ficha"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            />
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              @click="showCreate = false"
              type="button"
              class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-gray-500 text-gray-300 font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              💾 Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue'
import { api } from '../../services/api'

interface User {
  id: number
  nombre: string
  apellido: string
  documento: string
  rol: string
  ficha?: string | null
  email: string
  password?: string
  confirm?: string
}

const users = ref<User[]>([])
const showCreate = ref(false)
const editingUser = ref(false)

const form = reactive<User>({
  id: 0,
  nombre: '',
  apellido: '',
  documento: '',
  rol: 'Aprendiz',
  ficha: '',
  email: '',
  password: '',
  confirm: '',
})

const searchDocument = ref('')
const filterFicha = ref('')

// Filtrado reactivo por documento y ficha
const filteredUsers = computed(() => {
  return users.value.filter((u) => {
    const docMatch = u.documento.toLowerCase().includes(searchDocument.value.toLowerCase())
    const fichaMatch = filterFicha.value
      ? (u.ficha?.toLowerCase().includes(filterFicha.value.toLowerCase()) ?? false)
      : true
    return docMatch && fichaMatch
  })
})

// Resetear formulario
const resetForm = () => {
  form.id = 0
  form.nombre = ''
  form.apellido = ''
  form.documento = ''
  form.rol = 'Aprendiz'
  form.ficha = ''
  form.email = ''
  form.password = ''
  form.confirm = ''
}

// Abrir modal para crear usuario
const openCreateModal = () => {
  resetForm()
  editingUser.value = false
  showCreate.value = true
}

// Traer usuarios
const fetchUsers = async () => {
  try {
    const res = await api.get('/users/')
    users.value = res.data
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

// Crear o editar usuario
const saveUser = async () => {
  try {
    const payload: any = {
      nombre: form.nombre,
      apellido: form.apellido,
      documento: form.documento,
      rol: form.rol,
      ficha: form.rol === 'Aprendiz' ? form.ficha : null,
      email: form.email,
    }

    if (editingUser.value) {
      if (form.password && form.password === form.confirm) {
        payload.password = form.password
        payload.confirm = form.confirm
      }
      await api.put(`/users/${form.id}/update/`, payload)
      alert('✅ Usuario editado correctamente')
    } else {
      payload.password = form.documento
      payload.confirm = form.documento
      await api.post('/users/create/', payload)
      alert('🎉 Usuario creado correctamente')
    }

    showCreate.value = false
    editingUser.value = false
    resetForm()
    await fetchUsers()
  } catch (err) {
    console.error('Error saving user:', err)
    alert('❌ Error al guardar el usuario')
  }
}

// Editar usuario
const editUser = (u: User) => {
  form.id = u.id
  form.nombre = u.nombre
  form.apellido = u.apellido
  form.documento = u.documento
  form.rol = u.rol
  form.ficha = u.ficha ?? ''
  form.email = u.email
  form.password = ''
  form.confirm = ''
  editingUser.value = true
  showCreate.value = true
}

// Eliminar usuario
const deleteUser = async (id: number) => {
  if (!window.confirm('¿Estás seguro de que quieres eliminar este usuario?')) return
  try {
    await api.delete(`/users/${id}/delete/`)
    alert('✅ Usuario eliminado correctamente')
    await fetchUsers()
  } catch (err) {
    console.error('Error deleting user:', err)
    alert('❌ Error al eliminar el usuario')
  }
}

onMounted(fetchUsers)
</script>
