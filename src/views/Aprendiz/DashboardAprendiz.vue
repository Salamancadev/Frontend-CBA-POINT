<template>
  <!-- Navbar -->
  <nav
    class="bg-gray-900 border-b border-gray-700 p-4 shadow-xl sticky top-0 z-50 flex justify-between items-center"
  >
    <!-- Botón menú hamburguesa (solo móvil) -->
    <button
      @click="drawerOpen = !drawerOpen"
      class="lg:hidden text-[#7ED957] text-2xl focus:outline-none transition-transform hover:scale-110 hover:text-[#66b047]"
    >
      ☰
    </button>

    <!-- Logo -->
    <h1 class="text-white font-bold text-lg md:text-xl">
      🎓 Cba<span class="text-[#7ED957]">Point</span>
    </h1>

    <!-- Menú desktop -->
    <ul class="hidden lg:flex space-x-6">
      <li
        v-for="item in menu"
        :key="item.path"
        class="transition-all duration-300 transform hover:scale-105"
      >
        <RouterLink
          :to="item.path"
          class="flex items-center text-gray-300 hover:text-[#7ED957] font-semibold space-x-2 transition-colors duration-300"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>

    <!-- Dark mode -->
  </nav>

  <!-- Drawer lateral (solo móvil) -->
  <div
    v-if="drawerOpen"
    class="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden"
    @click="drawerOpen = false"
  ></div>
  <div
    class="fixed top-0 left-0 w-72 h-full bg-gray-900 text-white p-6 shadow-2xl transform transition-transform duration-300 z-50 lg:hidden border-r border-gray-700"
    :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex flex-col items-center mt-4">
      <img
        src="https://i.pravatar.cc/100"
        alt="Perfil"
        class="rounded-full w-20 h-20 border-4 border-[#7ED957]"
      />
      <p class="mt-3 font-bold text-lg text-white">{{ estudianteNombre }}</p>
      <p class="text-[#7ED957] text-sm font-semibold">Aprendiz SENA</p>
    </div>
    <ul class="space-y-4 mt-10">
      <li v-for="item in menu" :key="item.path">
        <RouterLink
          :to="item.path"
          class="flex items-center space-x-3 text-lg font-semibold text-gray-300 hover:text-[#7ED957] hover:bg-gray-800 px-4 py-3 rounded-xl transition-all duration-300"
          @click="drawerOpen = false"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
    <button
      @click="cerrarSesion"
      class="mt-10 w-full bg-gray-800 hover:bg-gray-700 text-[#7ED957] font-bold py-3 rounded-xl shadow-lg transition-all duration-300 border border-gray-600 hover:border-[#7ED957]"
    >
      🚪 Cerrar Sesión
    </button>
  </div>

  <!-- Contenido principal -->
  <div class="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
    <!-- Header -->
    <header
      class="bg-gray-800 border border-gray-700 text-white p-6 rounded-2xl shadow-lg mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center"
    >
      <div>
        <h2 class="text-2xl font-bold text-white">Bienvenido {{ estudianteNombre }}</h2>
        <p v-if="eventosHoy.length" class="text-[#7ED957] font-semibold mt-2 animate-pulse">
          📢 Hoy tienes {{ eventosHoy.length }} evento(s)
        </p>
        <p v-else class="text-gray-400 font-semibold mt-2">📅 No hay eventos para hoy</p>
      </div>
      <button
        @click="cerrarSesion"
        class="mt-4 sm:mt-0 bg-gray-800 hover:bg-gray-700 text-[#7ED957] px-5 py-3 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 font-bold border border-gray-600 hover:border-[#7ED957]"
      >
        🚪 Cerrar Sesión
      </button>
    </header>

    <!-- Resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="(card, i) in resumen"
        :key="i"
        class="p-6 rounded-2xl shadow-lg text-center bg-gray-800 border border-gray-700 hover:border-[#7ED957] transition-all duration-300 hover:shadow-2xl hover:scale-105"
      >
        <h3 class="text-gray-400 font-semibold mb-2">{{ card.titulo }}</h3>
        <p :class="card.color" class="text-4xl font-bold">{{ card.valor }}</p>
        <p class="text-xs text-gray-500 mt-2">Total registrado</p>
      </div>
    </div>

    <!-- Grid principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Eventos -->
      <div class="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg col-span-3">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-[#7ED957]">📅 Próximos Eventos</h2>
          <span class="bg-[#7ED957] text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
            {{ eventosFiltrados.length }} eventos
          </span>
        </div>

        <!-- Filtros -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <input
            v-model="filtroNombre"
            type="text"
            placeholder="Buscar evento..."
            class="bg-gray-700 border border-gray-600 text-white p-3 rounded-xl w-full transition-all duration-300 focus:ring-2 focus:ring-[#7ED957] focus:border-transparent placeholder-gray-400"
          />
          <select
            v-model="filtroTipo"
            class="bg-gray-700 border border-gray-600 text-white p-3 rounded-xl transition-all duration-300 focus:ring-2 focus:ring-[#7ED957] focus:border-transparent"
          >
            <option value="" class="bg-gray-700">Todos los tipos</option>
            <option v-for="tipo in tiposEventos" :key="tipo" :value="tipo" class="bg-gray-700">
              {{ tipo }}
            </option>
          </select>
          <button
            @click="ordenarEventos"
            class="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-[#7ED957] px-6 py-3 rounded-xl shadow transition-all duration-300 hover:scale-105 font-bold hover:border-[#7ED957]"
          >
            ⬇️ Ordenar
          </button>
        </div>

        <!-- Lista eventos -->
        <div v-if="eventosFiltrados.length" class="space-y-4">
          <div
            v-for="evento in eventosFiltrados"
            :key="evento.id"
            class="p-5 bg-gray-700 border border-gray-600 rounded-xl shadow hover:scale-[1.02] transform transition-all duration-300 hover:border-[#7ED957] group"
          >
            <div class="flex justify-between items-start">
              <div>
                <p
                  class="font-bold text-[#7ED957] text-lg group-hover:text-white transition-colors"
                >
                  {{ evento.nombre }}
                </p>
                <span
                  class="inline-block bg-gray-600 text-[#24DEFF] px-2 py-1 rounded text-xs font-semibold mt-1"
                >
                  {{ evento.tipo }}
                </span>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-300 font-semibold">
                  {{ new Date(evento.fecha_inicio).toLocaleDateString() }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ new Date(evento.fecha_inicio).toLocaleTimeString() }}
                </p>
              </div>
            </div>
            <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-600">
              <p class="text-xs text-gray-400">
                Duración:
                {{
                  Math.round(
                    (new Date(evento.fecha_fin) - new Date(evento.fecha_inicio)) / (1000 * 60 * 60),
                  )
                }}h
              </p>
              <span class="text-[#24DEFF] text-xs font-semibold"> 📍 Activo </span>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-400 text-lg">No hay eventos disponibles</p>
          <p class="text-gray-500 text-sm mt-2">Intenta con otros filtros</p>
        </div>
      </div>
    </div>

    <!-- Escanear QR -->
    <div class="mt-12 text-center">
      <RouterLink
        to="/Scann-aprendiz"
        class="inline-flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] px-8 py-4 rounded-2xl shadow-lg text-lg font-bold transform transition-all duration-300 hover:scale-110 hover:shadow-2xl"
      >
        <span class="mr-3">📷</span>
        Escanear QR de Asistencia
      </RouterLink>
    </div>

    <!-- Footer -->
    <footer class="mt-12 text-center text-gray-500 text-sm">
      <p>
        Sistema de Gestión Cba<span class="text-[#7ED957]">Point</span> •
        <span class="text-[#24DEFF]">v1.0.0</span>
      </p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, onMounted } from 'vue'
