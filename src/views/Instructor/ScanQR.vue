<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
    <!-- Botón de volver -->
    <div class="w-full max-w-3xl flex justify-start mb-6">
      <RouterLink
        to="/dashboard-instructor"
        class="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        ⬅ Volver
      </RouterLink>
    </div>

    <!-- Contenedor principal -->
    <div
      class="bg-gray-800 w-full max-w-3xl p-8 rounded-2xl shadow-xl border border-gray-700 text-center"
    >
      <h2 class="text-2xl font-bold text-gray-100 mb-6">
        📷 Escanear QR para registrar asistencia
      </h2>

      <!-- Escáner QR -->
      <div
        id="reader"
        class="w-full max-w-md mx-auto border-2 border-dashed border-gray-600 rounded-xl shadow-inner bg-gray-900"
      ></div>

      <!-- Mensajes -->
      <div class="mt-6">
        <p
          v-if="mensaje"
          class="font-semibold text-green-400 text-lg animate-pulse"
        >
          {{ mensaje }}
        </p>
        <p v-if="error" class="font-semibold text-red-400 text-lg">
          {{ error }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { Html5Qrcode } from 'html5-qrcode'
import axios from 'axios'

export default {
  name: 'EscanearAsistencia',
  data() {
    return {
      scanner: null,
      mensaje: '',
      error: '',
    }
  },
  mounted() {
    this.iniciarScanner()
  },
  methods: {
    async iniciarScanner() {
      this.scanner = new Html5Qrcode('reader')
      try {
        await this.scanner.start(
          { facingMode: 'environment' },
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            this.registrarAsistencia(decodedText)
          },
          () => {}
        )
      } catch (err) {
        console.error('Error iniciando la cámara: ', err)
        this.error = 'No se pudo acceder a la cámara.'
      }
    },

    async registrarAsistencia(codigoQR) {
      try {
        const token = localStorage.getItem('token')
        const response = await axios.post(
          'http://127.0.0.1:8000/api/asistencia/registrar/',
          {
            evento_id: 1, // 🔹 Puedes hacerlo dinámico
            metodo: 'qr',
            estado: 'presente',
            codigo_qr: codigoQR,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )

        this.mensaje = `✅ Asistencia registrada: ${response.data.evento.nombre}`
        this.error = ''

        this.scanner.stop().catch((e) => console.error('Error al detener escáner', e))
      } catch (err) {
        console.error(err)
        this.error = '❌ No se pudo registrar la asistencia (QR inválido o error de red)'
        this.mensaje = ''
      }
    },
  },
}
</script>

<style>
#reader {
  min-height: 320px;
}
</style>
