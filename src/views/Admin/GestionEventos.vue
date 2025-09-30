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
      <h1 class="text-3xl font-bold text-[#7ED957] mb-4 lg:mb-0">📅 Gestión de Eventos</h1>
      
      <button 
        @click="openModal" 
        class="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
      >
        ➕ Crear Evento
      </button>
    </div>

    <!-- Información de resultados -->
    <div class="mb-4 text-sm text-gray-400">
      Mostrando <span class="text-[#7ED957] font-semibold">{{ events.length }}</span> eventos
    </div>

    <!-- Tabla de eventos -->
    <div class="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-700">
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Nombre</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Tipo</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Fecha Inicio</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Fecha Fin</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Jornada</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Docente</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(event, index) in events" 
            :key="event.id ?? `event-${index}`" 
            class="border-b border-gray-600 hover:bg-gray-750 transition-colors duration-200"
          >
            <td class="p-4 text-white font-medium">{{ event.nombre }}</td>
            <td class="p-4">
              <span 
                :class="{
                  'bg-blue-900/30 text-blue-400': event.tipo === 'Inducción',
                  'bg-green-900/30 text-green-400': event.tipo === 'Evento',
                  'bg-purple-900/30 text-purple-400': event.tipo === 'Charla'
                }" 
                class="px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ event.tipo }}
              </span>
            </td>
            <td class="p-4 text-gray-300">{{ formatDate(event.fecha_inicio) }}</td>
            <td class="p-4 text-gray-300">{{ formatDate(event.fecha_fin) }}</td>
            <td class="p-4">
              <span 
                :class="{
                  'bg-yellow-900/30 text-yellow-400': event.jornada === 'Mañana',
                  'bg-orange-900/30 text-orange-400': event.jornada === 'Tarde',
                  'bg-indigo-900/30 text-indigo-400': event.jornada === 'Mixta'
                }" 
                class="px-2 py-1 rounded-full text-xs font-semibold"
              >
                {{ event.jornada ?? '-' }}
              </span>
            </td>
            <td class="p-4 text-gray-300">
              {{ event.docente?.nombre ?? '-' }} {{ event.docente?.apellido ?? '' }}
            </td>
            <td class="p-4">
              <div class="flex gap-2">
                <button 
                  @click="editEvent(event)" 
                  class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#24DEFF] text-[#24DEFF] font-semibold px-3 py-1 rounded transition-all duration-300 hover:scale-105"
                >
                  ✏️ Editar
                </button>
                <button 
                  @click="deleteEvent(event.id)" 
                  class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-red-500 text-red-400 hover:text-red-300 font-semibold px-3 py-1 rounded transition-all duration-300 hover:scale-105"
                >
                  🗑️ Eliminar
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="events.length === 0">
            <td colspan="7" class="text-center p-8 text-gray-400">
              No se encontraron eventos
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Modal Crear/Editar Evento -->
    <div
      v-if="showModal"
      class="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-gray-800 border border-gray-700 rounded-xl shadow-2xl w-full max-w-md">
        <div class="p-6 border-b border-gray-700">
          <h2 class="text-xl font-bold text-[#7ED957]">
            {{ editingEvent ? '✏️ Editar Evento' : '📅 Crear Evento' }}
          </h2>
        </div>
        
        <form @submit.prevent="saveEvent" class="p-6 space-y-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Nombre del evento</label>
            <input
              v-model="form.nombre"
              placeholder="Ingresa el nombre del evento"
              required
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            />
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Tipo de evento</label>
            <select 
              v-model="form.tipo" 
              required
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            >
              <option value="" class="bg-gray-700">Seleccionar tipo</option>
              <option value="Inducción" class="bg-gray-700">Inducción</option>
              <option value="Evento" class="bg-gray-700">Evento</option>
              <option value="Charla" class="bg-gray-700">Charla</option>
            </select>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Fecha inicio</label>
              <input
                v-model="form.fecha_inicio"
                type="date"
                required
                class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-300 mb-2">Fecha fin</label>
              <input
                v-model="form.fecha_fin"
                type="date"
                required
                class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              />
            </div>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Jornada</label>
            <select 
              v-model="form.jornada" 
              required
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            >
              <option value="" class="bg-gray-700">Seleccionar jornada</option>
              <option value="Mañana" class="bg-gray-700">Mañana</option>
              <option value="Tarde" class="bg-gray-700">Tarde</option>
              <option value="Mixta" class="bg-gray-700">Mixta</option>
            </select>
          </div>

          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Docente responsable</label>
            <select 
              v-model="form.docente_id" 
              required
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            >
              <option value="" class="bg-gray-700">Seleccionar docente</option>
              <option v-for="doc in docentes" :key="doc.id" :value="doc.id" class="bg-gray-700">
                {{ doc.nombre }} {{ doc.apellido }}
              </option>
            </select>
          </div>

          <div class="flex justify-end gap-3 pt-4 border-t border-gray-700">
            <button
              @click="closeModal"
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

// Formatear fecha para mostrar
const formatDate = (dateString: string): string => {
  if (!dateString) return '-'
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })
}

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
      alert('❌ Todos los campos son obligatorios')
      return
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
      alert('✅ Evento actualizado correctamente')
    } else {
      await api.post('/eventos/crear/', payload)
      alert('🎉 Evento creado correctamente')
    }
    
    closeModal()
    await fetchEvents()
  } catch (err) {
    console.error('Error saving event:', err)
    alert('❌ Error al guardar el evento')
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
  if (!confirm('¿Estás seguro de que quieres eliminar este evento?')) return
  try {
    await api.delete(`/eventos/${id}/delete/`)
    alert('✅ Evento eliminado correctamente')
    await fetchEvents()
  } catch (err) {
    console.error('Error deleting event:', err)
    alert('❌ Error al eliminar el evento')
  }
}

// --------------------------
// Inicializar datos
onMounted(() => {
  fetchEvents()
  fetchDocentes()
})
</script>