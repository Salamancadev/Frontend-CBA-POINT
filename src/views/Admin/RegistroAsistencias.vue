<template>
  <div class="p-5 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Registro de Asistencias</h1>

    <!-- Seleccionar evento -->
    <div class="mb-4">
      <label class="block font-semibold mb-1">Selecciona un Evento</label>
      <select v-model="selectedEventId" @change="fetchParticipants" class="p-2 border rounded w-full">
        <option value="" disabled>-- Selecciona un evento --</option>
        <option v-for="event in events" :key="event.id" :value="event.id">
          {{ event.name }} - {{ event.date }}
        </option>
      </select>
    </div>

    <!-- Tabla de aprendices -->
    <table v-if="participants.length > 0" class="w-full bg-white rounded shadow">
      <thead>
        <tr class="border-b text-left">
          <th class="p-2">Nombre</th>
          <th class="p-2">Documento</th>
          <th class="p-2">Asistencia</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="participant in participants" :key="participant.id" class="border-b">
          <td class="p-2">{{ participant.name }} {{ participant.lastName }}</td>
          <td class="p-2">{{ participant.documentNumber }}</td>
          <td class="p-2 text-center">
            <input type="checkbox" v-model="participant.attendance" />
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="participants.length > 0" class="mt-4 flex justify-end">
      <button @click="saveAttendance" class="bg-green-600 text-white p-2 rounded">
        Guardar Asistencias
      </button>
    </div>

    <p v-if="participants.length === 0 && selectedEventId" class="mt-4 text-gray-500">
      No hay aprendices para este evento.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { api } from '../../services/api'

const events = ref<any[]>([])
const selectedEventId = ref<number | null>(null)
const participants = ref<any[]>([])

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
    // Agregar propiedad local 'attendance' para marcar
    participants.value = res.data.map((p: any) => ({ ...p, attendance: p.attendance }))
  } catch (err) {
    console.error('Error fetching participants:', err)
  }
}

// Guardar asistencias
const saveAttendance = async () => {
  try {
    const payload = participants.value.map(p => ({
      id: p.id,
      attendance: p.attendance,
    }))
    await api.post(`/events/${selectedEventId.value}/attendance/`, payload)
    alert('Asistencias guardadas correctamente')
  } catch (err) {
    console.error('Error saving attendance:', err)
    alert('Error al guardar asistencias')
  }
}

onMounted(fetchEvents)
</script>