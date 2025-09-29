<template>
  <div class="p-5 bg-gray-100 min-h-screen">
    <!-- Botón volver -->
    <button @click="$router.back()" class="bg-gray-700 text-white p-2 rounded mb-4">Volver al menú</button>

    <h1 class="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

    <!-- Controles de búsqueda -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:gap-4 mb-4">
      <input 
        v-model="searchDocument"
        type="text" 
        placeholder="Buscar por documento..." 
        class="p-2 border rounded w-full sm:w-1/3"
      />
      <input 
        v-model="filterFicha"
        type="text" 
        placeholder="Filtrar por ficha (opcional)" 
        class="p-2 border rounded w-full sm:w-1/3"
      />
      <button @click="openCreateModal" class="bg-blue-600 text-white p-2 rounded mt-2 sm:mt-0">Crear Usuario</button>
    </div>

    <!-- Tabla de usuarios -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="text-left border-b">
          <th class="p-2">Nombre</th>
          <th class="p-2">Documento</th>
          <th class="p-2">Correo</th>
          <th class="p-2">Ficha</th>
          <th class="p-2">Rol</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in filteredUsers" :key="user.id" class="border-b">
          <td class="p-2">{{ user.nombre }} {{ user.apellido }}</td>
          <td class="p-2">{{ user.documento }}</td>
          <td class="p-2">{{ user.email ?? '' }}</td>
          <td class="p-2">{{ user.ficha ?? '' }}</td>
          <td class="p-2">{{ user.rol }}</td>
          <td class="p-2 flex gap-2">
            <button @click="editUser(user)" class="bg-yellow-500 text-white p-1 rounded">Editar</button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white p-1 rounded">Eliminar</button>
          </td>
        </tr>
        <tr v-if="filteredUsers.length === 0">
          <td colspan="6" class="text-center p-4 text-gray-500">No se encontraron usuarios</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Crear/Editar -->
    <div v-if="showCreate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-5 rounded w-96">
        <h2 class="text-lg font-bold mb-2">{{ editingUser ? 'Editar Usuario' : 'Crear Usuario' }}</h2>
        <form @submit.prevent="saveUser">
          <input v-model="form.nombre" placeholder="Nombre" class="w-full p-2 mb-2 border rounded"/>
          <input v-model="form.apellido" placeholder="Apellido" class="w-full p-2 mb-2 border rounded"/>
          <input v-model="form.documento" placeholder="Documento" class="w-full p-2 mb-2 border rounded"/>
          <input v-model="form.email" placeholder="Correo" class="w-full p-2 mb-2 border rounded"/>
          
          <!-- Contraseña solo al editar -->
          <input v-if="editingUser" v-model="form.password" type="password" placeholder="Nueva contraseña" class="w-full p-2 mb-2 border rounded"/>
          <input v-if="editingUser" v-model="form.confirm" type="password" placeholder="Confirmar nueva contraseña" class="w-full p-2 mb-2 border rounded"/>

          <select v-model="form.rol" class="w-full p-2 mb-2 border rounded">
            <option value="Aprendiz">Aprendiz</option>
            <option value="Instructor">Instructor</option>
            <option value="Administrativo">Administrativo</option>
          </select>

          <input v-if="form.rol === 'Aprendiz'" v-model="form.ficha" placeholder="Ficha (solo aprendices)" class="w-full p-2 mb-2 border rounded"/>

          <div class="flex justify-end gap-2 mt-2">
            <button @click="showCreate=false" type="button" class="bg-gray-500 text-white p-1 rounded">Cancelar</button>
            <button type="submit" class="bg-blue-600 text-white p-1 rounded">Guardar</button>
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
  confirm: ''
})

const searchDocument = ref('')
const filterFicha = ref('')

// Filtrado reactivo por documento y ficha
const filteredUsers = computed(() => {
  return users.value.filter(u => {
    const docMatch = u.documento.toLowerCase().includes(searchDocument.value.toLowerCase())
    const fichaMatch = filterFicha.value ? (u.ficha?.toLowerCase().includes(filterFicha.value.toLowerCase()) ?? false) : true
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
      email: form.email
    }

    if (editingUser.value) {
      if(form.password && form.password === form.confirm){
        payload.password = form.password
        payload.confirm = form.confirm
      }
      await api.put(`/users/${form.id}/update/`, payload)
      alert('Usuario editado correctamente')
    } else {
      payload.password = form.documento
      payload.confirm = form.documento
      await api.post('/users/create/', payload)
      alert('Usuario creado correctamente')
    }

    showCreate.value = false
    editingUser.value = false
    resetForm()
    await fetchUsers()
  } catch (err) {
    console.error('Error saving user:', err)
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
  if (!window.confirm('¿Seguro que quieres eliminar este perfil?')) return
  try {
    await api.delete(`/users/${id}/delete/`)
    alert('Usuario eliminado correctamente')
    await fetchUsers()
  } catch (err) {
    console.error('Error deleting user:', err)
  }
}

onMounted(fetchUsers)
</script>
