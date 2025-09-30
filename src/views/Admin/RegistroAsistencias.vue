<template>
  <div class="min-h-screen bg-gray-900 p-4 sm:p-6">
    <button 
      @click="$router.back()" 
      class="mb-6 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
    >
      ← Volver al menú
    </button>
    <!-- Título y encabezado -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-[#7ED957] mb-2">✅ Registro de Asistencias</h1>
      <p class="text-gray-400">Registra y gestiona las asistencias de los aprendices por evento</p>
    </div>

    <!-- Seleccionar evento -->
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
      <label class="block text-lg font-semibold text-white mb-3">Selecciona un Evento</label>
      <select
        v-model="selectedEventId"
        @change="fetchParticipants"
        class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
      >
        <option value="" disabled class="bg-gray-700">-- Selecciona un evento --</option>
        <option v-for="event in events" :key="event.id" :value="event.id" class="bg-gray-700">
          {{ event.name }} - {{ event.date }}
        </option>
      </select>
    </div>

    <!-- Información del evento seleccionado -->
    <div v-if="selectedEventId && selectedEvent" class="bg-gray-800 border border-gray-700 rounded-xl p-4 mb-6">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
        <div>
          <span class="text-gray-400">Evento:</span>
          <p class="text-white font-semibold">{{ selectedEvent.name }}</p>
        </div>
        <div>
          <span class="text-gray-400">Fecha:</span>
          <p class="text-white font-semibold">{{ selectedEvent.date }}</p>
        </div>
        <div>
          <span class="text-gray-400">Total aprendices:</span>
          <p class="text-[#7ED957] font-semibold">{{ participants.length }}</p>
        </div>
      </div>
    </div>

    <!-- Contadores de asistencia -->
    <div v-if="participants.length > 0" class="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-[#7ED957]">{{ totalParticipants }}</div>
        <div class="text-gray-400 text-sm">Total Aprendices</div>
      </div>
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-green-400">{{ presentCount }}</div>
        <div class="text-gray-400 text-sm">Presentes</div>
      </div>
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-red-400">{{ absentCount }}</div>
        <div class="text-gray-400 text-sm">Ausentes</div>
      </div>
    </div>

    <!-- Tabla de aprendices -->
    <div v-if="participants.length > 0" class="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-700">
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">#</th>
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Nombre Completo</th>
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Documento</th>
              <th class="p-4 text-center text-[#7ED957] font-semibold border-b border-gray-600">Asistencia</th>
              <th class="p-4 text-center text-[#7ED957] font-semibold border-b border-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(participant, index) in participants" 
              :key="participant.id" 
              class="border-b border-gray-600 hover:bg-gray-750 transition-colors duration-200"
            >
              <td class="p-4 text-gray-300 font-medium">{{ index + 1 }}</td>
              <td class="p-4 text-white font-medium">{{ participant.name }} {{ participant.lastName }}</td>
              <td class="p-4 text-gray-300">{{ participant.documentNumber }}</td>
              <td class="p-4 text-center">
                <label class="inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    v-model="participant.attendance" 
                    class="sr-only peer"
                  />
                  <div class="relative w-12 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#7ED957]"></div>
                </label>
              </td>
              <td class="p-4 text-center">
                <span 
                  :class="{
                    'bg-green-900/30 text-green-400': participant.attendance,
                    'bg-red-900/30 text-red-400': !participant.attendance
                  }" 
                  class="px-3 py-1 rounded-full text-xs font-semibold"
                >
                  {{ participant.attendance ? 'Presente' : 'Ausente' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Acciones -->
    <div v-if="participants.length > 0" class="mt-6 flex flex-col sm:flex-row gap-4 justify-end">
      <button 
        @click="selectAll" 
        class="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#24DEFF] text-[#24DEFF] font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
      >
        📋 Seleccionar Todos
      </button>
      <button 
        @click="deselectAll" 
        class="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-gray-500 text-gray-300 font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
      >
        🗑️ Deseleccionar Todos
      </button>
      <button 
        @click="saveAttendance" 
        class="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-bold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
      >
        💾 Guardar Asistencias
      </button>
    </div>

    <!-- Estados vacíos -->
    <div v-if="participants.length === 0 && selectedEventId" class="text-center p-8 bg-gray-800 border border-gray-700 rounded-xl">
      <div class="text-gray-400 text-4xl mb-3">👥</div>
      <p class="text-gray-400 text-lg">No hay aprendices registrados para este evento.</p>
      <p class="text-gray-500 text-sm mt-1">Verifica que el evento tenga aprendices asignados.</p>
    </div>

    <div v-if="!selectedEventId" class="text-center p-8 bg-gray-800 border border-gray-700 rounded-xl">
      <div class="text-gray-400 text-4xl mb-3">📅</div>
      <p class="text-gray-400 text-lg">Selecciona un evento para ver los aprendices.</p>
      <p class="text-gray-500 text-sm mt-1">Elige un evento de la lista para comenzar a registrar asistencias.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { api } from '../../services/api'

const events = ref<any[]>([])
const selectedEventId = ref<number | null>(null)
const participants = ref<any[]>([])

// Computed properties
const selectedEvent = computed(() => {
  return events.value.find(event => event.id === selectedEventId.value)
})

const totalParticipants = computed(() => participants.value.length)

const presentCount = computed(() => {
  return participants.value.filter(p => p.attendance).length
})

const absentCount = computed(() => {
  return participants.value.filter(p => !p.attendance).length
})

// Traer eventos activos
const fetchEvents = async () => {
  try {
    const res = await api.get('/events/')
    events.value = res.data
  } catch (err) {
    console.error('Error fetching events:', err)
  }
}

// Traer participantes de un evento
const fetchParticipants = async () => {
  if (!selectedEventId.value) return
  try {
    const res = await api.get(`/events/${selectedEventId.value}/participants/`)
    // Agregar propiedad local 'attendance' para marcar (por defecto false)
    participants.value = res.data.map((p: any) => ({ 
      ...p, 
      attendance: p.attendance || false 
    }))
  } catch (err) {
    console.error('Error fetching participants:', err)
    participants.value = []
  }
}

// Seleccionar todos
const selectAll = () => {
  participants.value.forEach(participant => {
    participant.attendance = true
  })
}

// Deseleccionar todos
const deselectAll = () => {
  participants.value.forEach(participant => {
    participant.attendance = false
  })
}

// Guardar asistencias
const saveAttendance = async () => {
  if (!selectedEventId.value) {
    alert('❌ Por favor selecciona un evento primero')
    return
  }

  try {
    const payload = participants.value.map((p) => ({
      id: p.id,
      attendance: p.attendance,
    }))
    
    await api.post(`/events/${selectedEventId.value}/attendance/`, payload)
    alert('✅ Asistencias guardadas correctamente')
    
    // Recargar participantes para obtener datos actualizados
    await fetchParticipants()
  } catch (err) {
    console.error('Error saving attendance:', err)
    alert('❌ Error al guardar asistencias')
  }
}

onMounted(fetchEvents)
</script>