import axios from 'axios'
import {
  Chart,
  BarElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js'

Chart.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend)

interface Evento {
  id: number
  nombre: string
  tipo: string
  fecha_inicio: string
  fecha_fin: string
}
interface Asistencia {
  id: number
  estado: 'presente' | 'ausente'
  fecha: string
}

export default defineComponent({
  name: 'DashboardEstudiante',
  setup() {
    const estudianteNombre = ref('Estudiante')
    const eventos = ref<Evento[]>([])
    const historial = ref<Asistencia[]>([])
    const presentes = ref(0)
    const ausentes = ref(0)
    const ingresos = ref(0)

    const filtroNombre = ref('')
    const filtroTipo = ref('')
    const fechaInicio = ref('')
    const fechaFin = ref('')

    const chartCanvas = ref<HTMLCanvasElement | null>(null)
    const pieCanvas = ref<HTMLCanvasElement | null>(null)

    const drawerOpen = ref(false)
    const darkMode = ref(true)

    const menu = [
      { path: '/GenerarQR-aprendiz', label: 'Generar QR', icon: '🔗' },
      { path: '/Mapa-aprendiz', label: 'Mapa', icon: '🗺️' },
      { path: '/Scann-aprendiz', label: 'Scanear QR', icon: '📷' },
    ]

    const eventosHoy = computed(() =>
      eventos.value.filter((e) => {
        const hoy = new Date().toDateString()
        return new Date(e.fecha_inicio).toDateString() === hoy
      }),
    )

    const tiposEventos = computed(() => [...new Set(eventos.value.map((e) => e.tipo))])

    const eventosFiltrados = computed(() =>
      eventos.value.filter((e) => {
        const coincideNombre = e.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())
        const coincideTipo = filtroTipo.value ? e.tipo === filtroTipo.value : true
        return coincideNombre && coincideTipo
      }),
    )

    const ordenarEventos = () => {
      eventos.value.sort(
        (a, b) => new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime(),
      )
    }

    const renderChart = () => {
      if (chartCanvas.value) {
        const ctx = chartCanvas.value.getContext('2d')
        if (ctx) {
          new Chart(ctx, {
            type: 'bar',
            data: {
              labels: ['Presentes', 'Ausentes', 'Ingresos'],
              datasets: [
                {
                  label: 'Asistencias',
                  data: [presentes.value, ausentes.value, ingresos.value],
                  backgroundColor: ['#7ED957', '#ef4444', '#24DEFF'],
                },
              ],
            },
            options: {
              responsive: true,
              plugins: { legend: { display: false } },
              scales: {
                x: {
                  grid: { color: '#374151' },
                  ticks: { color: '#9CA3AF' },
                },
                y: {
                  grid: { color: '#374151' },
                  ticks: { color: '#9CA3AF' },
                },
              },
            },
          })
        }
      }
      if (pieCanvas.value) {
        const ctx = pieCanvas.value.getContext('2d')
        if (ctx) {
          new Chart(ctx, {
            type: 'pie',
            data: {
              labels: ['Presentes', 'Ausentes', 'Ingresos'],
              datasets: [
                {
                  data: [presentes.value, ausentes.value, ingresos.value],
                  backgroundColor: ['#7ED957', '#ef4444', '#24DEFF'],
                },
              ],
            },
            options: {
              plugins: {
                legend: {
                  labels: { color: '#9CA3AF' },
                },
              },
            },
          })
        }
      }
    }

    const exportarCSV = () => {
      const rows = [['Fecha', 'Estado']]
      historial.value.forEach((h) => rows.push([h.fecha, h.estado]))
      const csv = rows.map((r) => r.join(',')).join('\n')
      const blob = new Blob([csv], { type: 'text/csv' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'historial.csv'
      a.click()
      URL.revokeObjectURL(url)
    }

    const cerrarSesion = () => {
      localStorage.removeItem('access')
      window.location.href = '/login'
    }

    const toggleDarkMode = () => (darkMode.value = !darkMode.value)

    const resumen = computed(() => [
      { titulo: 'Eventos', valor: eventos.value.length, color: 'text-white' },
      { titulo: 'Asistencias', valor: presentes.value, color: 'text-[#7ED957]' },
      { titulo: 'Ausencias', valor: ausentes.value, color: 'text-red-400' },
      { titulo: 'Ingresos', valor: ingresos.value, color: 'text-[#24DEFF]' },
    ])

    const generarEventosDummy = () => {
      const tipos = ['Conferencia', 'Taller', 'Recorrido', 'Evento']
      const nombres = [
        'Presentación de proyectos finales',
        'Exposiciones volumen 2',
        'OctoberFest 🍻',
        'Fiesta Helloween 🎃🦇',
        'Fiesta Navidad 🎄🎅',
        'Feria Universitaria',
      ]
      const ahora = new Date()

      return Array.from({ length: 5 }).map((_, i) => {
        const inicio = new Date(ahora.getTime() + i * 86400000)
        const fin = new Date(inicio.getTime() + 2 * 60 * 60 * 1000)
        return {
          id: i + 1000,
          nombre: `${nombres[Math.floor(Math.random() * nombres.length)]} ${i + 1}`,
          tipo: tipos[Math.floor(Math.random() * tipos.length)],
          fecha_inicio: inicio.toISOString(),
          fecha_fin: fin.toISOString(),
        }
      })
    }

    const getEventos = async () => {
      try {
        const token = localStorage.getItem('access')
        const res = await axios.get<Evento[]>('http://127.0.0.1:8000/api/eventos/', {
          headers: { Authorization: `Bearer ${token}` },
        })
        eventos.value = res.data.length ? res.data : generarEventosDummy()
      } catch (err) {
        console.error('Error cargando eventos:', err)
        eventos.value = generarEventosDummy()
      }
    }

    const getHistorial = async () => {
      try {
        const token = localStorage.getItem('access')
        const res = await axios.get<Asistencia[]>(
          'http://127.0.0.1:8000/api/asistencias/historial/',
          { headers: { Authorization: `Bearer ${token}` } },
        )
        historial.value = res.data

        presentes.value = historial.value.filter((h) => h.estado === 'presente').length
        ausentes.value = historial.value.filter((h) => h.estado === 'ausente').length
        ingresos.value = historial.value.length

        renderChart()
      } catch (err) {
        console.error('Error cargando historial:', err)
      }
    }

    onMounted(async () => {
      await getEventos()
      await getHistorial()
    })

    return {
      estudianteNombre,
      eventos,
      historial,
      presentes,
      ausentes,
      ingresos,
      filtroNombre,
      filtroTipo,
      tiposEventos,
      eventosFiltrados,
      fechaInicio,
      fechaFin,
      chartCanvas,
      pieCanvas,
      drawerOpen,
      darkMode,
      menu,
      eventosHoy,
      resumen,
      cerrarSesion,
      toggleDarkMode,
      exportarCSV,
      ordenarEventos,
    }
  },
})
</script>
