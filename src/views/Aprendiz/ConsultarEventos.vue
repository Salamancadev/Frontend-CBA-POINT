<template>
  <RouterLink
  to="/dashboard-aprendiz"
  class="bg-red-600 text-black font-semibold px-4 py-2 rounded hover:bg-red-700"
>
  Back
</RouterLink>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4 text-center">Lista de Eventos</h2>

    <!-- Loading -->
    <div v-if="loading" class="text-blue-600">Cargando eventos...</div>

    <!-- Error -->
    <div v-if="error" class="text-red-600">{{ error }}</div>

    <!-- Tabla -->
    <table v-if="!loading && !error" class="w-full border-collapse border border-gray-300 mt-4">
      <thead class="bg-gray-100">
        <tr>
          <th class="border px-4 py-2">Nombre</th>
          <th class="border px-4 py-2">Tipo</th>
          <th class="border px-4 py-2">Fecha Inicio</th>
          <th class="border px-4 py-2">Fecha Fin</th>
          <th class="border px-4 py-2">Docente</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="evento in eventos" :key="evento.id" class="hover:bg-gray-50">
          <td class="border px-4 py-2">{{ evento.nombre }}</td>
          <td class="border px-4 py-2">{{ evento.tipo }}</td>
          <td class="border px-4 py-2">{{ new Date(evento.fecha_inicio).toLocaleString() }}</td>
          <td class="border px-4 py-2">{{ new Date(evento.fecha_fin).toLocaleString() }}</td>
          <td class="border px-4 py-2">{{ evento.docente }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from "axios"

export default {
  name: "ListaEventos",
  data() {
    return {
      eventos: [],
      loading: true,
      error: null
    }
  },
  async mounted() {
    await this.getEventos()
  },
  methods: {
    async getEventos() {
      try {
        const token = localStorage.getItem("access") // 👈 asegúrate de guardar tu token de login aquí
        const response = await axios.get("http://127.0.0.1:8000/api/eventos/listar/", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          }
        })
        this.eventos = response.data
      } catch (err) {
        console.error("Error cargando eventos:", err)
        this.error = "❌ No se pudieron cargar los eventos (token inválido o expirado)"
      } finally {
        this.loading = false
      }
    }
  }
}
</script>
