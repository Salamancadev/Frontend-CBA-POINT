<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center justify-center p-6 text-white">
    <!-- Botón de volver -->
    <div class="w-full max-w-3xl flex justify-start mb-6">
      <RouterLink
        to="/dashboard-instructor"
        class="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow hover:bg-red-700 transition"
      >
        ⬅ Volver al Inicio
      </RouterLink>
    </div>

    <!-- Contenedor principal -->
    <div
      class="bg-gray-800 w-full max-w-3xl p-8 rounded-2xl shadow-xl border border-gray-700 text-center"
    >
      <h2 class="text-2xl font-bold text-gray-100 mb-2">
        🌐 Lector Universal de QR
      </h2>
      <p class="text-gray-400 mb-6">
        Escanea cualquier código QR y serás redirigido automáticamente
      </p>

      <!-- Estadísticas -->
      <div class="grid grid-cols-3 gap-4 mb-6">
        <div class="bg-gray-700 p-3 rounded-lg">
          <p class="text-2xl font-bold text-green-400">{{ escaneosExitosos }}</p>
          <p class="text-xs text-gray-300">Escaneos</p>
        </div>
        <div class="bg-gray-700 p-3 rounded-lg">
          <p class="text-2xl font-bold text-blue-400">{{ urlsDetectadas }}</p>
          <p class="text-xs text-gray-300">URLs</p>
        </div>
        <div class="bg-gray-700 p-3 rounded-lg">
          <p class="text-2xl font-bold text-yellow-400">{{ otrosContenidos }}</p>
          <p class="text-xs text-gray-300">Otros</p>
        </div>
      </div>

      <!-- Escáner QR -->
      <div
        id="reader"
        class="w-full max-w-md mx-auto border-2 border-dashed border-gray-600 rounded-xl shadow-inner bg-gray-900 mb-4"
      ></div>

      <!-- Controles -->
      <div class="flex gap-2 justify-center mb-6">
        <button
          @click="toggleCamara"
          class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {{ escaneando ? '⏸️ Pausar' : '▶️ Reanudar' }}
        </button>
        
        <button
          @click="cambiarCamara"
          class="bg-purple-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          🔄 Cámara {{ camaraTrasera ? 'Frontal' : 'Trasera' }}
        </button>
        
        <button
          @click="reiniciarScanner"
          class="bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition"
        >
          🔁 Reiniciar
        </button>
      </div>

      <!-- Historial de escaneos -->
      <div v-if="historial.length > 0" class="mt-6">
        <h3 class="text-lg font-semibold mb-3 text-gray-300">📋 Historial de Escaneos</h3>
        <div class="max-h-40 overflow-y-auto">
          <div
            v-for="(item, index) in historial"
            :key="index"
            class="bg-gray-700 p-3 rounded-lg mb-2 text-left cursor-pointer hover:bg-gray-600 transition"
            @click="copiarTexto(item.contenido)"
          >
            <div class="flex justify-between items-start">
              <div class="flex-1">
                <p class="text-sm text-gray-300 break-all">{{ item.contenido }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ item.fecha }}</p>
              </div>
              <span class="ml-2 text-xs px-2 py-1 rounded-full" :class="item.esUrl ? 'bg-green-500' : 'bg-yellow-500'">
                {{ item.esUrl ? 'URL' : 'TEXTO' }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Mensajes -->
      <div class="mt-6">
        <div v-if="mensaje" class="p-4 bg-green-900 rounded-lg mb-4">
          <p class="font-semibold text-green-400">{{ mensaje }}</p>
          <p class="text-sm text-gray-300 mt-2">Redirigiendo en {{ contadorRedireccion }} segundos...</p>
        </div>
        
        <div v-if="error" class="p-4 bg-red-900 rounded-lg">
          <p class="font-semibold text-red-400">{{ error }}</p>
        </div>

        <!-- Preview de URL -->
        <div v-if="urlDetectada" class="p-4 bg-blue-900 rounded-lg mt-4">
          <p class="font-semibold text-blue-400">🌐 URL Detectada</p>
          <p class="text-sm text-gray-300 break-all mt-2">{{ urlDetectada }}</p>
          <div class="flex gap-2 mt-3">
            <button
              @click="redirigirInmediatamente"
              class="bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition flex-1"
            >
              🔗 Ir ahora
            </button>
            <button
              @click="cancelarRedireccion"
              class="bg-red-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-red-700 transition flex-1"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>

        <!-- Contenido no URL -->
        <div v-if="contenidoNoUrl" class="p-4 bg-yellow-900 rounded-lg mt-4">
          <p class="font-semibold text-yellow-400">📄 Contenido Detectado</p>
          <p class="text-sm text-gray-300 break-all mt-2">{{ contenidoNoUrl }}</p>
          <div class="flex gap-2 mt-3">
            <button
              @click="copiarTexto(contenidoNoUrl)"
              class="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition flex-1"
            >
              📋 Copiar
            </button>
            <button
              @click="contenidoNoUrl = ''"
              class="bg-gray-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-gray-700 transition flex-1"
            >
              Cerrar
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Html5Qrcode } from 'html5-qrcode'

