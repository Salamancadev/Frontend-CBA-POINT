<template>
  <!-- Botón volver -->
  <button
    @click="$router.back()"
    class="mb-6 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
  >
    ← Volver al menú
  </button>
  <div class="min-h-screen bg-gray-900 py-10 px-4 sm:px-6">
    <div class="max-w-6xl mx-auto">
      <!-- 🔹 Título -->
      <h2 class="text-3xl font-bold mb-8 text-center text-[#7ED957]">📊 Reportes de Asistencia</h2>

      <!-- 🔹 Gestión de Eventos -->
      <div class="bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold mb-4 text-white">Gestión de Eventos</h3>
        <div class="flex flex-col sm:flex-row gap-4">
          <input
            v-model="nuevoEvento"
            placeholder="Nombre del evento"
            class="flex-1 bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
          />
          <button
            @click="crearEvento"
            class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            ➕ Crear Evento
          </button>
        </div>
        <ul class="mt-4 space-y-2" v-if="eventos.length">
          <li
            v-for="ev in eventos"
            :key="ev.id"
            class="bg-gray-700 border border-gray-600 text-white px-4 py-2 rounded-lg"
          >
            {{ ev.nombre }}
          </li>
        </ul>
        <p v-else class="text-gray-400 mt-4 text-center">⚠ No hay eventos creados.</p>
      </div>

      <!-- 🔹 Filtros -->
      <div class="bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold mb-4 text-white">Filtros de Búsqueda</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Evento</label>
            <select
              v-model="filtro.evento"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            >
              <option value="" class="bg-gray-700">Todos</option>
              <option v-for="ev in eventos" :key="ev.id" :value="ev.nombre" class="bg-gray-700">
                {{ ev.nombre }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Aprendiz</label>
            <input
              v-model="filtro.aprendiz"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              placeholder="Buscar aprendiz"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha Desde</label>
            <input
              type="date"
              v-model="filtro.desde"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha Hasta</label>
            <input
              type="date"
              v-model="filtro.hasta"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="limpiarFiltros"
            class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#24DEFF] text-[#24DEFF] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            ♻ Limpiar Filtros
          </button>
        </div>
      </div>

      <!-- 🔹 Formulario para registrar asistencia -->
      <div class="bg-gray-800 border border-gray-700 shadow-lg rounded-xl p-6 mb-8">
        <h3 class="text-lg font-semibold mb-4 text-white">Nuevo Registro</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Aprendiz</label>
            <input
              v-model="nuevo.aprendiz"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg placeholder-gray-400 focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
              placeholder="Nombre aprendiz"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Evento</label>
            <select
              v-model="nuevo.evento"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            >
              <option disabled value="" class="bg-gray-700">Selecciona un evento</option>
              <option v-for="ev in eventos" :key="ev.id" :value="ev.nombre" class="bg-gray-700">
                {{ ev.nombre }}
              </option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Estado</label>
            <select
              v-model="nuevo.estado"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            >
              <option value="presente" class="bg-gray-700">Presente</option>
              <option value="ausente" class="bg-gray-700">Ausente</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-300 mb-2">Fecha</label>
            <input
              type="date"
              v-model="nuevo.fecha"
              class="w-full bg-gray-700 border border-gray-600 text-white p-3 rounded-lg focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
        <div class="flex justify-end mt-6">
          <button
            @click="crearRegistro"
            class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105"
          >
            ➕ Agregar Registro
          </button>
        </div>
      </div>

      <!-- 🔹 Tabla de reportes -->
      <div
        v-if="!filtrados.length"
        class="text-gray-400 text-center py-8 bg-gray-800 border border-gray-700 rounded-xl"
      >
        ⚠ No hay registros para mostrar.
      </div>

      <div
        v-else
        class="bg-gray-800 border border-gray-700 p-6 rounded-xl shadow-lg overflow-x-auto"
      >
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-700 text-left">
              <th class="p-4 border border-gray-600 text-[#7ED957] font-semibold">#</th>
              <th class="p-4 border border-gray-600 text-[#7ED957] font-semibold">Aprendiz</th>
              <th class="p-4 border border-gray-600 text-[#7ED957] font-semibold">Evento</th>
              <th class="p-4 border border-gray-600 text-[#7ED957] font-semibold">Estado</th>
              <th class="p-4 border border-gray-600 text-[#7ED957] font-semibold">Fecha</th>
              <th class="p-4 border border-gray-600 text-[#7ED957] font-semibold text-center">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(r, index) in filtrados"
              :key="r.id"
              class="hover:bg-gray-750 transition-colors duration-200"
            >
              <td class="p-4 border border-gray-600 text-white font-medium">{{ index + 1 }}</td>
              <td class="p-4 border border-gray-600">
                <input
                  v-model="r.aprendiz"
                  class="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
                />
              </td>
              <td class="p-4 border border-gray-600">
                <select
                  v-model="r.evento"
                  class="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
                >
                  <option v-for="ev in eventos" :key="ev.id" :value="ev.nombre" class="bg-gray-700">
                    {{ ev.nombre }}
                  </option>
                </select>
              </td>
              <td class="p-4 border border-gray-600">
                <select
                  v-model="r.estado"
                  class="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
                >
                  <option value="presente" class="bg-gray-700">Presente</option>
                  <option value="ausente" class="bg-gray-700">Ausente</option>
                </select>
              </td>
              <td class="p-4 border border-gray-600">
                <input
                  type="date"
                  v-model="r.fecha"
                  class="w-full bg-gray-700 border border-gray-600 text-white px-3 py-2 rounded focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300"
                />
              </td>
              <td class="p-4 border border-gray-600 text-center space-x-2">
                <button
                  @click="guardarRegistro(r)"
                  class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-3 py-2 rounded transition-all duration-300 hover:scale-105"
                >
                  💾 Guardar
                </button>
                <button
                  @click="eliminarRegistro(r.id)"
                  class="bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-red-500 text-red-400 hover:text-red-300 font-semibold px-3 py-2 rounded transition-all duration-300 hover:scale-105"
                >
                  🗑 Eliminar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportesInstructor',
  data() {
    return {
      // Eventos arranca vacío ✅
      eventos: [],
      nuevoEvento: '',

      // Registros arranca vacío ✅
      reportes: [],

      // Nuevo registro
      nuevo: { aprendiz: '', evento: '', estado: 'presente', fecha: '' },

      // Filtros
      filtro: { evento: '', aprendiz: '', desde: '', hasta: '' },
    }
  },
  computed: {
    filtrados() {
      return this.reportes.filter((r) => {
        const porEvento = !this.filtro.evento || r.evento === this.filtro.evento
        const porAprendiz =
          !this.filtro.aprendiz ||
          r.aprendiz.toLowerCase().includes(this.filtro.aprendiz.toLowerCase())
        const porFechaDesde = !this.filtro.desde || r.fecha >= this.filtro.desde
        const porFechaHasta = !this.filtro.hasta || r.fecha <= this.filtro.hasta
        return porEvento && porAprendiz && porFechaDesde && porFechaHasta
      })
    },
  },
  methods: {
    crearEvento() {
      if (!this.nuevoEvento.trim()) return
      this.eventos.push({ id: Date.now(), nombre: this.nuevoEvento })
      this.nuevoEvento = ''
    },
    crearRegistro() {
      if (!this.nuevo.aprendiz || !this.nuevo.evento || !this.nuevo.fecha) {
        alert('⚠ Debes completar todos los campos')
        return
      }
      this.reportes.push({ id: Date.now(), ...this.nuevo })
      this.nuevo = { aprendiz: '', evento: '', estado: 'presente', fecha: '' }
    },
    guardarRegistro(r) {
      alert(`✅ Registro de ${r.aprendiz} guardado correctamente.`)
    },
    eliminarRegistro(id) {
      this.reportes = this.reportes.filter((r) => r.id !== id)
    },
    limpiarFiltros() {
      this.filtro = { evento: '', aprendiz: '', desde: '', hasta: '' }
    },
  },
}
</script>
