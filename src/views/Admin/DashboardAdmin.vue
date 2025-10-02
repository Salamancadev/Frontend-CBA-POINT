<template>
  <div class="min-h-screen bg-gray-900 p-6 text-white font-sans">
    <!-- Header -->
    <header class="mb-10">
      <h1 class="text-4xl font-bold mb-2 text-white">Dashboard Administrador</h1>
      <p class="text-lg text-gray-400">
        Bienvenido,
        <span class="font-semibold text-[#7ED957]"
          >{{ mappedUser.nombre }} {{ mappedUser.apellido }}</span
        >
      </p>
    </header>

    <!-- Stats Grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div
        class="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:border-[#7ED957] transition-all duration-300"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-gray-700 text-[#7ED957] text-2xl mr-4"
        >
          👥
        </div>
        <div>
          <h3 class="text-sm text-gray-400">Total Aprendices</h3>
          <p class="text-2xl font-bold text-white">{{ totalAprendices }}</p>
        </div>
      </div>
      <div
        class="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:border-[#7ED957] transition-all duration-300"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-gray-700 text-[#7ED957] text-2xl mr-4"
        >
          📅
        </div>
        <div>
          <h3 class="text-sm text-gray-400">Eventos Activos</h3>
          <p class="text-2xl font-bold text-white">{{ activeEvents }}</p>
        </div>
      </div>
      <div
        class="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:border-[#7ED957] transition-all duration-300"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-gray-700 text-[#7ED957] text-2xl mr-4"
        >
          ✅
        </div>
        <div>
          <h3 class="text-sm text-gray-400">Asistencias Hoy</h3>
          <p class="text-2xl font-bold text-white">{{ todayAttendance }}</p>
        </div>
      </div>
      <div
        class="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-2xl hover:border-[#7ED957] transition-all duration-300"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-gray-700 text-[#7ED957] text-2xl mr-4"
        >
          📊
        </div>
        <div>
          <h3 class="text-sm text-gray-400">Porcentaje Asistencia</h3>
          <p class="text-2xl font-bold text-white">{{ attendancePercentage }}%</p>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 text-white">Acciones Rápidas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link
          to="/gestion-usuarios"
          class="bg-gray-800 border border-gray-700 hover:border-[#7ED957] text-white text-center p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 no-underline flex flex-col items-center group"
        >
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            👤
          </div>
          <h3 class="text-lg font-bold text-[#7ED957]">Gestionar Usuarios</h3>
          <p class="text-sm text-gray-400 mt-2">Agregar, modificar o eliminar usuarios</p>
        </router-link>

        <router-link
          to="/gestion-eventos"
          class="bg-gray-800 border border-gray-700 hover:border-[#7ED957] text-white text-center p-6 rounded-2xl shadow-lg hover:scale-105 transition-all duration-300 no-underline flex flex-col items-center group"
        >
          <div class="text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
            📅
          </div>
          <h3 class="text-lg font-bold text-[#7ED957]">Gestionar Eventos</h3>
          <p class="text-sm text-gray-400 mt-2">Crear y administrar eventos</p>
        </router-link>
      </div>
    </section>

    <!-- Recent Activity -->
    <section>
      <h2 class="text-2xl font-semibold mb-6 text-white">Actividad Reciente</h2>
      <div class="bg-gray-800 border border-gray-700 rounded-2xl shadow divide-y divide-gray-700">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="flex items-center p-4 hover:bg-gray-750 transition-all duration-300"
        >
          <div
            class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-700 text-[#7ED957] text-xl mr-4"
          >
            {{ activity.icon }}
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-white">{{ activity.title }}</h4>
            <p class="text-sm text-gray-400">{{ activity.description }}</p>
          </div>
          <div class="text-xs text-gray-500">{{ formatTime(activity.timestamp) }}</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { api } from '../../services/api'
import { useUserStore } from '../../store/userStore'

const userStore = useUserStore()

// Computed para mapear nombres según backend
const mappedUser = computed(() => {
  const u = userStore.user
  return {
    nombre: u?.nombre ?? '',
    apellido: u?.apellido ?? '',
  }
})

// Estadísticas
const totalAprendices = ref(0)
const activeEvents = ref(0)
const todayAttendance = ref(0)
const attendancePercentage = ref(0)

// Actividad reciente
const recentActivities = ref([
  {
    id: 1,
    icon: '✅',
    title: 'Asistencia registrada',
    description: 'Juan Pérez - Laboratorio A',
    timestamp: new Date(),
  },
  {
    id: 2,
    icon: '📅',
    title: 'Evento creado',
    description: 'Semana de inducción',
    timestamp: new Date(),
  },
  {
    id: 3,
    icon: '👤',
    title: 'Usuario registrado',
    description: 'Nuevo aprendiz - María González',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 horas atrás
  },
  {
    id: 4,
    icon: '📊',
    title: 'Reporte generado',
    description: 'Asistencias mensuales - Octubre',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000), // 4 horas atrás
  },
])

const formatTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  if (minutes < 60) return `Hace ${minutes} minutos`
  else if (hours < 24) return `Hace ${hours} horas`
  else return timestamp.toLocaleDateString()
}

const fetchStats = async () => {
  try {
    const res = await api.get('/admin/stats/')
    totalAprendices.value = res.data.totalAprendices
    activeEvents.value = res.data.activeEvents
    todayAttendance.value = res.data.todayAttendance
    attendancePercentage.value = res.data.attendancePercentage
  } catch (err) {
    console.error('Error fetching admin stats:', err)
    // Datos de ejemplo para desarrollo
    totalAprendices.value = 156
    activeEvents.value = 8
    todayAttendance.value = 42
    attendancePercentage.value = 87
  }
}

onMounted(() => {
  fetchStats()
})
</script>
