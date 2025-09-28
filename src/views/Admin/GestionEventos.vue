<template>
  <div class="p-5 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Gestión de Eventos</h1>

    <!-- Botón Crear Evento -->
    <button @click="showCreate = true" class="mb-4 bg-green-600 text-white p-2 rounded">
      Crear Evento
    </button>

    <!-- Tabla de eventos -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="text-left border-b">
          <th class="p-2">Nombre</th>
          <th class="p-2">Fecha</th>
          <th class="p-2">Ubicación</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="event in events" :key="event.id" class="border-b">
          <td class="p-2">{{ event.name }}</td>
          <td class="p-2">{{ event.date }}</td>
          <td class="p-2">{{ event.location }}</td>
          <td class="p-2 flex gap-2">
            <button @click="editEvent(event)" class="bg-yellow-500 text-white p-1 rounded">Editar</button>
            <button @click="deleteEvent(event.id)" class="bg-red-500 text-white p-1 rounded">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Crear/Editar Evento -->
    <div v-if="showCreate" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div class="bg-white p-5 rounded w-96">
        <h2 class="text-lg font-bold mb-2">{{ editingEvent ? 'Editar Evento' : 'Crear Evento' }}</h2>
        <form @submit.prevent="saveEvent">
          <input v-model="form.name" placeholder="Nombre del evento" class="w-full p-2 mb-2 border rounded"/>
          <input v-model="form.date" type="date" placeholder="Fecha" class="w-full p-2 mb-2 border rounded"/>
          <input v-model="form.location" placeholder="Ubicación" class="w-full p-2 mb-2 border rounded"/>
          <div class="flex justify-end gap-2 mt-2">
            <button @click="showCreate=false" type="button" class="bg-gray-500 text-white p-1 rounded">Cancelar</button>
            <button type="submit" class="bg-green-600 text-white p-1 rounded">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { api } from '../../services/api'

const events = ref<any[]>([])
const showCreate = ref(false)
const editingEvent = ref(false)
const form = reactive({
  id: null,
  name: '',
  date: '',
  location: ''
})

// Traer eventos desde backend
const fetchEvents = async () => {
  try {
    const res = await api.get('/events/')
    events.value = res.data
  } catch (err) {
    console.error('Error fetching events:', err)
  }
}

// Crear o actualizar evento
const saveEvent = async () => {
  try {
    if(editingEvent.value) {
      await api.put(`/events/${form.id}/`, form)
    } else {
      await api.post('/events/', form)
    }
    showCreate.value = false
    editingEvent.value = false
    fetchEvents()
  } catch (err) {
    console.error('Error saving event:', err)
  }
}

// Editar evento
const editEvent = (event: any) => {
  form.id = event.id
  form.name = event.name
  form.date = event.date
  form.location = event.location
  editingEvent.value = true
  showCreate.value = true
}

// Eliminar evento
const deleteEvent = async (id: number) => {
  try {
    await api.delete(`/events/${id}/`)
    fetchEvents()
  } catch (err) {
    console.error('Error deleting event:', err)
  }
}

onMounted(fetchEvents)
</script>