<template>
  <div class="bg-gray-100 min-h-screen p-5 text-gray-800 font-sans">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-1">Dashboard Administrador</h1>
      <p class="text-lg text-gray-500">Bienvenido, {{ mappedUser.nombre }} {{ mappedUser.apellido }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 my-8">
      <div class="bg-white rounded-xl p-4 flex items-center shadow hover:-translate-y-1 transition">
        <div class="text-3xl mr-4">👥</div>
        <div>
          <h3 class="text-sm text-gray-400">Total Aprendices</h3>
          <p class="text-2xl font-bold text-gray-700">{{ totalAprendices }}</p>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 flex items-center shadow hover:-translate-y-1 transition">
        <div class="text-3xl mr-4">📅</div>
        <div>
          <h3 class="text-sm text-gray-400">Eventos Activos</h3>
          <p class="text-2xl font-bold text-gray-700">{{ activeEvents }}</p>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 flex items-center shadow hover:-translate-y-1 transition">
        <div class="text-3xl mr-4">✅</div>
        <div>
          <h3 class="text-sm text-gray-400">Asistencias Hoy</h3>
          <p class="text-2xl font-bold text-gray-700">{{ todayAttendance }}</p>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 flex items-center shadow hover:-translate-y-1 transition">
        <div class="text-3xl mr-4">📊</div>
        <div>
          <h3 class="text-sm text-gray-400">Porcentaje Asistencia</h3>
          <p class="text-2xl font-bold text-gray-700">{{ attendancePercentage }}%</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <router-link
          to="/gestion-usuarios"
          class="bg-blue-700 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center"
        >
          <div class="text-3xl mb-2">👤</div>
          <h3 class="text-lg font-bold">Gestionar Usuarios</h3>
          <p class="text-sm">Agregar, modificar o eliminar usuarios</p>
        </router-link>

        <router-link
          to="/gestion-eventos"
          class="bg-purple-800 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center"
        >
          <div class="text-3xl mb-2">📅</div>
          <h3 class="text-lg font-bold">Gestionar Eventos</h3>
          <p class="text-sm">Crear y administrar eventos</p>
        </router-link>

        <router-link
          to="/registro-asistencias"
          class="bg-green-600 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center"
        >
          <div class="text-3xl mb-2">✅</div>
          <h3 class="text-lg font-bold">Registrar Asistencias</h3>
          <p class="text-sm">Marcar asistencias de aprendices</p>
        </router-link>

        <router-link
          to="/reportes-generales"
          class="bg-yellow-600 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center"
        >
          <div class="text-3xl mb-2">📊</div>
          <h3 class="text-lg font-bold">Reportes Generales</h3>
          <p class="text-sm">Visualizar estadísticas y exportar reportes</p>
        </router-link>
      </div>
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="text-2xl font-semibold mb-4">Actividad Reciente</h2>
      <div class="flex flex-col gap-3">
        <div v-for="activity in recentActivities" :key="activity.id" class="bg-white p-3 rounded-xl flex items-center shadow">
          <div class="text-2xl mr-3">{{ activity.icon }}</div>
          <div>
            <h4 class="font-bold">{{ activity.title }}</h4>
            <p class="text-sm text-gray-500">{{ activity.description }}</p>
            <span class="text-xs text-gray-400">{{ formatTime(activity.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>
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
    apellido: u?.apellido ?? ''
  }
})

// Estadísticas
const totalAprendices = ref(0)
const activeEvents = ref(0)
const todayAttendance = ref(0)
const attendancePercentage = ref(0)

// Actividad reciente
const recentActivities = ref([
  { id: 1, icon: '✅', title: 'Asistencia registrada', description: 'Juan Pérez - Laboratorio A', timestamp: new Date() },
  { id: 2, icon: '📅', title: 'Evento creado', description: 'Semana de inducción', timestamp: new Date() },
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
  }
}

onMounted(() => {
  fetchStats()
})
</script>