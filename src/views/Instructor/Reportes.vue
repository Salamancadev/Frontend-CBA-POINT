<template>
  <RouterLink
  to="/dashboard-instructor"
  class="bg-red-600 text-black font-semibold px-4 py-2 rounded hover:bg-red-700"
>
  Back
</RouterLink>
  <div class="max-w-4xl mx-auto p-6">
    <h2 class="text-2xl font-bold mb-6 text-center">Reporte de QR Escaneados</h2>

    <!-- Botón para limpiar -->
    <div class="flex justify-between mb-4">
      <button
        @click="clearReport"
        class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
      >
        Limpiar Reporte
      </button>
      <button
        @click="exportCSV"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Exportar CSV
      </button>
    </div>

    <!-- Tabla de resultados -->
    <div v-if="scannedQrs.length > 0" class="overflow-x-auto">
      <table class="table-auto border-collapse border border-gray-400 w-full shadow rounded">
        <thead class="bg-gray-200">
          <tr>
            <th class="border border-gray-400 px-4 py-2">#</th>
            <th class="border border-gray-400 px-4 py-2">Código QR</th>
            <th class="border border-gray-400 px-4 py-2">Fecha/Hora</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in scannedQrs"
            :key="index"
            class="hover:bg-gray-100"
          >
            <td class="border border-gray-400 px-4 py-2">{{ index + 1 }}</td>
            <td class="border border-gray-400 px-4 py-2 break-words">{{ item.code }}</td>
            <td class="border border-gray-400 px-4 py-2">
              {{ formatDate(item.time) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Sin datos -->
    <div v-else class="text-gray-500 text-center mt-6">
      Aún no se han escaneado códigos QR.
    </div>
  </div>
</template>

<script>
export default {
  name: "ReporteQR",
  props: {
    // puedes pasar el código escaneado desde el componente QrScanner
    nuevoCodigo: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      scannedQrs: [] // { code: "...", time: Date }
    }
  },
  watch: {
    // cada vez que llega un nuevo código, lo agregamos al reporte
    nuevoCodigo(newVal) {
      if (newVal) {
        this.scannedQrs.push({
          code: newVal,
          time: new Date()
        })
      }
    }
  },
  methods: {
    clearReport() {
      if (confirm("¿Seguro que quieres limpiar el reporte?")) {
        this.scannedQrs = []
      }
    },
    exportCSV() {
      if (this.scannedQrs.length === 0) {
        alert("No hay datos para exportar")
        return
      }

      const header = ["#", "Código QR", "Fecha/Hora"]
      const rows = this.scannedQrs.map((item, i) => [
        i + 1,
        `"${item.code.replace(/"/g, '""')}"`, // escapamos comillas
        this.formatDate(item.time)
      ])

      const csvContent =
        [header, ...rows].map((e) => e.join(",")).join("\n")

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" })
      const url = URL.createObjectURL(blob)

      const link = document.createElement("a")
      link.href = url
      link.setAttribute("download", "reporte_qr.csv")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    },
    formatDate(date) {
      return new Date(date).toLocaleString("es-CO", {
        dateStyle: "short",
        timeStyle: "short"
      })
    }
  }
}
</script>
