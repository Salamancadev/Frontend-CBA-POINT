<template>
  <div class="p-5 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Gestión de Usuarios</h1>

    <!-- Botón Crear Usuario -->
    <button @click="showCreate = true" class="mb-4 bg-blue-600 text-white p-2 rounded">Crear Usuario</button>

    <!-- Tabla de usuarios -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="text-left border-b">
          <th class="p-2">Nombre</th>
          <th class="p-2">Documento</th>
          <th class="p-2">Rol</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id" class="border-b">
          <td class="p-2">{{ user.name }} {{ user.lastName }}</td>
          <td class="p-2">{{ user.documentNumber }}</td>
          <td class="p-2">{{ user.role }}</td>
          <td class="p-2 flex gap-2">
            <button @click="editUser(user)" class="bg-yellow-500 text-white p-1 rounded">Editar</button>
            <button @click="deleteUser(user.id)" class="bg-red-500 text-white p-1 rounded">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Crear/Editar -->
    <div v-if="showCreate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-5 rounded w-96">
        <h2 class="text-lg font-bold mb-2">{{ editingUser ? 'Editar Usuario' : 'Crear Usuario' }}</h2>
        <form @submit.prevent="saveUser">
          <input v-model="form.name" placeholder="Nombre" class="w-full p-2 mb-2 border rounded"/>
          <input v-model="form.lastName" placeholder="Apellido" class="w-full p-2 mb-2 border rounded"/>
          <input v-model="form.documentNumber" placeholder="Documento" class="w-full p-2 mb-2 border rounded"/>
          <select v-model="form.role" class="w-full p-2 mb-2 border rounded">
            <option value="Aprendiz">Aprendiz</option>
            <option value="Instructor">Instructor</option>
            <option value="Administrador">Administrador</option>
          </select>
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
import { ref, onMounted, reactive } from 'vue'
import { api } from '../../services/api'

const users = ref<any[]>([])
const showCreate = ref(false)
const editingUser = ref(false)
const form = reactive({
  id: null,
  name: '',
  lastName: '',
  documentNumber: '',
  role: 'Aprendiz'
})

// Traer usuarios desde el backend
const fetchUsers = async () => {
  try {
    const res = await api.get('/users/')
    users.value = res.data
  } catch (err) {
    console.error('Error fetching users:', err)
  }
}

// Guardar usuario (crear o editar)
const saveUser = async () => {
  try {
    if(editingUser.value) {
      await api.put(`/users/${form.id}/`, form)
    } else {
      await api.post('/users/', form)
    }
    showCreate.value = false
    editingUser.value = false
    fetchUsers()
  } catch (err) {
    console.error('Error saving user:', err)
  }
}

// Editar usuario
const editUser = (user: any) => {
  form.id = user.id
  form.name = user.name
  form.lastName = user.lastName
  form.documentNumber = user.documentNumber
  form.role = user.role
  editingUser.value = true
  showCreate.value = true
}

// Eliminar usuario
const deleteUser = async (id: number) => {
  try {
    await api.delete(`/users/${id}/`)
    fetchUsers()
  } catch (err) {
    console.error('Error deleting user:', err)
  }
}

onMounted(fetchUsers)
</script>
