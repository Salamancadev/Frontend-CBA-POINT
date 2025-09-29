<template>
  <nav class="bg-gray-800 p-4">
    <ul class="flex space-x-6 justify-center">
      <li>
        <RouterLink
          to="/inst_ConsulEvent"
          class="text-white hover:text-yellow-400 font-semibold"
        >
          Evento
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/inst_Reportes"
          class="text-white hover:text-yellow-400 font-semibold"
        >
          Reportes
        </RouterLink>
      </li>
      <li>
        <RouterLink
          to="/inst_Scann"
          class="text-white hover:text-yellow-400 font-semibold"
        >
          Scann Qr
        </RouterLink>
      </li>
    </ul>
  </nav>
  <div class="max-w-3xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-center">Historial de Asistencia</h2>

    <!-- Cargando -->
    <div v-if="loading" class="text-blue-600">Cargando historial...</div>

    <!-- Error -->
    <div v-if="error" class="text-red-600">{{ error }}</div>

    <!-- Gráfico -->
    <div v-if="!loading && !error" class="bg-white p-4 rounded-lg shadow">
      <BarChart :chart-data="chartData" :chart-options="chartOptions" />
    </div>
  </div>
</template>

<script>
import axios from "axios"
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js"
import { defineComponent } from "vue"
import { Bar } from "vue-chartjs"

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default defineComponent({
  name: "HistorialAsistencia",
  components: {
    BarChart: Bar
  },
  data() {
    return {
      asistencias: [],
      loading: true,
      error: null,
      chartData: {
        labels: [],
        datasets: []
      },
      chartOptions: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: {
            display: true,
            text: "Asistencias del Usuario"
          }
        }
      }
    }
  },
  mounted() {
    this.getHistorial()
  },
  methods: {
    async getHistorial() {
      try {
        const token = localStorage.getItem("access") // 🔑 ahora sí correcto
        console.log("🔑 Token usado en la petición:", token)

        const response = await axios.get("http://127.0.0.1:8000/api/asistencias/historial/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        this.asistencias = response.data

        // Contar presentes y ausentes
        const presentes = this.asistencias.filter(a => a.estado === "presente").length
        const ausentes = this.asistencias.filter(a => a.estado === "ausente").length

        // Preparar datos para el gráfico
        this.chartData = {
          labels: ["Presentes", "Ausentes"],
          datasets: [
            {
              label: "Cantidad",
              data: [presentes, ausentes],
              backgroundColor: ["#4ade80", "#f87171"]
            }
          ]
        }
      } catch (err) {
        this.error = "Error al cargar el historial ❌"
        console.error("❌ Error en getHistorial:", err)
      } finally {
        this.loading = false
      }
    }
  }
})
</script>