export default {
  name: 'LectorQRUniversal',
  data() {
    return {
      scanner: null,
      escaneando: false,
      camaraTrasera: true,
      mensaje: '',
      error: '',
      urlDetectada: '',
      contenidoNoUrl: '',
      contadorRedireccion: 5,
      intervaloRedireccion: null,
      escaneosExitosos: 0,
      urlsDetectadas: 0,
      otrosContenidos: 0,
      historial: []
    }
  },
  mounted() {
    this.iniciarScanner()
  },
  beforeUnmount() {
    this.detenerScanner()
    this.limpiarContador()
  },
  methods: {
    async iniciarScanner() {
      try {
        this.scanner = new Html5Qrcode('reader')
        
        const config = {
          fps: 10,
          qrbox: { width: 250, height: 250 },
          aspectRatio: 1.0,
          supportedScanTypes: []
        }

        const camaraId = await this.obtenerCamaraId()
        
        await this.scanner.start(
          camaraId,
          config,
          this.onScanSuccess.bind(this),
          this.onScanFailure.bind(this)
        )
        
        this.escaneando = true
        this.error = ''
        
      } catch (err) {
        console.error('Error iniciando la cámara: ', err)
        this.error = this.obtenerMensajeErrorCamara(err)
      }
    },

    async obtenerCamaraId() {
      try {
        const dispositivos = await Html5Qrcode.getCameras()
        if (dispositivos.length === 0) {
          throw new Error('No se encontraron cámaras')
        }
        
        // Preferir cámara trasera si está disponible
        if (this.camaraTrasera) {
          const camaraTrasera = dispositivos.find(d => 
            d.label.toLowerCase().includes('back') || 
            d.label.toLowerCase().includes('rear') ||
            d.label.toLowerCase().includes('environment')
          )
          if (camaraTrasera) return camaraTrasera.id
        }
        
        // Si no hay cámara trasera o se solicita frontal, usar la primera disponible
        return dispositivos[0].id
      } catch (err) {
        console.error('Error obteniendo cámaras:', err)
        // Fallback a facingMode
        return { facingMode: this.camaraTrasera ? 'environment' : 'user' }
      }
    },

    onScanSuccess(decodedText, decodedResult) {
      console.log('QR escaneado:', decodedText)
      
      // Agregar al historial
      this.agregarAlHistorial(decodedText)
      this.escaneosExitosos++
      
      // Verificar si es una URL
      if (this.esUrlValida(decodedText)) {
        this.urlsDetectadas++
        this.procesarUrl(decodedText)
      } else {
        this.otrosContenidos++
        this.mostrarContenidoNoUrl(decodedText)
      }
    },

    onScanFailure(error) {
      // Ignorar errores normales de no encontrar QR
      if (error && !error.includes('No se encontró código QR')) {
        console.log('Error de escaneo:', error)
      }
    },

    esUrlValida(texto) {
      try {
        const url = new URL(texto)
        return ['http:', 'https:', 'tel:', 'mailto:', 'sms:'].includes(url.protocol)
      } catch {
        return false
      }
    },

    procesarUrl(url) {
      this.urlDetectada = url
      this.mensaje = '¡URL detectada! Preparando redirección...'
      
      // Iniciar contador para redirección automática
      this.iniciarContadorRedireccion()
    },

    mostrarContenidoNoUrl(contenido) {
      this.contenidoNoUrl = contenido
      this.mensaje = 'Contenido detectado (no es una URL)'
    },

    iniciarContadorRedireccion() {
      this.contadorRedireccion = 5
      this.limpiarContador()
      
      this.intervaloRedireccion = setInterval(() => {
        this.contadorRedireccion--
        
        if (this.contadorRedireccion <= 0) {
          this.redirigirInmediatamente()
        }
      }, 1000)
    },

    redirigirInmediatamente() {
      if (this.urlDetectada) {
        this.limpiarContador()
        // Abrir en nueva pestaña
        window.open(this.urlDetectada, '_blank')
        this.mensaje = '✅ Redirigiendo...'
        
        // Limpiar después de un tiempo
        setTimeout(() => {
          this.reiniciarEstado()
        }, 2000)
      }
    },

    cancelarRedireccion() {
      this.limpiarContador()
      this.reiniciarEstado()
      this.mensaje = 'Redirección cancelada'
      
      setTimeout(() => {
        this.mensaje = ''
      }, 3000)
    },

    limpiarContador() {
      if (this.intervaloRedireccion) {
        clearInterval(this.intervaloRedireccion)
        this.intervaloRedireccion = null
      }
    },

    reiniciarEstado() {
      this.urlDetectada = ''
      this.contenidoNoUrl = ''
      this.mensaje = ''
    },

    async toggleCamara() {
      if (this.escaneando) {
        await this.detenerScanner()
      } else {
        await this.iniciarScanner()
      }
    },

    async cambiarCamara() {
      this.camaraTrasera = !this.camaraTrasera
      await this.reiniciarScanner()
    },

    async detenerScanner() {
      if (this.scanner && this.escaneando) {
        try {
          await this.scanner.stop()
          this.escaneando = false
        } catch (err) {
          console.error('Error deteniendo scanner:', err)
        }
      }
    },

    async reiniciarScanner() {
      await this.detenerScanner()
      this.limpiarContador()
      this.reiniciarEstado()
      this.error = ''
      
      setTimeout(() => {
        this.iniciarScanner()
      }, 500)
    },

    agregarAlHistorial(contenido) {
      const item = {
        contenido,
        fecha: new Date().toLocaleTimeString(),
        esUrl: this.esUrlValida(contenido)
      }
      
      this.historial.unshift(item)
      
      // Mantener máximo 10 items en el historial
      if (this.historial.length > 10) {
        this.historial.pop()
      }
    },

    async copiarTexto(texto) {
      try {
        await navigator.clipboard.writeText(texto)
        this.mensaje = '✅ Texto copiado al portapapeles'
        
        setTimeout(() => {
          this.mensaje = ''
        }, 3000)
      } catch (err) {
        console.error('Error copiando texto:', err)
        this.error = 'Error al copiar texto'
      }
    },

    obtenerMensajeErrorCamara(err) {
      if (err.message.includes('Permission denied')) {
        return 'Permiso de cámara denegado. Por favor permite el acceso a la cámara.'
      } else if (err.message.includes('No cameras found')) {
        return 'No se encontraron cámaras disponibles.'
      } else {
        return 'Error al acceder a la cámara. Intenta recargar la página.'
      }
    }
  }
}
</script>

<style>
#reader {
  min-height: 300px;
  position: relative;
}

#reader video {
  border-radius: 10px;
  width: 100% !important;
}

@media (max-width: 640px) {
  #reader {
    min-height: 250px;
  }
  
  .flex.gap-2 {
    flex-direction: column;
  }
  
  .flex.gap-2 button {
    margin-bottom: 0.5rem;
  }
}
</style>