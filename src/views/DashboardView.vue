<template>
  <div class="bg-gray-100 min-h-screen p-5 text-gray-800 font-sans">
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-4xl font-bold mb-1">Dashboard</h1>
      <p class="text-lg text-gray-500">Bienvenido, {{ user?.nombre }} {{ user?.apellido }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 my-8">
      <div class="bg-white rounded-xl p-4 flex items-center shadow hover:-translate-y-1 transition">
        <div class="text-3xl mr-4">📊</div>
        <div>
          <h3 class="text-sm text-gray-400">Asistencias Hoy</h3>
          <p class="text-2xl font-bold text-gray-700">{{ todayAttendance }}</p>
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
        <div class="text-3xl mr-4">🎯</div>
        <div>
          <h3 class="text-sm text-gray-400">Porcentaje Asistencia</h3>
          <p class="text-2xl font-bold text-gray-700">{{ attendancePercentage }}%</p>
        </div>
      </div>
      <div class="bg-white rounded-xl p-4 flex items-center shadow hover:-translate-y-1 transition">
        <div class="text-3xl mr-4">👥</div>
        <div>
          <h3 class="text-sm text-gray-400">Total Usuarios</h3>
          <p class="text-2xl font-bold text-gray-700">{{ totalUsers }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-8">
      <h2 class="text-2xl font-semibold mb-4">Acciones Rápidas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        <router-link to="/escaner" class="bg-blue-700 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center">
          <div class="text-3xl mb-2">📱</div>
          <h3 class="text-lg font-bold">Escanear QR</h3>
          <p class="text-sm">Registrar asistencia con código QR</p>
        </router-link>

        <router-link v-if="user?.rol === 'aprendiz'" to="/student-qr" class="bg-purple-800 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center">
          <div class="text-3xl mb-2">🎯</div>
          <h3 class="text-lg font-bold">Mi QR Personal</h3>
          <p class="text-sm">Genera tu QR para asistencia</p>
        </router-link>

        <router-link v-if="user?.rol === 'aprendiz'" to="/induction" class="bg-blue-700 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center">
          <div class="text-3xl mb-2">🎓</div>
          <h3 class="text-lg font-bold">Semana Inducción</h3>
          <p class="text-sm">Registro para nuevos aprendices</p>
        </router-link>

        <router-link to="/campus-tour" class="bg-purple-800 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center">
          <div class="text-3xl mb-2">🗺</div>
          <h3 class="text-lg font-bold">Recorrido Virtual</h3>
          <p class="text-sm">Explorar el campus CBA</p>
        </router-link>

        <router-link v-if="user?.rol !== 'aprendiz'" to="/qr-generator" class="bg-blue-700 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center">
          <div class="text-3xl mb-2">🎯</div>
          <h3 class="text-lg font-bold">Generar QR</h3>
          <p class="text-sm">Crear códigos QR para eventos</p>
        </router-link>

        <router-link v-if="user?.rol !== 'aprendiz'" to="/reports" class="bg-purple-800 text-white text-center p-4 rounded-xl shadow hover:scale-105 transition no-underline flex flex-col items-center">
          <div class="text-3xl mb-2">📈</div>
          <h3 class="text-lg font-bold">Reportes</h3>
          <p class="text-sm">Ver estadísticas y reportes</p>
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
import { ref, onMounted } from 'vue'
import type { User } from '../types'

const user = ref<User | null>(null)
const todayAttendance = ref(12)
const activeEvents = ref(5)
const attendancePercentage = ref(87)
const totalUsers = ref(245)

const recentActivities = ref([
  { id: 1, icon: '✅', title: 'Asistencia Registrada', description: 'Clase de Biotecnología - Laboratorio A', timestamp: new Date(Date.now() - 30 * 60 * 1000) },
  { id: 2, icon: '📱', title: 'QR Escaneado', description: 'Evento: Conferencia de Innovación', timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: 3, icon: '🗺', title: 'Recorrido Completado', description: 'Tour virtual del campus', timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000) },
])

onMounted(() => {
  const userData = localStorage.getItem('cba_user')
  if (userData) user.value = JSON.parse(userData)
})

const formatTime = (timestamp: Date) => {
  const now = new Date()
  const diff = now.getTime() - timestamp.getTime()
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  if (minutes < 60) return `Hace ${minutes} minutos`
  else if (hours < 24) return `Hace ${hours} horas`
  else return timestamp.toLocaleDateString()
}
</script>