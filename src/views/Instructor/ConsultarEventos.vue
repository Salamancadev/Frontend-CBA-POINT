<template>
  <div class="min-h-screen bg-gray-900 p-4 sm:p-6">
    <!-- Botón volver -->
    <button 
      @click="$router.back()" 
      class="mb-6 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
    >
      ← Volver al menú
    </button>

    <!-- Título principal -->
    <h1 class="text-3xl font-bold mb-8 text-[#7ED957]">📅 Mis Eventos</h1>

    <!-- Tabla de eventos -->
    <div class="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden">
      <table class="w-full">
        <thead>
          <tr class="bg-gray-700">
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Nombre</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Tipo</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Fecha Inicio</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Fecha Fin</th>
            <th class="p-4 text-left text-[#7ED957] font-semibold border-b border-gray-600">Jornada</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(event, index) in events" 
            :key="event.id ?? `event-${index}`" 
            class="border-b border-gray-600 hover:bg-gray-750 transition-colors duration-200"
          >
            <td class="p-4 text-white font-medium">{{ event.nombre }}</td>
            <td class="p-4 text-gray-300">{{ event.tipo }}</td>
            <td class="p-4 text-gray-300">{{ formatFecha(event.fecha_inicio) }}</td>
            <td class="p-4 text-gray-300">{{ formatFecha(event.fecha_fin) }}</td>
            <td class="p-4 text-gray-300">{{ event.jornada ?? '-' }}</td>
          </tr>

          <tr v-if="events.length === 0">
            <td colspan="5" class="text-center p-8 text-gray-400">
              No se encontraron eventos
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Información de resultados -->
    <div class="mt-4 text-sm text-gray-400">
      Mostrando <span class="text-[#7ED957] font-semibold">{{ events.length }}</span> eventos
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

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
// Generar eventos simulados al azar
const generarEventosSimulados = (): Evento[] => {
  const tiposEvento = [
    'Conferencia', 'Taller', 'Seminario', 'Capacitación', 'Evaluación', 
    'Práctica', 'Laboratorio', 'Charla', 'Presentación', 'Reunión'
  ]
  
  const nombresEvento = [
    'Introducción a la Programación',
    'Taller de Base de Datos',
    'Seminario de IoT',
    'Capacitación en Seguridad Informática',
    'Evaluación Parcial de Algoritmos',
    'Práctica de Redes',
    'Laboratorio de Electrónica',
    'Charla sobre Inteligencia Artificial',
    'Presentación de Proyectos Finales',
    'Reunión de Planeación Académica',
    'Workshop de Desarrollo Web',
    'Sesión de Code Review',
    'Maratón de Programación',
    'Demo Day de Proyectos',
    'Clase Magistral de Cloud Computing'
  ]
  
  const jornadas = ['Mañana', 'Tarde', 'Noche', 'Completa']
  
  const eventos: Evento[] = []
  const cantidadEventos = Math.floor(Math.random() * 8) + 5 // Entre 5 y 12 eventos
  
  const fechaBase = new Date()
  
  for (let i = 0; i < cantidadEventos; i++) {
    const diasOffset = Math.floor(Math.random() * 30) // Eventos en los próximos 30 días
    const fechaInicio = new Date(fechaBase)
    fechaInicio.setDate(fechaInicio.getDate() + diasOffset)
    
    const duracionHoras = Math.floor(Math.random() * 6) + 1 // Entre 1 y 6 horas
    const fechaFin = new Date(fechaInicio)
    fechaFin.setHours(fechaFin.getHours() + duracionHoras)
    
    eventos.push({
      id: i + 1,
      nombre: nombresEvento[Math.floor(Math.random() * nombresEvento.length)],
      tipo: tiposEvento[Math.floor(Math.random() * tiposEvento.length)],
      fecha_inicio: fechaInicio.toISOString(),
      fecha_fin: fechaFin.toISOString(),
      jornada: jornadas[Math.floor(Math.random() * jornadas.length)],
      docente_id: 1 // ID del docente simulado
    })
  }
  
  // Ordenar eventos por fecha
  return eventos.sort((a, b) => new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime())
}

// Formatear fecha para mostrar
const formatFecha = (fechaISO: string): string => {
  const fecha = new Date(fechaISO)
  return fecha.toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

// --------------------------
// Traer eventos (simulados por ahora)
const fetchEventosInstructor = async () => {
  try {
    // Simular delay de red
    await new Promise(resolve => setTimeout(resolve, 800))
    
    // Usar datos simulados
    events.value = generarEventosSimulados()
    
    // Si quisieras mantener la llamada real, podrías hacer:
    // const res = await api.get('/eventos/mis-eventos/')
    // events.value = res.data
  } catch (err) {
    console.error('Error fetching instructor events:', err)
    // En caso de error, usar datos simulados como fallback
    events.value = generarEventosSimulados()
  }
}

onMounted(fetchEventosInstructor)
</script>