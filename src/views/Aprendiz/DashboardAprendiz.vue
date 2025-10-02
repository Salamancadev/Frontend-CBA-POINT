<template>
  <div class="min-h-screen bg-gray-900 text-white p-4 sm:p-6">
    <!-- Navbar / Drawer -->
    <nav class="bg-gray-900 border-b border-gray-700 p-4 shadow-xl sticky top-0 z-50 flex justify-between items-center">
      <button @click="drawerOpen = !drawerOpen" class="lg:hidden text-[#7ED957] text-2xl focus:outline-none">
        ☰
      </button>
      <h1 class="text-white font-bold text-lg md:text-xl">
        🎓 Cba<span class="text-[#7ED957]">Point</span>
      </h1>
      <ul class="hidden lg:flex space-x-6">
        <li v-for="item in menu" :key="item.path">
          <RouterLink :to="item.path" class="flex items-center text-gray-300 hover:text-[#7ED957] font-semibold space-x-2">
            <span class="text-xl">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
    </nav>

    <!-- Drawer móvil -->
    <div v-if="drawerOpen" class="fixed inset-0 bg-black bg-opacity-60 z-40 lg:hidden" @click="drawerOpen = false"></div>
    <div class="fixed top-0 left-0 w-72 h-full bg-gray-900 text-white p-6 shadow-2xl transform transition-transform duration-300 z-50 lg:hidden border-r border-gray-700"
         :class="drawerOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="flex flex-col items-center mt-4">
        <img src="https://i.pravatar.cc/100" alt="Perfil" class="rounded-full w-20 h-20 border-4 border-[#7ED957]" />
        <p class="mt-3 font-bold text-lg text-white">{{ estudianteNombre }}</p>
        <p class="text-[#7ED957] text-sm font-semibold">Aprendiz SENA</p>
      </div>
      <ul class="space-y-4 mt-10">
        <li v-for="item in menu" :key="item.path">
          <RouterLink :to="item.path" class="flex items-center space-x-3 text-lg font-semibold text-gray-300 hover:text-[#7ED957] hover:bg-gray-800 px-4 py-3 rounded-xl transition-all duration-300"
                      @click="drawerOpen = false">
            <span class="text-xl">{{ item.icon }}</span>
            <span>{{ item.label }}</span>
          </RouterLink>
        </li>
      </ul>
      <button @click="cerrarSesion" class="mt-10 w-full bg-gray-800 hover:bg-gray-700 text-[#7ED957] font-bold py-3 rounded-xl shadow-lg border border-gray-600 hover:border-[#7ED957]">
        🚪 Cerrar Sesión
      </button>
    </div>

    <!-- Header / Bienvenida -->
    <header class="bg-gray-800 border border-gray-700 text-white p-6 rounded-2xl shadow-lg mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center">
      <div>
        <h2 class="text-2xl font-bold text-white">Bienvenido {{ estudianteNombre }}</h2>
        <p v-if="eventosHoy.length" class="text-[#7ED957] font-semibold mt-2 animate-pulse">
          📢 Hoy tienes {{ eventosHoy.length }} evento(s)
        </p>
        <p v-else class="text-gray-400 font-semibold mt-2">📅 No hay eventos para hoy</p>
      </div>
      <button @click="cerrarSesion" class="mt-4 sm:mt-0 bg-gray-800 hover:bg-gray-700 text-[#7ED957] px-5 py-3 rounded-xl shadow-lg font-bold border border-gray-600 hover:border-[#7ED957]">
        🚪 Cerrar Sesión
      </button>
    </header>

    <!-- Resumen -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div v-for="(card, i) in resumen" :key="i" class="p-6 rounded-2xl shadow-lg text-center bg-gray-800 border border-gray-700 hover:border-[#7ED957] transition-all duration-300 hover:shadow-2xl hover:scale-105">
        <h3 class="text-gray-400 font-semibold mb-2">{{ card.titulo }}</h3>
        <p :class="card.color" class="text-4xl font-bold">{{ card.valor }}</p>
        <p class="text-xs text-gray-500 mt-2">Total registrado</p>
      </div>
    </div>

    <!-- Próximos Eventos -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="bg-gray-800 border border-gray-700 p-6 rounded-2xl shadow-lg col-span-3">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-[#7ED957]">📅 Próximos Eventos</h2>
          <span class="bg-[#7ED957] text-gray-900 px-3 py-1 rounded-full text-sm font-bold">{{ eventosFiltrados.length }} eventos</span>
        </div>

        <!-- Filtros -->
        <div class="flex flex-col sm:flex-row gap-3 mb-6">
          <input v-model="filtroNombre" type="text" placeholder="Buscar evento..." class="bg-gray-700 border border-gray-600 text-white p-3 rounded-xl w-full"/>
          <select v-model="filtroTipo" class="bg-gray-700 border border-gray-600 text-white p-3 rounded-xl">
            <option value="">Todos los tipos</option>
            <option v-for="tipo in tiposEventos" :key="tipo" :value="tipo">{{ tipo }}</option>
          </select>
          <button @click="ordenarEventos" class="bg-gray-700 hover:bg-gray-600 border border-gray-600 text-[#7ED957] px-6 py-3 rounded-xl font-bold">⬇️ Ordenar</button>
        </div>

        <!-- Lista eventos -->
        <div v-if="eventosFiltrados.length" class="space-y-4">
          <div v-for="evento in eventosFiltrados" :key="evento.id" class="p-5 bg-gray-700 border border-gray-600 rounded-xl shadow hover:scale-[1.02] transition-all duration-300">
            <div class="flex justify-between items-start">
              <div>
                <p class="font-bold text-[#7ED957] text-lg">{{ evento.nombre }}</p>
                <span class="inline-block bg-gray-600 text-[#24DEFF] px-2 py-1 rounded text-xs font-semibold mt-1">{{ evento.tipo }}</span>
              </div>
              <div class="text-right">
                <p class="text-sm text-gray-300 font-semibold">{{ new Date(evento.fecha_inicio).toLocaleDateString() }}</p>
                <p class="text-xs text-gray-400">{{ new Date(evento.fecha_inicio).toLocaleTimeString() }}</p>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center py-8">
          <p class="text-gray-400 text-lg">No hay eventos disponibles</p>
          <p class="text-gray-500 text-sm mt-2">Intenta con otros filtros</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import axios from 'axios'

interface Evento {
  id: number
  nombre: string
  tipo: string
  fecha_inicio: string
  fecha_fin: string
}

const estudianteNombre = ref('Estudiante')
const eventos = ref<Evento[]>([])
const filtroNombre = ref('')
const filtroTipo = ref('')
const drawerOpen = ref(false)

const menu = [
  { path: '/GenerarQR-aprendiz', label: 'Generar QR', icon: '🔗' },
  { path: '/Mapa-aprendiz', label: 'Mapa', icon: '🗺️' },
  { path: '/Scann-aprendiz', label: 'Scanear QR', icon: '📷' },
]

const eventosHoy = computed(() =>
  eventos.value.filter((e) => new Date(e.fecha_inicio).toDateString() === new Date().toDateString())
)

const tiposEventos = computed(() => [...new Set(eventos.value.map((e) => e.tipo))])

const eventosFiltrados = computed(() =>
  eventos.value.filter((e) => {
    const coincideNombre = e.nombre.toLowerCase().includes(filtroNombre.value.toLowerCase())
    const coincideTipo = filtroTipo.value ? e.tipo === filtroTipo.value : true
    return coincideNombre && coincideTipo
  })
)

const resumen = computed(() => [
  { titulo: 'Eventos', valor: eventos.value.length, color: 'text-white' },
  // Puedes agregar más métricas aquí si quieres
])

const ordenarEventos = () => {
  eventos.value.sort((a, b) => new Date(a.fecha_inicio).getTime() - new Date(b.fecha_inicio).getTime())
}

const cerrarSesion = () => {
  localStorage.removeItem('access')
  window.location.href = '/login'
}

const getEventos = async () => {
  try {
    const token = localStorage.getItem('access')
    const res = await axios.get<Evento[]>('http://127.0.0.1:8000/api/eventos/listar/', {
      headers: { Authorization: `Bearer ${token}` },
    })
    eventos.value = res.data
  } catch (err) {
    console.error('Error cargando eventos:', err)
  }
}

onMounted(() => {
  getEventos()
})
</script>
