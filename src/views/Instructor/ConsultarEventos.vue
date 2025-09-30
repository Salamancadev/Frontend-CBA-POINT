<template>
  <div class="p-5 bg-gray-100 min-h-screen">
    <!-- Botón volver -->
    <button @click="$router.back()" class="mb-4 bg-gray-700 text-white p-2 rounded">
      Volver al menú
    </button>

    <h1 class="text-2xl font-bold mb-4">Mis Eventos</h1>

    <!-- Tabla de eventos -->
    <table class="w-full bg-white rounded shadow">
      <thead>
        <tr class="text-left border-b">
          <th class="p-2">Nombre</th>
          <th class="p-2">Tipo</th>
          <th class="p-2">Fecha Inicio</th>
          <th class="p-2">Fecha Fin</th>
          <th class="p-2">Jornada</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(event, index) in events" :key="event.id ?? `event-${index}`" class="border-b">
          <td class="p-2">{{ event.nombre }}</td>
          <td class="p-2">{{ event.tipo }}</td>
          <td class="p-2">{{ event.fecha_inicio }}</td>
          <td class="p-2">{{ event.fecha_fin }}</td>
          <td class="p-2">{{ event.jornada ?? '-' }}</td>
        </tr>

        <tr v-if="events.length === 0">
          <td colspan="5" class="text-center p-4 text-gray-500">No se encontraron eventos</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../../services/api'

interface Evento {
  id?: number
  nombre: string
  tipo: string
  fecha_inicio: string
  fecha_fin: string
  jornada: string
  docente_id?: number
}

const events = ref<Evento[]>([])

// --------------------------
// Traer solo eventos del docente logueado
const fetchEventosInstructor = async () => {
  try {
    // Aquí supongo que el backend tiene un endpoint filtrado por usuario,
    // si no, puedes traer todos y filtrar en frontend por docente_id
    const res = await api.get('/eventos/mis-eventos/')
    events.value = res.data
  } catch (err) {
    console.error('Error fetching instructor events:', err)
  }
}

onMounted(fetchEventosInstructor)
</script>
