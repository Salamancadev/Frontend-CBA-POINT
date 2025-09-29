<template>
  <nav class="bg-gray-800 p-4">
    <ul class="flex space-x-6 justify-center">
      <li>
        <RouterLink
          to="/ConsulEvent-aprendiz"
          class="text-white hover:text-yellow-400 font-semibold"
        >
          Consultar Eventos
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/GenerarQR-aprendiz" class="text-white hover:text-yellow-400 font-semibold">
          Generar QR
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/Mapa-aprendiz" class="text-white hover:text-yellow-400 font-semibold">
          Mapa
        </RouterLink>
      </li>
      <li>
        <RouterLink to="/Scann-aprendiz" class="text-white hover:text-yellow-400 font-semibold">
          Scanear Punto de control
        </RouterLink>
      </li>
    </ul>
  </nav>
  <div class="min-h-screen bg-gray-800 p-6">
    <!-- Header -->
    <header class="bg-indigo-600 text-white p-4 rounded-lg shadow mb-6">
      <h1 class="text-2xl font-bold">🎓 Dashboard Estudiante</h1>
      <p class="text-sm">Bienvenido, {{ name }}</p>
    </header>

    <!-- Contenido -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <!-- Próximos eventos -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">📅 Próximos Eventos</h2>
        <div v-if="loadingEventos" class="text-blue-600">Cargando eventos...</div>
        <div v-else-if="eventos.length === 0" class="text-gray-500">No tienes eventos próximos</div>
        <ul v-else class="space-y-2">
          <li
            v-for="evento in eventos"
            :key="evento.id"
            class="p-3 bg-gray-50 rounded-lg border hover:bg-indigo-50"
          >
            <p class="font-bold">{{ evento.nombre }}</p>
            <p class="text-sm text-gray-600">{{ evento.tipo }}</p>
            <p class="text-xs text-gray-500">
              {{ new Date(evento.fecha_inicio).toLocaleString() }} -
              {{ new Date(evento.fecha_fin).toLocaleString() }}
            </p>
          </li>
        </ul>
      </div>

      <!-- Historial de asistencia -->
      <div class="bg-white p-6 rounded-lg shadow">
        <h2 class="text-xl font-semibold mb-4">📊 Historial de Asistencia</h2>
        <div v-if="loadingHistorial" class="text-blue-600">Cargando historial...</div>
        <div v-else-if="!historial.length" class="text-gray-500">No hay registros aún</div>

        <!-- Estadísticas -->
        <div v-else>
          <p class="mb-2">✅ Presentes: {{ presentes }}</p>
          <p class="mb-2">❌ Ausentes: {{ ausentes }}</p>
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>
    </div>

    <!-- Escanear QR -->
    <div class="mt-6">
      <button
        @click="irAScanner"
        class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg shadow"
      >
        📷 Escanear QR
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js'

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default {
  name: 'DashboardEstudiante',
  data() {
    return {
      estudianteNombre: 'Estudiante', // 👉 luego puedes traerlo del backend
      eventos: [],
      historial: [],
      presentes: 0,
      ausentes: 0,
      loadingEventos: true,
      loadingHistorial: true,
    }
  },
  async mounted() {
    await this.getEventos()
    await this.getHistorial()
  },
  methods: {
    async getEventos() {
      try {
        const token = localStorage.getItem('access')
        const response = await axios.get('http://127.0.0.1:8000/api/eventos/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.eventos = response.data
      } catch (err) {
        console.error('Error cargando eventos:', err)
      } finally {
        this.loadingEventos = false
      }
    },
    async getHistorial() {
      try {
        const token = localStorage.getItem('access')
        const response = await axios.get('http://127.0.0.1:8000/api/asistencias/historial/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        this.historial = response.data
        this.presentes = this.historial.filter((h) => h.estado === 'presente').length
        this.ausentes = this.historial.filter((h) => h.estado === 'ausente').length

        this.renderChart()
      } catch (err) {
        console.error('Error cargando historial:', err)
      } finally {
        this.loadingHistorial = false
      }
    },
    renderChart() {
      const ctx = this.$refs.chartCanvas.getContext('2d')
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Presentes', 'Ausentes'],
          datasets: [
            {
              label: 'Asistencias',
              data: [this.presentes, this.ausentes],
              backgroundColor: ['#4ade80', '#f87171'],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: { legend: { display: false } },
        },
      })
    },
    irAScanner() {
      this.$router.push('/Scann-aprendiz')
    },
  },
}
</script>
