<template>
  <div class="min-h-screen bg-gray-900 p-4 sm:p-6">
    <button 
      @click="$router.back()" 
      class="mb-6 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
    >
      ← Volver al menú
    </button>
    <!-- Título y controles -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8">
      <h1 class="text-3xl font-bold text-[#7ED957] mb-4 lg:mb-0">📊 Reportes Generales</h1>
      
      <div class="flex gap-2">
        <button 
          @click="fetchReport" 
          class="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
        >
          🔍 Filtrar
        </button>
        <button 
          @click="exportCSV" 
          :disabled="reportData.length === 0"
          class="bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#24DEFF] text-[#24DEFF] font-bold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          📥 Exportar CSV
        </button>
      </div>
    </div>

    <!-- Filtros -->
    <div class="bg-gray-800 border border-gray-700 rounded-xl p-6 mb-6">
      <h2 class="text-lg font-semibold text-white mb-4">Filtros de Reporte</h2>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Evento</label>
          <select 
            v-model="selectedEventId" 
            class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          >
            <option value="" class="bg-gray-700">-- Todos los eventos --</option>
            <option v-for="event in events" :key="event.id" :value="event.id" class="bg-gray-700">
              {{ event.name }} - {{ event.date }}
            </option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Fecha desde</label>
          <input 
            type="date" 
            v-model="startDate" 
            class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-300 mb-2">Fecha hasta</label>
          <input 
            type="date" 
            v-model="endDate" 
            class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>
    </div>

    <!-- Información de resultados -->
    <div class="mb-4 flex flex-wrap gap-4 text-sm">
      <div class="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg">
        <span class="text-gray-400">Total registros:</span>
        <span class="text-[#7ED957] font-semibold ml-2">{{ reportData.length }}</span>
      </div>
      <div class="bg-gray-800 border border-gray-700 px-3 py-2 rounded-lg">
        <span class="text-gray-400">Evento:</span>
        <span class="text-[#24DEFF] font-semibold ml-2">
          {{ selectedEventId ? events.find(e => e.id === selectedEventId)?.name : 'Todos' }}
        </span>
      </div>
    </div>

    <!-- Tabla de reportes -->
    <div class="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
      <div class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="bg-gray-700">
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Evento</th>
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Aprendiz</th>
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Documento</th>
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Asistencias</th>
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Porcentaje</th>
              <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="row in reportData" 
              :key="row.id" 
              class="border-b border-gray-600 hover:bg-gray-750 transition-colors duration-200"
            >
              <td class="p-4 text-white font-medium">{{ row.eventName }}</td>
              <td class="p-4 text-gray-300">{{ row.name }} {{ row.lastName }}</td>
              <td class="p-4 text-gray-300">{{ row.documentNumber }}</td>
              <td class="p-4 text-gray-300">{{ row.attendanceCount }} / {{ row.totalSessions }}</td>
              <td class="p-4">
                <span 
                  :class="{
                    'text-green-400': row.attendancePercentage >= 80,
                    'text-yellow-400': row.attendancePercentage >= 60 && row.attendancePercentage < 80,
                    'text-red-400': row.attendancePercentage < 60
                  }" 
                  class="font-semibold"
                >
                  {{ row.attendancePercentage }}%
                </span>
              </td>
              <td class="p-4">
                <span 
                  :class="{
                    'bg-green-900/30 text-green-400': row.attendancePercentage >= 80,
                    'bg-yellow-900/30 text-yellow-400': row.attendancePercentage >= 60 && row.attendancePercentage < 80,
                    'bg-red-900/30 text-red-400': row.attendancePercentage < 60
                  }" 
                  class="px-2 py-1 rounded-full text-xs font-semibold"
                >
                  {{
                    row.attendancePercentage >= 80 ? 'Excelente' :
                    row.attendancePercentage >= 60 ? 'Regular' : 'Bajo'
                  }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Estado vacío -->
      <div v-if="reportData.length === 0" class="text-center p-8">
        <div class="text-gray-400 mb-2">📊</div>
        <p class="text-gray-400">No hay datos para mostrar con los filtros actuales.</p>
        <p class="text-gray-500 text-sm mt-1">Intenta ajustar los filtros o seleccionar otro rango de fechas.</p>
      </div>
    </div>

    <!-- Resumen estadístico -->
    <div v-if="reportData.length > 0" class="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-[#7ED957]">{{ reportData.length }}</div>
        <div class="text-gray-400 text-sm">Total Aprendices</div>
      </div>
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-[#24DEFF]">{{ averageAttendance }}%</div>
        <div class="text-gray-400 text-sm">Promedio Asistencia</div>
      </div>
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-green-400">{{ excellentAttendance }}</div>
        <div class="text-gray-400 text-sm">Excelente (≥80%)</div>
      </div>
      <div class="bg-gray-800 border border-gray-700 rounded-xl p-4 text-center">
        <div class="text-2xl font-bold text-red-400">{{ lowAttendance }}</div>
        <div class="text-gray-400 text-sm">Bajo (<60%)</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { api } from '../../services/api'

const events = ref<any[]>([])
const reportData = ref<any[]>([])

const selectedEventId = ref<string | number>('')
const startDate = ref<string>('')
const endDate = ref<string>('')

// Estadísticas computadas
const averageAttendance = computed(() => {
  if (reportData.value.length === 0) return 0
  const total = reportData.value.reduce((sum, row) => sum + row.attendancePercentage, 0)
  return Math.round(total / reportData.value.length)
})

const excellentAttendance = computed(() => {
  return reportData.value.filter(row => row.attendancePercentage >= 80).length
})

const lowAttendance = computed(() => {
  return reportData.value.filter(row => row.attendancePercentage < 60).length
})

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
  if (reportData.value.length === 0) {
    alert('❌ No hay datos para exportar')
    return
  }

  const header = ['Evento', 'Aprendiz', 'Documento', 'Asistencias', 'Porcentaje', 'Estado']
  const rows = reportData.value.map((row) => [
    row.eventName,
    `${row.name} ${row.lastName}`,
    row.documentNumber,
    `${row.attendanceCount} / ${row.totalSessions}`,
    `${row.attendancePercentage}%`,
    row.attendancePercentage >= 80 ? 'Excelente' : row.attendancePercentage >= 60 ? 'Regular' : 'Bajo'
  ])

  let csvContent = [header, ...rows].map((e) => e.join(',')).join('\n')
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.setAttribute('download', `reportes_asistencia_${new Date().toISOString().split('T')[0]}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  
  alert('✅ Reporte exportado correctamente')
}

onMounted(() => {
  fetchEvents()
  fetchReport()
})
</script>