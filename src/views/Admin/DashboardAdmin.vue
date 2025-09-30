<template>
  <div
    class="bg-gradient-to-br from-gray-100 via-gray-50 to-white min-h-screen p-6 text-gray-800 font-sans"
  >
    <!-- Header -->
    <header class="mb-10">
      <h1 class="text-4xl font-extrabold mb-2 text-gray-900 tracking-tight">
        Dashboard Administrador
      </h1>
      <p class="text-lg text-gray-600">
        Bienvenido,
        <span class="font-semibold">{{ mappedUser.nombre }} {{ mappedUser.apellido }}</span>
      </p>
    </header>

    <!-- Stats Grid -->
    <section class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div
        class="bg-white rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-green-100 text-green-600 text-2xl mr-4"
        >
          👥
        </div>
        <div>
          <h3 class="text-sm text-gray-500">Total Aprendices</h3>
          <p class="text-2xl font-bold text-gray-900">{{ totalAprendices }}</p>
        </div>
      </div>
      <div
        class="bg-white rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-purple-100 text-purple-600 text-2xl mr-4"
        >
          📅
        </div>
        <div>
          <h3 class="text-sm text-gray-500">Eventos Activos</h3>
          <p class="text-2xl font-bold text-gray-900">{{ activeEvents }}</p>
        </div>
      </div>
      <div
        class="bg-white rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-blue-100 text-blue-600 text-2xl mr-4"
        >
          ✅
        </div>
        <div>
          <h3 class="text-sm text-gray-500">Asistencias Hoy</h3>
          <p class="text-2xl font-bold text-gray-900">{{ todayAttendance }}</p>
        </div>
      </div>
      <div
        class="bg-white rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition"
      >
        <div
          class="h-12 w-12 flex items-center justify-center rounded-full bg-yellow-100 text-yellow-600 text-2xl mr-4"
        >
          📊
        </div>
        <div>
          <h3 class="text-sm text-gray-500">Porcentaje Asistencia</h3>
          <p class="text-2xl font-bold text-gray-900">{{ attendancePercentage }}%</p>
        </div>
      </div>
    </section>

    <!-- Quick Actions -->
    <section class="mb-12">
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Acciones Rápidas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link
          to="/gestion-usuarios"
          class="bg-gradient-to-r from-blue-600 to-blue-500 text-white text-center p-6 rounded-2xl shadow-lg hover:scale-105 transition transform no-underline flex flex-col items-center"
        >
          <div class="text-4xl mb-3">👤</div>
          <h3 class="text-lg font-bold">Gestionar Usuarios</h3>
          <p class="text-sm text-blue-100">Agregar, modificar o eliminar usuarios</p>
        </router-link>

        <router-link
          to="/gestion-eventos"
          class="bg-gradient-to-r from-purple-700 to-purple-600 text-white text-center p-6 rounded-2xl shadow-lg hover:scale-105 transition transform no-underline flex flex-col items-center"
        >
          <div class="text-4xl mb-3">📅</div>
          <h3 class="text-lg font-bold">Gestionar Eventos</h3>
          <p class="text-sm text-purple-100">Crear y administrar eventos</p>
        </router-link>

        <router-link
          to="/registro-asistencias"
          class="bg-gradient-to-r from-green-600 to-green-500 text-white text-center p-6 rounded-2xl shadow-lg hover:scale-105 transition transform no-underline flex flex-col items-center"
        >
          <div class="text-4xl mb-3">✅</div>
          <h3 class="text-lg font-bold">Registrar Asistencias</h3>
          <p class="text-sm text-green-100">Marcar asistencias de aprendices</p>
        </router-link>

        <router-link
          to="/reportes-generales"
          class="bg-gradient-to-r from-yellow-500 to-yellow-400 text-white text-center p-6 rounded-2xl shadow-lg hover:scale-105 transition transform no-underline flex flex-col items-center"
        >
          <div class="text-4xl mb-3">📊</div>
          <h3 class="text-lg font-bold">Reportes Generales</h3>
          <p class="text-sm text-yellow-100">Visualizar estadísticas y exportar reportes</p>
        </router-link>
      </div>
    </section>

    <!-- Recent Activity -->
    <section>
      <h2 class="text-2xl font-semibold mb-6 text-gray-800">Actividad Reciente</h2>
      <div class="bg-white rounded-2xl shadow divide-y">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="flex items-center p-4 hover:bg-gray-50 transition"
        >
          <div
            class="flex-shrink-0 h-10 w-10 flex items-center justify-center rounded-full bg-gray-100 text-xl mr-4"
          >
            {{ activity.icon }}
          </div>
          <div class="flex-1">
            <h4 class="text-sm font-semibold text-gray-800">{{ activity.title }}</h4>
            <p class="text-sm text-gray-500">{{ activity.description }}</p>
          </div>
          <div class="text-xs text-gray-400">{{ formatTime(activity.timestamp) }}</div>
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
