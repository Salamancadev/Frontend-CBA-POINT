<template>
  <RouterLink
  to="/dashboard-instructor"
  class="bg-red-600 text-black font-semibold px-4 py-2 rounded hover:bg-red-700"
>
  Back
</RouterLink>
  <div class="max-w-5xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-4 text-center">Eventos Registrados</h2>

    <!-- Cargando -->
    <div v-if="loading" class="text-blue-600">Cargando eventos...</div>

    <!-- Error -->
    <div v-if="error" class="text-red-600">{{ error }}</div>

    <!-- Tabla de eventos -->
    <table
      v-if="eventos.length > 0"
      class="table-auto border-collapse border border-gray-400 w-full shadow-md rounded-lg"
    >
      <thead>
        <tr class="bg-gray-200 text-left">
          <th class="border border-gray-400 px-4 py-2">Nombre</th>
          <th class="border border-gray-400 px-4 py-2">Tipo</th>
          <th class="border border-gray-400 px-4 py-2">Fecha Inicio</th>
          <th class="border border-gray-400 px-4 py-2">Fecha Fin</th>
          <th class="border border-gray-400 px-4 py-2">Docente</th>
          <th class="border border-gray-400 px-4 py-2">Activo</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="evento in eventos"
          :key="evento.id"
          class="hover:bg-gray-100"
        >
          <td class="border border-gray-400 px-4 py-2">{{ evento.nombre }}</td>
          <td class="border border-gray-400 px-4 py-2 capitalize">{{ evento.tipo }}</td>
          <td class="border border-gray-400 px-4 py-2">
            {{ formatearFecha(evento.fecha_inicio) }}
          </td>
          <td class="border border-gray-400 px-4 py-2">
            {{ formatearFecha(evento.fecha_fin) }}
          </td>
          <td class="border border-gray-400 px-4 py-2">
            {{ evento.docente || "Sin asignar" }}
          </td>
          <td class="border border-gray-400 px-4 py-2">
            <span
              :class="evento.activo ? 'text-green-600' : 'text-red-600'"
              class="font-semibold"
            >
              {{ evento.activo ? "Sí" : "No" }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- No hay eventos -->
    <div v-else-if="!loading" class="text-gray-500 text-center mt-4">
      No hay eventos registrados.
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios"

export default {
  name: "VerEventos",
  data() {
    return {
      eventos: [],
      loading: true,
      error: null
    }
  },
  mounted() {
    this.obtenerEventos()
  },
  methods: {
    async obtenerEventos() {
      try {
        const response = await axios.get("http://localhost:8000/api/eventos/listar/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // si usas JWT
            "Content-Type": "application/json"
          }
        })
        this.eventos = response.data
      } catch (err) {
        this.error = "Error al cargar los eventos ❌"
      } finally {
        this.loading = false
      }
    },
    formatearFecha(fecha) {
      return new Date(fecha).toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short"
      })
    }
  }
}
</script>

