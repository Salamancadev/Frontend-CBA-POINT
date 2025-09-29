<template>
  <div class="p-5 bg-gray-100 min-h-screen">
    <h1 class="text-2xl font-bold mb-4">Reportes Generales</h1>

    <!-- Filtro por evento -->
    <div class="mb-4 flex gap-3 flex-wrap">
      <select v-model="selectedEventId" @change="fetchReport" class="p-2 border rounded">
        <option value="">-- Todos los eventos --</option>
        <option v-for="event in events" :key="event.id" :value="event.id">
          {{ event.name }} - {{ event.date }}
        </option>
      </select>

      <input type="date" v-model="startDate" class="p-2 border rounded" placeholder="Desde" />
      <input type="date" v-model="endDate" class="p-2 border rounded" placeholder="Hasta" />

      <button @click="fetchReport" class="bg-blue-600 text-white px-4 py-2 rounded">
        Filtrar
      </button>

      <button @click="exportCSV" class="bg-green-600 text-white px-4 py-2 rounded">
        Exportar CSV
      </button>
    </div>

    <!-- Tabla de reportes -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="border-b text-left">
          <th class="p-2">Evento</th>
          <th class="p-2">Aprendiz</th>
          <th class="p-2">Documento</th>
          <th class="p-2">Asistencias</th>
          <th class="p-2">Porcentaje</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in reportData" :key="row.id" class="border-b">
          <td class="p-2">{{ row.eventName }}</td>
          <td class="p-2">{{ row.name }} {{ row.lastName }}</td>
          <td class="p-2">{{ row.documentNumber }}</td>
          <td class="p-2">{{ row.attendanceCount }} / {{ row.totalSessions }}</td>
          <td class="p-2">{{ row.attendancePercentage }}%</td>
        </tr>
      </tbody>
    </table>

    <p v-if="reportData.length === 0" class="mt-4 text-gray-500">
      No hay datos para mostrar.
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'

const events = ref<any[]>([])
const reportData = ref<any[]>([])

const selectedEventId = ref<string | number>('')
const startDate = ref<string>('')
const endDate = ref<string>('')

// Traer todos los eventos
const fetchEvents = async () => {
  try {
    const res = await api.get('/events/')
    events.value = res.data
  } catch (err) {
    console.error('Error fetching events:', err)
  }
}

// Traer reporte
const fetchReport = async () => {
  try {
    let query = '?'
    if (selectedEventId.value) query += `event_id=${selectedEventId.value}&`
    if (startDate.value) query += `start_date=${startDate.value}&`
    if (endDate.value) query += `end_date=${endDate.value}&`

    const res = await api.get(`/reports/${query}`)
    reportData.value = res.data
  } catch (err) {
    console.error('Error fetching report:', err)
    reportData.value = []
  }
}

// Exportar CSV
const exportCSV = () => {
  if (reportData.value.length === 0) return

  const header = ['Evento', 'Aprendiz', 'Documento', 'Asistencias', 'Porcentaje']
  const rows = reportData.value.map(row => [
    row.eventName,
    `${row.name} ${row.lastName}`,
    row.documentNumber,
    `${row.attendanceCount} / ${row.totalSessions}`,
    row.attendancePercentage,
  ])

  let csvContent = [header, ...rows].map(e => e.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', 'reportes_generales.csv')
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

onMounted(() => {
  fetchEvents()
  fetchReport()
})
</script>