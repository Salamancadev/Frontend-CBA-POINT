<template>
  <div class="p-5 bg-gray-100 min-h-screen">
    <!-- Botón volver -->
    <button @click="$router.back()" class="mb-4 bg-gray-700 text-white p-2 rounded">
      Volver al menú
    </button>

    <h1 class="text-2xl font-bold mb-4">Gestión de Eventos</h1>

    <!-- Botón Crear Evento -->
    <button @click="openModal" class="mb-4 bg-green-600 text-white p-2 rounded">
      Crear Evento
    </button>

    <!-- Tabla de eventos -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="text-left border-b">
          <th class="p-2">Nombre</th>
          <th class="p-2">Tipo</th>
          <th class="p-2">Fecha Inicio</th>
          <th class="p-2">Fecha Fin</th>
          <th class="p-2">Jornada</th>
          <th class="p-2">Docente</th>
          <th class="p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="event.id ?? `event-${index}`" class="border-b">
          <td class="p-2">{{ event.nombre }}</td>
          <td class="p-2">{{ event.tipo }}</td>
          <td class="p-2">{{ event.fecha_inicio }}</td>
          <td class="p-2">{{ event.fecha_fin }}</td>
          <td class="p-2">{{ event.jornada ?? '-' }}</td>
          <td class="p-2">
            {{ event.docente?.nombre ?? '-' }} {{ event.docente?.apellido ?? '' }}
          </td>
          <td class="p-2 flex gap-2">
            <button @click="editEvent(event)" class="bg-yellow-500 text-white p-1 rounded">
              Editar
            </button>
            <button @click="deleteEvent(event.id)" class="bg-red-500 text-white p-1 rounded">
              Eliminar
            </button>
          </td>
        </tr>
        <tr v-if="events.length === 0">
          <td colspan="7" class="text-center p-4 text-gray-500">No se encontraron eventos</td>
        </tr>
      </tbody>
    </table>

    <!-- Modal Crear/Editar Evento -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
    >
      <div class="bg-white p-5 rounded w-96">
        <h2 class="text-lg font-bold mb-2">
          {{ editingEvent ? 'Editar Evento' : 'Crear Evento' }}
        </h2>
        <form @submit.prevent="saveEvent">
          <input
            v-model="form.nombre"
            placeholder="Nombre del evento"
            class="w-full p-2 mb-2 border rounded"
            required
          />

          <select v-model="form.tipo" class="w-full p-2 mb-2 border rounded" required>
            <option value="">Seleccionar tipo</option>
            <option value="Inducción">Inducción</option>
            <option value="Evento">Evento</option>
            <option value="Charla">Charla</option>
          </select>

          <input
            v-model="form.fecha_inicio"
            type="date"
            placeholder="Fecha inicio"
            class="w-full p-2 mb-2 border rounded"
            required
          />
          <input
            v-model="form.fecha_fin"
            type="date"
            placeholder="Fecha fin"
            class="w-full p-2 mb-2 border rounded"
            required
          />

          <select v-model="form.jornada" class="w-full p-2 mb-2 border rounded" required>
            <option value="">Seleccionar jornada</option>
            <option value="Mañana">Mañana</option>
            <option value="Tarde">Tarde</option>
            <option value="Mixta">Mixta</option>
          </select>

          <select v-model="form.docente_id" class="w-full p-2 mb-2 border rounded" required>
            <option value="">Seleccionar docente</option>
            <option v-for="doc in docentes" :key="doc.id" :value="doc.id">
              {{ doc.nombre }} {{ doc.apellido }}
            </option>
          </select>

          <div class="flex justify-end gap-2 mt-2">
            <button @click="closeModal" type="button" class="bg-gray-500 text-white p-1 rounded">
              Cancelar
            </button>
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

interface Evento {
  id?: number
  nombre: string
  tipo: string
  fecha_inicio: string
  fecha_fin: string
  jornada: string
  docente_id?: number
  docente?: { id: number; nombre: string; apellido: string }
  activo?: boolean
}

interface User {
  id: number
  nombre: string
  apellido: string
  rol: string
}

const events = ref<Evento[]>([])
const docentes = ref<User[]>([])
const showModal = ref(false)
const editingEvent = ref(false)

const form = reactive<Partial<Evento>>({
  id: undefined,
  nombre: '',
  tipo: '',
  fecha_inicio: '',
  fecha_fin: '',
  jornada: '',
  docente_id: undefined,
})

// --------------------------
// Traer eventos
const fetchEvents = async () => {
  try {
    const res = await api.get('/eventos/listar/')
    events.value = res.data
  } catch (err) {
    console.error('Error fetching events:', err)
  }
}

// --------------------------
// Traer docentes
const fetchDocentes = async () => {
  try {
    const res = await api.get('/users/')
    docentes.value = res.data.filter((u: User) => u.rol === 'Instructor')
  } catch (err) {
    console.error('Error fetching docentes:', err)
  }
}

// --------------------------
// Abrir modal limpio
const openModal = () => {
  showModal.value = true
  editingEvent.value = false
  Object.assign(form, {
    id: undefined,
    nombre: '',
    tipo: '',
    fecha_inicio: '',
    fecha_fin: '',
    jornada: '',
    docente_id: undefined,
  })
}

// --------------------------
// Cerrar modal
const closeModal = () => {
  showModal.value = false
  editingEvent.value = false
}

// --------------------------
// Guardar evento
const saveEvent = async () => {
  try {
    // Validación básica
    if (
      !form.nombre ||
      !form.tipo ||
      !form.fecha_inicio ||
      !form.fecha_fin ||
      !form.jornada ||
      !form.docente_id
    ) {
      return alert('Todos los campos son obligatorios')
    }

    const payload = {
      nombre: form.nombre,
      tipo: form.tipo,
      fecha_inicio: form.fecha_inicio,
      fecha_fin: form.fecha_fin,
      jornada: form.jornada,
      docente_id: form.docente_id,
      activo: true,
    }

    if (editingEvent.value && form.id) {
      await api.put(`/eventos/${form.id}/update/`, payload)
    } else {
      await api.post('/eventos/crear/', payload)
    }
    closeModal()
    await fetchEvents()
  } catch (err) {
    console.error('Error saving event:', err)
  }
}

// --------------------------
// Editar evento
const editEvent = (event: Evento) => {
  Object.assign(form, {
    id: event.id,
    nombre: event.nombre,
    tipo: event.tipo,
    fecha_inicio: event.fecha_inicio,
    fecha_fin: event.fecha_fin,
    jornada: event.jornada,
    docente_id: event.docente?.id,
  })
  editingEvent.value = true
  showModal.value = true
}

// --------------------------
// Eliminar evento
const deleteEvent = async (id?: number) => {
  if (!id) return
  if (!confirm('¿Seguro que quieres eliminar este evento?')) return
  try {
    await api.delete(`/eventos/${id}/delete/`)
    await fetchEvents()
  } catch (err) {
    console.error('Error deleting event:', err)
  }
}

// --------------------------
// Inicializar datos
onMounted(() => {
  fetchEvents()
  fetchDocentes()
})
</script>
