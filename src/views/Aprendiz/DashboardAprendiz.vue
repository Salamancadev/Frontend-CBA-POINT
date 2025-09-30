<template>
  <!-- Navbar -->
  <nav
    class="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-600 p-4 shadow-lg sticky top-0 z-50 flex justify-between items-center"
  >
    <!-- Botón menú hamburguesa (solo móvil) -->
    <button
      @click="drawerOpen = !drawerOpen"
      class="lg:hidden text-white text-2xl focus:outline-none"
    >
      ☰
    </button>

    <!-- Logo -->
    <h1 class="text-white font-extrabold text-lg">🎓 Dashboard</h1>

    <!-- Menú desktop -->
    <ul class="hidden lg:flex space-x-6">
      <li
        v-for="item in menu"
        :key="item.path"
        class="transition-transform transform hover:scale-110"
      >
        <RouterLink
          :to="item.path"
          class="flex items-center text-white hover:text-yellow-300 font-semibold space-x-2"
        >
          <span class="text-xl">{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>

    <!-- Dark mode -->
    <button
      @click="toggleDarkMode"
      class="bg-white bg-opacity-20 text-white px-3 py-1 rounded-lg shadow hover:bg-opacity-40 transition"
    >
      {{ darkMode ? '🌙' : '☀️' }}
    </button>
  </nav>

  <!-- Drawer lateral (solo móvil) -->
  <div
    v-if="drawerOpen"
    class="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
    @click="drawerOpen = false"
  ></div>
  <div
    class="fixed top-0 left-0 w-72 h-full bg-gradient-to-b from-indigo-800 to-purple-700 text-white p-6 shadow-xl transform transition-transform duration-300 z-50 lg:hidden"
    :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'"
  >
    <div class="flex flex-col items-center mt-4">
      <img
        src="https://i.pravatar.cc/100"
        alt="Perfil"
        class="rounded-full w-20 h-20 border-4 border-yellow-400"
      />
      <p class="mt-3 font-bold text-lg">{{ estudianteNombre }}</p>
    </div>
    <ul class="space-y-6 mt-10">
      <li v-for="item in menu" :key="item.path">
        <RouterLink
          :to="item.path"
          class="flex items-center space-x-2 text-lg font-semibold hover:text-yellow-300"
          @click="drawerOpen = false"
        >
          <span>{{ item.icon }}</span>
          <span>{{ item.label }}</span>
        </RouterLink>
      </li>
    </ul>
    <button
      @click="cerrarSesion"
      class="mt-10 w-full bg-red-500 hover:bg-red-600 py-2 rounded-lg shadow-lg"
    >
      🚪 Cerrar Sesión
    </button>
  </div>

  <!-- Contenido principal -->
  <div
    :class="darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-800'"
    class="min-h-screen p-4 sm:p-6 transition-colors duration-500"
  >
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-indigo-600 to-purple-600 text-white p-6 rounded-2xl shadow-lg mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center"
    >
      <div>
        <h2 class="text-2xl font-extrabold">Bienvenido {{ estudianteNombre }}</h2>
        <p v-if="eventosHoy.length" class="text-yellow-300 font-semibold mt-2 animate-pulse">
          📢 Hoy tienes {{ eventosHoy.length }} evento(s)
        </p>
      </div>
      <button
        @click="cerrarSesion"
        class="mt-4 sm:mt-0 bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl shadow-lg transform transition hover:scale-105"
      >
        🚪 Cerrar Sesión
      </button>
    </header>

    <!-- Resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div
        v-for="(card, i) in resumen"
        :key="i"
        class="p-6 rounded-2xl shadow-lg text-center bg-white/30 dark:bg-gray-800/40 backdrop-blur-md border border-gray-200/30 hover:shadow-2xl transition"
      >
        <h3 class="text-gray-600 dark:text-gray-300">{{ card.titulo }}</h3>
        <p :class="card.color" class="text-4xl font-extrabold">{{ card.valor }}</p>
      </div>
    </div>

    <!-- Grid principal -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Eventos -->
      <div class="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg col-span-3">
        <h2 class="text-2xl font-semibold mb-4">📅 Próximos Eventos</h2>
        <!-- Filtros -->
        <div class="flex flex-col sm:flex-row gap-3 mb-4">
          <input
            v-model="filtroNombre"
            type="text"
            placeholder="Buscar evento..."
            class="border p-2 rounded w-full text-black"
          />
          <select v-model="filtroTipo" class="border p-2 rounded text-black">
            <option value="">Todos</option>
            <option v-for="tipo in tiposEventos" :key="tipo" :value="tipo">
              {{ tipo }}
            </option>
          </select>
          <button
            @click="ordenarEventos"
            class="bg-indigo-500 text-white px-4 rounded-lg shadow hover:scale-105 transition"
          >
            ⬇️ Fecha
          </button>
        </div>
        <!-- Lista eventos -->
        <ul v-if="eventosFiltrados.length" class="space-y-3">
          <li
            v-for="evento in eventosFiltrados"
            :key="evento.id"
            class="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-gray-700 dark:to-gray-600 rounded-xl shadow hover:scale-[1.02] transform transition"
          >
            <p class="font-bold text-indigo-600 dark:text-indigo-300">
              {{ evento.nombre }}
            </p>
            <p class="text-sm">{{ evento.tipo }}</p>
            <p class="text-xs opacity-80">
              {{ new Date(evento.fecha_inicio).toLocaleString() }} -
              {{ new Date(evento.fecha_fin).toLocaleString() }}
            </p>
          </li>
        </ul>
        <p v-else class="text-gray-500">No hay eventos disponibles</p>
      </div>
    </div>

    <!-- Escanear QR -->
    <div class="mt-12 text-center">
      <RouterLink
        to="/Scann-aprendiz"
        class="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-2xl shadow-lg text-lg font-bold transform transition hover:scale-110"
      >
        📷 Escanear QR
      </RouterLink>
    </div>
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
    const ingresos = ref(0) // 👈 contador de ingresos

    const filtroNombre = ref('')
    const filtroTipo = ref('')
    const fechaInicio = ref('')
    const fechaFin = ref('')

    const chartCanvas = ref<HTMLCanvasElement | null>(null)
    const pieCanvas = ref<HTMLCanvasElement | null>(null)

    const drawerOpen = ref(false)
    const darkMode = ref(true)

    const menu = [
      // { path: "/ConsulEvent-aprendiz", label: "Consultar Eventos", icon: "📅" },
      { path: '/GenerarQR-aprendiz', label: 'Generar QR', icon: '🔗' },
      { path: '/Mapa-aprendiz', label: 'Mapa', icon: '🗺️' },
      { path: '/Scann-aprendiz', label: 'Scanear Punto de Control', icon: '📷' },
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
                  backgroundColor: ['#4ade80', '#f87171', '#60a5fa'],
                },
              ],
            },
            options: { responsive: true, plugins: { legend: { display: false } } },
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
                  backgroundColor: ['#34d399', '#ef4444', '#3b82f6'],
                },
              ],
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
      { titulo: 'Eventos', valor: eventos.value.length, color: 'text-indigo-500' },
      { titulo: 'Asistencias', valor: presentes.value, color: 'text-green-500' },
      { titulo: 'Ausencias', valor: ausentes.value, color: 'text-red-500' },
      { titulo: 'Ingresos', valor: ingresos.value, color: 'text-blue-500' }, // 👈 agregado
    ])

    const generarEventosDummy = () => {
      const tipos = ['Conferencia', 'Taller', 'Recorrido', 'Evento']
      const nombres = [
        'Presentacio de proyectos finales',
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
        eventos.value = res.data.length ? res.data : generarEventosDummy() // 👈 si no hay datos, carga dummy
      } catch (err) {
        console.error('Error cargando eventos:', err)
        eventos.value = generarEventosDummy() // 👈 fallback en error
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
        ingresos.value = historial.value.length // 👈 cada registro cuenta como ingreso

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
