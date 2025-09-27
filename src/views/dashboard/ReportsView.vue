<template>
  <div class="max-w-screen-xl mx-auto py-8 px-4" style="background-color: #212529; color: #f8f9fa; border-radius: 2rem;">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold mb-2 drop-shadow px-6 py-2 rounded-xl shadow-lg animate-fade-in" style="color: #7ED957;">Reportes y Estadísticas</h1>
      <p class="text-lg mb-4" style="color: #7ED957;">Análisis de asistencia y participación académica</p>
    </div>

    <div class="mb-10">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 bg-[#212529] border-2 border-[#7ED957] rounded-2xl p-6 shadow-xl">
        <div class="flex flex-col gap-2">
          <label class="font-semibold text-[#7ED957]">Período:</label>
          <select v-model="filters.period" class="rounded-lg px-4 py-2 bg-[#212529] border-2 border-[#7ED957] text-[#7ED957] focus:outline-none">
            <option value="today">Hoy</option>
            <option value="week">Esta Semana</option>
            <option value="month">Este Mes</option>
            <option value="custom">Personalizado</option>
          </select>
        </div>
        <div v-if="filters.period === 'custom'" class="flex flex-col gap-2">
          <label class="font-semibold text-[#7ED957]">Desde:</label>
          <input v-model="filters.dateFrom" type="date" class="rounded-lg px-4 py-2 bg-[#212529] border-2 border-[#7ED957] text-[#7ED957] focus:outline-none" />
        </div>
        <div v-if="filters.period === 'custom'" class="flex flex-col gap-2">
          <label class="font-semibold text-[#7ED957]">Hasta:</label>
          <input v-model="filters.dateTo" type="date" class="rounded-lg px-4 py-2 bg-[#212529] border-2 border-[#7ED957] text-[#7ED957] focus:outline-none" />
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold text-[#7ED957]">Tipo:</label>
          <select v-model="filters.type" class="rounded-lg px-4 py-2 bg-[#212529] border-2 border-[#7ED957] text-[#7ED957] focus:outline-none">
            <option value="all">Todos</option>
            <option value="induccion">Inducción</option>
            <option value="clase">Clases</option>
            <option value="evento">Eventos</option>
          </select>
        </div>
        <div class="flex flex-col gap-2">
          <label class="font-semibold text-[#7ED957]">Jornada:</label>
          <select v-model="filters.shift" class="rounded-lg px-4 py-2 bg-[#212529] border-2 border-[#7ED957] text-[#7ED957] focus:outline-none">
            <option value="all">Todas</option>
            <option value="mañana">Mañana</option>
            <option value="tarde">Tarde</option>
          </select>
        </div>
        <button @click="generateReport" class="px-6 py-3 rounded-lg font-bold shadow-lg hover:scale-105 transition" style="background-color: #7ED957; color: #212529;">📊 Generar Reporte</button>
      </div>
    </div>

    <div class="mb-10">
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
          <div class="text-3xl mr-4" style="color: #7ED957;">👥</div>
          <div>
            <h3 class="text-3xl font-extrabold" style="color: #7ED957;">{{ reportData.totalStudents }}</h3>
            <p class="text-base font-medium" style="color: #7ED957;">Total Estudiantes</p>
          </div>
        </div>
        <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
          <div class="text-3xl mr-4" style="color: #7ED957;">📅</div>
          <div>
            <h3 class="text-3xl font-extrabold" style="color: #7ED957;">{{ reportData.totalEvents }}</h3>
            <p class="text-base font-medium" style="color: #7ED957;">Eventos Registrados</p>
          </div>
        </div>
        <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
          <div class="text-3xl mr-4" style="color: #7ED957;">✅</div>
          <div>
            <h3 class="text-3xl font-extrabold" style="color: #7ED957;">{{ reportData.totalAttendance }}</h3>
            <p class="text-base font-medium" style="color: #7ED957;">Asistencias Totales</p>
          </div>
        </div>
        <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
          <div class="text-3xl mr-4" style="color: #7ED957;">📈</div>
          <div>
            <h3 class="text-3xl font-extrabold" style="color: #7ED957;">{{ reportData.averageAttendance }}%</h3>
            <p class="text-base font-medium" style="color: #7ED957;">Promedio Asistencia</p>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-10">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="rounded-2xl p-6 shadow-xl" style="background-color: #212529; border: 2px solid #7ED957;">
          <h3 class="text-xl font-bold mb-4 text-center" style="color: #7ED957;">Asistencia por Día</h3>
          <div class="flex items-end gap-2 h-56 w-full">
            <div
              v-for="(day, index) in attendanceByDay"
              :key="index"
              class="flex flex-col justify-end items-center w-12"
            >
              <div :style="{ height: day.percentage + '%', background: '#7ED957', borderRadius: '8px 8px 0 0' }" class="w-full flex items-end justify-center">
                <span class="text-xs font-bold text-[#212529]">{{ day.count }}</span>
              </div>
              <span class="mt-2 text-xs font-semibold text-[#7ED957]">{{ day.day }}</span>
            </div>
          </div>
        </div>
        <div class="rounded-2xl p-6 shadow-xl" style="background-color: #212529; border: 2px solid #7ED957;">
          <h3 class="text-xl font-bold mb-4 text-center" style="color: #7ED957;">Distribución por Tipo</h3>
          <div class="flex flex-col gap-4 items-center">
            <div v-for="(item, index) in attendanceByType" :key="index" class="flex items-center gap-2">
              <div class="w-6 h-6 rounded-full" :style="{ background: item.color }"></div>
              <span class="font-semibold text-[#7ED957]">{{ item.type }}: {{ item.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mb-10">
      <div class="rounded-2xl p-6 shadow-xl" style="background-color: #212529; border: 2px solid #7ED957;">
        <div class="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
          <h3 class="text-xl font-bold" style="color: #7ED957;">Detalle de Asistencias</h3>
          <div class="flex gap-2">
            <button @click="exportToCSV" class="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition" style="background-color: #7ED957; color: #212529;">📥 Exportar CSV</button>
            <button @click="exportToPDF" class="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition" style="background-color: #7ED957; color: #212529;">📄 Exportar PDF</button>
          </div>
        </div>
        <div class="overflow-x-auto rounded-lg mb-4">
          <table class="min-w-full text-sm">
            <thead>
              <tr style="background-color: #7ED957; color: #212529;">
                <th class="px-4 py-2 font-bold">Fecha</th>
                <th class="px-4 py-2 font-bold">Estudiante</th>
                <th class="px-4 py-2 font-bold">Evento</th>
                <th class="px-4 py-2 font-bold">Tipo</th>
                <th class="px-4 py-2 font-bold">Jornada</th>
                <th class="px-4 py-2 font-bold">Estado</th>
                <th class="px-4 py-2 font-bold">Hora</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="record in paginatedRecords" :key="record.id" class="border-b border-[#7ED957] hover:bg-[#263238]">
                <td class="px-4 py-2">{{ formatDate(record.fecha) }}</td>
                <td class="px-4 py-2">{{ record.estudiante }}</td>
                <td class="px-4 py-2">{{ record.evento }}</td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 rounded-full font-bold text-xs" :style="record.tipo === 'clase' ? 'background-color: #7ED957; color: #212529;' : record.tipo === 'evento' ? 'background-color: #ffb300; color: #212529;' : 'background-color: #4caf50; color: #fff;'">{{ record.tipo }}</span>
                </td>
                <td class="px-4 py-2">{{ record.jornada }}</td>
                <td class="px-4 py-2">
                  <span class="px-2 py-1 rounded-full font-bold text-xs" :style="record.estado === 'presente' ? 'background-color: #7ED957; color: #212529;' : record.estado === 'ausente' ? 'background-color: #ff4d4f; color: #fff;' : 'background-color: #ffb300; color: #212529;'">{{ getStatusText(record.estado) }}</span>
                </td>
                <td class="px-4 py-2">{{ record.hora }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="flex flex-col md:flex-row justify-center items-center gap-4">
          <button
            @click="currentPage--"
            :disabled="currentPage === 1"
            class="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition" style="background-color: #7ED957; color: #212529;"
          >
            ← Anterior
          </button>
          <span class="font-bold text-[#7ED957]">Página {{ currentPage }} de {{ totalPages }}</span>
          <button
            @click="currentPage++"
            :disabled="currentPage === totalPages"
            class="px-4 py-2 rounded-lg font-semibold hover:scale-105 transition" style="background-color: #7ED957; color: #212529;"
          >
            Siguiente →
          </button>
        </div>
      </div>
    </div>

    <div class="mb-10">
      <div class="rounded-2xl p-6 shadow-xl" style="background-color: #212529; border: 2px solid #7ED957;">
        <h3 class="text-xl font-bold mb-6" style="color: #7ED957;">Análisis Avanzado</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="rounded-xl p-6 shadow-lg" style="background-color: #263238;">
            <h4 class="font-bold mb-2 text-[#7ED957]">Tendencia de Asistencia</h4>
            <div class="font-bold mb-2" :style="trendData.isPositive ? 'color: #7ED957;' : 'color: #ff4d4f;'">
              {{ trendData.isPositive ? '📈' : '📉' }} {{ trendData.percentage }}% vs período anterior
            </div>
            <p class="text-sm text-[#7ED957]">{{ trendData.description }}</p>
          </div>
          <div class="rounded-xl p-6 shadow-lg" style="background-color: #263238;">
            <h4 class="font-bold mb-2 text-[#7ED957]">Horarios de Mayor Asistencia</h4>
            <div class="flex flex-col gap-2">
              <div v-for="slot in peakHours" :key="slot.hour" class="flex items-center gap-2">
                <span class="font-bold text-[#7ED957] w-16">{{ slot.hour }}</span>
                <div class="flex-1 h-3 rounded bg-[#212529]">
                  <div :style="{ width: slot.percentage + '%', background: '#7ED957', height: '100%', borderRadius: '4px' }"></div>
                </div>
                <span class="font-bold text-[#7ED957] w-8 text-right">{{ slot.count }}</span>
              </div>
            </div>
          </div>
          <div class="rounded-xl p-6 shadow-lg" style="background-color: #263238;">
            <h4 class="font-bold mb-2 text-[#7ED957]">Estudiantes Destacados</h4>
            <div class="flex flex-col gap-2">
              <div v-for="student in topStudents" :key="student.id" class="flex justify-between items-center bg-[#212529] rounded-lg px-4 py-2">
                <div class="flex flex-col">
                  <span class="font-bold text-[#7ED957]">{{ student.name }}</span>
                  <span class="text-xs text-[#7ED957]">{{ student.program }}</span>
                </div>
                <span class="font-bold text-[#7ED957]">{{ student.attendanceRate }}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import type { User } from 'src/types/User'

const user = ref<User | null>(null)
const currentPage = ref(1)
const recordsPerPage = 10

const filters = ref({
  period: 'week',
  dateFrom: '',
  dateTo: '',
  type: 'all',
  shift: 'all'
})

const reportData = ref({
  totalStudents: 245,
  totalEvents: 28,
  totalAttendance: 1847,
  averageAttendance: 87
})

const attendanceByDay = ref([
  { day: 'Lun', count: 42, percentage: 85 },
  { day: 'Mar', count: 38, percentage: 76 },
  { day: 'Mié', count: 45, percentage: 90 },
  { day: 'Jue', count: 41, percentage: 82 },
  { day: 'Vie', count: 39, percentage: 78 },
  { day: 'Sáb', count: 25, percentage: 50 },
  { day: 'Dom', count: 15, percentage: 30 }
])

const attendanceByType = ref([
  { type: 'Clases', count: 156, color: '#667eea' },
  { type: 'Eventos', count: 89, color: '#f093fb' },
  { type: 'Inducción', count: 67, color: '#4facfe' }
])

const attendanceRecords = ref([
  {
    id: '1',
    fecha: new Date('2024-01-15'),
    estudiante: 'Juan Pérez',
    evento: 'Clase de Biotecnología',
    tipo: 'clase',
    jornada: 'mañana',
    estado: 'presente',
    hora: '08:15'
  },
  {
    id: '2',
    fecha: new Date('2024-01-15'),
    estudiante: 'María González',
    evento: 'Seminario de Investigación',
    tipo: 'evento',
    jornada: 'tarde',
    estado: 'presente',
    hora: '14:30'
  },
  {
    id: '3',
    fecha: new Date('2024-01-14'),
    estudiante: 'Carlos Rodríguez',
    evento: 'Práctica de Laboratorio',
    tipo: 'clase',
    jornada: 'mañana',
    estado: 'tardanza',
    hora: '08:45'
  },
  {
    id: '4',
    fecha: new Date('2024-01-14'),
    estudiante: 'Ana Martínez',
    evento: 'Conferencia de Innovación',
    tipo: 'evento',
    jornada: 'tarde',
    estado: 'ausente',
    hora: '--'
  },
  {
    id: '5',
    fecha: new Date('2024-01-13'),
    estudiante: 'Luis Hernández',
    evento: 'Inducción Nuevos Estudiantes',
    tipo: 'induccion',
    jornada: 'mañana',
    estado: 'presente',
    hora: '09:00'
  }
])

const trendData = ref({
  isPositive: true,
  percentage: 12,
  description: 'La asistencia ha mejorado significativamente en las últimas semanas.'
})

const peakHours = ref([
  { hour: '08:00', count: 45, percentage: 90 },
  { hour: '09:00', count: 42, percentage: 84 },
  { hour: '10:00', count: 38, percentage: 76 },
  { hour: '14:00', count: 35, percentage: 70 },
  { hour: '15:00', count: 32, percentage: 64 }
])

const topStudents = ref([
  { id: '1', name: 'María González', program: 'Biotecnología', attendanceRate: 98 },
  { id: '2', name: 'Juan Pérez', program: 'Biotecnología', attendanceRate: 95 },
  { id: '3', name: 'Ana Martínez', program: 'Biotecnología', attendanceRate: 92 }
])

const totalPages = computed(() =>
  Math.ceil(attendanceRecords.value.length / recordsPerPage)
)

const paginatedRecords = computed(() => {
  const start = (currentPage.value - 1) * recordsPerPage
  const end = start + recordsPerPage
  return attendanceRecords.value.slice(start, end)
})

onMounted(() => {
  const userData = localStorage.getItem('cba_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

const generateReport = () => {
  // Simulate report generation
  console.log('Generating report with filters:', filters.value)
  alert('Reporte generado exitosamente')
}

const exportToCSV = () => {
  // Simulate CSV export
  alert('Exportando a CSV...')
}

const exportToPDF = () => {
  // Simulate PDF export
  alert('Exportando a PDF...')
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('es-CO')
}

const getStatusText = (status: string) => {
  const statusMap: { [key: string]: string } = {
    presente: 'Presente',
    ausente: 'Ausente',
    tardanza: 'Tardanza'
  }
  return statusMap[status] || status
}
</script>

<style scoped>
</style>
