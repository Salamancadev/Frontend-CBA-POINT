<template>
  <div class="min-h-screen p-6 font-sans" style="background-color: #212529; color: #f8f9fa;">
    <!-- Header -->
    <div class="mb-10">
      <h1 class="text-5xl font-extrabold mb-2 drop-shadow" style="color: #7ED957;">Dashboard</h1>
      <p class="text-lg">Bienvenido, <span class="font-semibold" style="color: #7ED957;">{{ user?.name }} {{ user?.lastName }}</span></p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 my-10">
      <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
        <div class="text-3xl mr-4" style="color: #7ED957;">📊</div>
        <div>
          <h3 class="text-base font-medium" style="color: #7ED957;">Asistencias Hoy</h3>
          <p class="text-3xl font-extrabold" style="color: #7ED957;">{{ todayAttendance }}</p>
        </div>
      </div>
      <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
        <div class="text-3xl mr-4" style="color: #7ED957;">📅</div>
        <div>
          <h3 class="text-base font-medium" style="color: #7ED957;">Eventos Activos</h3>
          <p class="text-3xl font-extrabold" style="color: #7ED957;">{{ activeEvents }}</p>
        </div>
      </div>
      <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
        <div class="text-3xl mr-4" style="color: #7ED957;">🎯</div>
        <div>
          <h3 class="text-base font-medium" style="color: #7ED957;">Porcentaje Asistencia</h3>
          <p class="text-3xl font-extrabold" style="color: #7ED957;">{{ attendancePercentage }}%</p>
        </div>
      </div>
      <div class="rounded-2xl p-6 flex items-center shadow-lg hover:-translate-y-1 hover:shadow-xl transition-transform duration-200" style="background-color: #212529; border: 2px solid #7ED957;">
        <div class="text-3xl mr-4" style="color: #7ED957;">👥</div>
        <div>
          <h3 class="text-base font-medium" style="color: #7ED957;">Total Usuarios</h3>
          <p class="text-3xl font-extrabold" style="color: #7ED957;">{{ totalUsers }}</p>
        </div>
      </div>
    </div>

    <!-- Quick Actions -->
    <div class="mb-12">
      <h2 class="text-3xl font-bold mb-6" style="color: #7ED957;">Acciones Rápidas</h2>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
        <router-link
          to="/dash-Qr"
          class="text-center p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 flex flex-col items-center"
          style="background-color: #7ED957; color: #212529;"
        >
          <div class="text-3xl mb-2">📱</div>
          <h3 class="text-lg font-bold">Escanear QR</h3>
          <p class="text-sm">Registrar asistencia con código QR</p>
        </router-link>

        <router-link
          v-if="user?.role === 'Aprendiz'"
          to="/dash-Student"
          class="text-center p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 flex flex-col items-center"
          style="background-color: #7ED957; color: #212529;"
        >
          <div class="text-3xl mb-2">🎯</div>
          <h3 class="text-lg font-bold">Mi QR Personal</h3>
          <p class="text-sm">Genera tu QR para asistencia</p>
        </router-link>

        <router-link
          v-if="user?.role === 'Aprendiz'"
          to="/dash-mapa"
          class="text-center p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 flex flex-col items-center"
          style="background-color: #7ED957; color: #212529;"
        >
          <div class="text-3xl mb-2">🎓</div>
          <h3 class="text-lg font-bold">Semana Inducción</h3>
          <p class="text-sm">Registro para nuevos aprendices</p>
        </router-link>

        <router-link
          to="/dash-mapa"
          class="text-center p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 flex flex-col items-center"
          style="background-color: #7ED957; color: #212529;"
        >
          <div class="text-3xl mb-2">🗺</div>
          <h3 class="text-lg font-bold">Recorrido Virtual</h3>
          <p class="text-sm">Explorar el campus CBA</p>
        </router-link>

        <router-link
          v-if="user?.role !== 'Aprendiz'"
          to="/dash-Student"
          class="text-center p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 flex flex-col items-center"
          style="background-color: #7ED957; color: #212529;"
        >
          <div class="text-3xl mb-2">🎯</div>
          <h3 class="text-lg font-bold">Generar QR</h3>
          <p class="text-sm">Crear códigos QR para eventos</p>
        </router-link>

        <router-link
          v-if="user?.role !== 'Aprendiz'"
          to="/dash-Reportes"
          class="text-center p-6 rounded-2xl shadow-lg hover:scale-105 hover:shadow-xl transition-transform duration-200 flex flex-col items-center"
          style="background-color: #7ED957; color: #212529;"
        >
          <div class="text-3xl mb-2">📈</div>
          <h3 class="text-lg font-bold">Reportes</h3>
          <p class="text-sm">Ver estadísticas y reportes</p>
        </router-link>
      </div>
    </div>

    <!-- Recent Activity -->
    <div>
      <h2 class="text-3xl font-bold mb-6" style="color: #7ED957;">Actividad Reciente</h2>
      <div class="flex flex-col gap-6">
        <div
          v-for="activity in recentActivities"
          :key="activity.id"
          class="p-5 rounded-2xl flex items-center shadow-lg hover:shadow-xl transition-shadow duration-200"
          style="background-color: #212529; border: 2px solid #7ED957;"
        >
          <div class="text-2xl mr-3" style="color: #7ED957;">{{ activity.icon }}</div>
          <div>
            <h4 class="font-bold text-lg mb-1" style="color: #7ED957;">{{ activity.title }}</h4>
            <p class="text-sm mb-1" style="color: #fff;">{{ activity.description }}</p>
            <span class="text-xs" style="color: #7ED957;">{{ formatTime(activity.timestamp) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watchEffect } from 'vue'
import type { User } from '../types/User'

const user = ref<User | null>(null)
const todayAttendance = ref(12)
const activeEvents = ref(5)
const attendancePercentage = ref(87)
const totalUsers = ref(245)

const recentActivities = ref([
  {
    id: 1,
    icon: '✅',
    title: 'Asistencia Registrada',
    description: 'Clase de Biotecnología - Laboratorio A',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
  },
  {
    id: 2,
    icon: '📱',
    title: 'QR Escaneado',
    description: 'Evento: Conferencia de Innovación',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: 3,
    icon: '🗺',
    title: 'Recorrido Completado',
    description: 'Tour virtual del campus',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
  },
])

// Cargar usuario desde localStorage
const loadUser = () => {
  const userData = localStorage.getItem('cba_user')
  user.value = userData ? JSON.parse(userData) : null
}

// Ejecutar al montar
onMounted(loadUser)

// Actualizar automáticamente si cambia localStorage
watchEffect(loadUser)

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
