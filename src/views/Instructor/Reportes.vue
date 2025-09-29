<template>
  <div class="max-w-6xl mx-auto py-10 px-6">
    <!-- 🔹 Título -->
    <h2 class="text-3xl font-extrabold mb-8 text-center text-gray-800">
      📊 Reportes de Asistencia
    </h2>

    <!-- 🔹 Gestión de Eventos -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Gestión de Eventos</h3>
      <div class="flex space-x-4">
        <input
          v-model="nuevoEvento"
          placeholder="Nombre del evento"
          class="flex-1 p-2 border rounded-lg"
        />
        <button
          @click="crearEvento"
          class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          ➕ Crear Evento
        </button>
      </div>
      <ul class="mt-4 list-disc pl-6 text-gray-700" v-if="eventos.length">
        <li v-for="ev in eventos" :key="ev.id">{{ ev.nombre }}</li>
      </ul>
      <p v-else class="text-gray-500 mt-2">⚠ No hay eventos creados.</p>
    </div>

    <!-- 🔹 Filtros -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Filtros de Búsqueda</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Evento</label>
          <select v-model="filtro.evento" class="w-full mt-1 p-2 border rounded-lg">
            <option value="">Todos</option>
            <option v-for="ev in eventos" :key="ev.id" :value="ev.nombre">
              {{ ev.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Aprendiz</label>
          <input v-model="filtro.aprendiz" class="w-full mt-1 p-2 border rounded-lg" placeholder="Buscar aprendiz"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Fecha Desde</label>
          <input type="date" v-model="filtro.desde" class="w-full mt-1 p-2 border rounded-lg"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Fecha Hasta</label>
          <input type="date" v-model="filtro.hasta" class="w-full mt-1 p-2 border rounded-lg"/>
        </div>
      </div>
      <div class="flex justify-end mt-4 space-x-3">
        <button @click="limpiarFiltros" class="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600">
          ♻ Limpiar
        </button>
      </div>
    </div>

    <!-- 🔹 Formulario para registrar asistencia -->
    <div class="bg-white shadow-md rounded-lg p-6 mb-8">
      <h3 class="text-lg font-semibold mb-4 text-gray-700">Nuevo Registro</h3>
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-600">Aprendiz</label>
          <input v-model="nuevo.aprendiz" class="w-full mt-1 p-2 border rounded-lg" placeholder="Nombre aprendiz"/>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Evento</label>
          <select v-model="nuevo.evento" class="w-full mt-1 p-2 border rounded-lg">
            <option disabled value="">Selecciona un evento</option>
            <option v-for="ev in eventos" :key="ev.id" :value="ev.nombre">
              {{ ev.nombre }}
            </option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Estado</label>
          <select v-model="nuevo.estado" class="w-full mt-1 p-2 border rounded-lg">
            <option value="presente">Presente</option>
            <option value="ausente">Ausente</option>
          </select>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-600">Fecha</label>
          <input type="date" v-model="nuevo.fecha" class="w-full mt-1 p-2 border rounded-lg"/>
        </div>
      </div>
      <div class="flex justify-end mt-4">
        <button @click="crearRegistro" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          ➕ Agregar
        </button>
      </div>
    </div>

    <!-- 🔹 Tabla de reportes -->
    <div v-if="!filtrados.length" class="text-gray-600 text-center">
      ⚠ No hay registros.
    </div>

    <div v-else class="bg-white p-6 rounded-xl shadow-lg overflow-x-auto">
      <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-100 text-left text-gray-700">
            <th class="p-3 border">#</th>
            <th class="p-3 border">Aprendiz</th>
            <th class="p-3 border">Evento</th>
            <th class="p-3 border">Estado</th>
            <th class="p-3 border">Fecha</th>
            <th class="p-3 border">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(r, index) in filtrados" :key="r.id" class="hover:bg-gray-50">
            <td class="p-3 border">{{ index + 1 }}</td>
            <td class="p-3 border">
              <input v-model="r.aprendiz" class="w-full border rounded px-2 py-1"/>
            </td>
            <td class="p-3 border">
              <select v-model="r.evento" class="w-full border rounded px-2 py-1">
                <option v-for="ev in eventos" :key="ev.id" :value="ev.nombre">{{ ev.nombre }}</option>
              </select>
            </td>
            <td class="p-3 border">
              <select v-model="r.estado" class="w-full border rounded px-2 py-1">
                <option value="presente">Presente</option>
                <option value="ausente">Ausente</option>
              </select>
            </td>
            <td class="p-3 border">
              <input type="date" v-model="r.fecha" class="w-full border rounded px-2 py-1"/>
            </td>
            <td class="p-3 border text-center space-x-2">
              <button @click="guardarRegistro(r)" class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                💾 Guardar
              </button>
              <button @click="eliminarRegistro(r.id)" class="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                🗑 Eliminar
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ReportesInstructor",
  data() {
    return {
      // Eventos arranca vacío ✅
      eventos: [],
      nuevoEvento: "",

      // Registros arranca vacío ✅
      reportes: [],

      // Nuevo registro
      nuevo: { aprendiz: "", evento: "", estado: "presente", fecha: "" },

      // Filtros
      filtro: { evento: "", aprendiz: "", desde: "", hasta: "" }
    }
  },
  computed: {
    filtrados() {
      return this.reportes.filter(r => {
        const porEvento = !this.filtro.evento || r.evento === this.filtro.evento
        const porAprendiz = !this.filtro.aprendiz || r.aprendiz.toLowerCase().includes(this.filtro.aprendiz.toLowerCase())
        const porFechaDesde = !this.filtro.desde || r.fecha >= this.filtro.desde
        const porFechaHasta = !this.filtro.hasta || r.fecha <= this.filtro.hasta
        return porEvento && porAprendiz && porFechaDesde && porFechaHasta
      })
    }
  },
  methods: {
    crearEvento() {
      if (!this.nuevoEvento.trim()) return
      this.eventos.push({ id: Date.now(), nombre: this.nuevoEvento })
      this.nuevoEvento = ""
    },
    crearRegistro() {
      if (!this.nuevo.aprendiz || !this.nuevo.evento || !this.nuevo.fecha) {
        alert("⚠ Debes completar todos los campos")
        return
      }
      this.reportes.push({ id: Date.now(), ...this.nuevo })
      this.nuevo = { aprendiz: "", evento: "", estado: "presente", fecha: "" }
    },
    guardarRegistro(r) {
      alert(`✅ Registro de ${r.aprendiz} guardado correctamente.`)
    },
    eliminarRegistro(id) {
      this.reportes = this.reportes.filter(r => r.id !== id)
    },
    limpiarFiltros() {
      this.filtro = { evento: "", aprendiz: "", desde: "", hasta: "" }
    }
  }
}
</script>
