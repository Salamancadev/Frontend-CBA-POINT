<template>
  <div class="max-w-3xl mx-auto py-8 px-4">
    <!-- Header -->
    <div class="text-center mb-8">
      <h1 class="text-4xl font-extrabold text-white bg-gradient-to-r from-blue-700 via-purple-700 to-blue-700 inline-block px-6 py-2 rounded-xl shadow-lg mb-2 animate-fade-in">Escáner QR</h1>
      <p class="text-lg text-gray-300">Registra tu asistencia escaneando el código QR</p>
    </div>

    <!-- Scanner Card -->
    <div class="mb-12">
      <div class="bg-white/90 backdrop-blur-lg rounded-2xl p-8 shadow-2xl">
        <!-- Placeholder -->
        <div v-if="!scannerActive" class="text-center py-10">
          <div class="text-6xl mb-4 animate-bounce">📱</div>
          <h3 class="text-2xl font-bold text-blue-700 mb-2">Activar Escáner</h3>
          <p class="text-gray-500 mb-6">Presiona el botón para activar la cámara y escanear códigos QR</p>
          <button
            @click="startScanner"
            class="bg-gradient-to-r from-blue-700 to-purple-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:scale-105 transition disabled:opacity-50"
            :disabled="loading"
          >
            <span v-if="loading">Iniciando...</span>
            <span v-else>Activar Cámara</span>
          </button>
        </div>

        <!-- Scanner Active -->
        <div v-else class="text-center">
          <div class="relative w-full max-w-md mx-auto mb-6 rounded-xl overflow-hidden shadow-lg">
            <video ref="videoElement" autoplay muted playsinline class="w-full h-72 object-cover rounded-xl border-4 border-blue-700"></video>
            <div class="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div class="w-40 h-40 border-4 border-blue-700 rounded-xl relative">
                <div class="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-blue-700 rounded-tl-xl"></div>
                <div class="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-blue-700 rounded-br-xl"></div>
              </div>
            </div>
          </div>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button @click="stopScanner" class="bg-red-600 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition">Detener</button>
            <button @click="manualEntry" class="bg-yellow-500 text-white font-bold px-6 py-2 rounded-lg shadow hover:scale-105 transition">Entrada Manual</button>
          </div>
        </div>

        <!-- Scan Result -->
        <div
          v-if="scanResult"
          class="flex items-center gap-4 px-6 py-4 rounded-xl mt-8"
          :class="scanResult.success ? 'bg-green-100 border border-green-300' : 'bg-red-100 border border-red-300'"
        >
          <div class="text-3xl">
            {{ scanResult.success ? '✅' : '❌' }}
          </div>
          <div>
            <h4 class="font-bold text-lg text-blue-700 mb-1">{{ scanResult.success ? 'Asistencia Registrada' : 'Error en el Escaneo' }}</h4>
            <p class="text-gray-600 mb-1">{{ scanResult.message }}</p>
            <small v-if="scanResult.success" class="text-gray-400">{{ formatTime(new Date()) }}</small>
          </div>
        </div>
      </div>
    </div>

    <!-- Manual Entry Modal -->
    <div v-if="showManualModal" class="fixed inset-0 bg-black/60 flex items-center justify-center z-50" @click="closeManualModal">
      <div class="bg-white rounded-2xl p-8 w-full max-w-md shadow-xl" @click.stop>
        <h3 class="text-2xl font-bold text-blue-700 mb-6 text-center">Entrada Manual de Código</h3>
        <form @submit.prevent="processManualCode">
          <div class="mb-6">
            <label for="manualCode" class="block text-blue-700 font-semibold mb-2">Código del Evento</label>
            <input
              id="manualCode"
              v-model="manualCode"
              type="text"
              placeholder="Ingrese el código del evento"
              required
              class="w-full px-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:border-blue-500"
            />
          </div>
          <div class="flex gap-4 justify-end">
            <button type="button" @click="closeManualModal" class="bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">Cancelar</button>
            <button type="submit" class="bg-blue-700 text-white px-6 py-2 rounded-lg font-semibold hover:scale-105 transition">Registrar</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Recent Scans -->
    <div class="bg-white/90 backdrop-blur-lg rounded-xl p-8 shadow-xl">
      <h2 class="text-2xl font-bold text-blue-700 mb-6">Escaneos Recientes</h2>
      <div class="flex flex-col gap-4">
        <div v-for="scan in recentScans" :key="scan.id" class="flex items-center gap-4 p-4 rounded-lg bg-blue-50 hover:bg-blue-100 transition">
          <div class="text-2xl w-12 text-center">{{ scan.success ? '✅' : '❌' }}</div>
          <div class="flex-1">
            <h4 class="font-bold text-blue-700 mb-1">{{ scan.eventName }}</h4>
            <p class="text-gray-600 text-sm mb-1">{{ scan.location }}</p>
            <small class="text-gray-400">{{ formatTime(scan.timestamp) }}</small>
          </div>
          <div
            class="px-3 py-1 rounded-full text-xs font-bold"
            :class="scan.success ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'"
          >
            {{ scan.success ? 'Exitoso' : 'Fallido' }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type { User } from '../types'

const videoElement = ref<HTMLVideoElement | null>(null)
const scannerActive = ref(false)
const loading = ref(false)
const scanResult = ref<{ success: boolean; message: string } | null>(null)
const showManualModal = ref(false)
const manualCode = ref('')
const user = ref<User | null>(null)

const recentScans = ref([
  {
    id: 1,
    eventName: 'Clase de Biotecnología',
    location: 'Laboratorio A - Bloque 3',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    success: true,
  },
  {
    id: 2,
    eventName: 'Conferencia de Innovación',
    location: 'Auditorio Principal',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
    success: true,
  },
  {
    id: 3,
    eventName: 'Reunión Docentes',
    location: 'Sala de Juntas',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    success: false,
  },
])

let stream: MediaStream | null = null
let scanInterval: number | null = null

onMounted(() => {
  const userData = localStorage.getItem('cba_user')
  if (userData) {
    user.value = JSON.parse(userData)
  }
})

onUnmounted(() => {
  stopScanner()
})

const startScanner = async () => {
  loading.value = true
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
    })

    if (videoElement.value) {
      videoElement.value.srcObject = stream
      scannerActive.value = true
      startScanningLoop()
    }
  } catch (error) {
    console.error('Error accessing camera:', error)
    scanResult.value = {
      success: false,
      message: 'No se pudo acceder a la cámara. Verifique los permisos.',
    }
  } finally {
    loading.value = false
  }
}

const stopScanner = () => {
  if (stream) {
    stream.getTracks().forEach((track) => track.stop())
    stream = null
  }

  if (scanInterval) {
    clearInterval(scanInterval)
    scanInterval = null
  }

  scannerActive.value = false
}

const startScanningLoop = () => {
  // Simulate QR scanning - In real implementation, use a QR library like qr-scanner
  scanInterval = window.setInterval(() => {
    // Mock QR detection logic
    if (Math.random() > 0.95) {
      // 5% chance to simulate QR detection
      const mockQRData = `EVENT_${Math.random().toString(36).substr(2, 9)}`
      processQRCode(mockQRData)
    }
  }, 500)
}

const processQRCode = async (qrData: string) => {
  try {
    // Simulate API call to register attendance
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock successful registration
    scanResult.value = {
      success: true,
      message: `Asistencia registrada para: ${qrData}`,
    }

    // Add to recent scans
    recentScans.value.unshift({
      id: Date.now(),
      eventName: 'Evento Escaneado',
      location: 'Ubicación detectada por GPS',
      timestamp: new Date(),
      success: true,
    })

    // Clear result after 3 seconds
    setTimeout(() => {
      scanResult.value = null
    }, 3000)
  } catch (error) {
    scanResult.value = {
      success: false,
      message: 'Error al registrar asistencia. Intente nuevamente.',
    }
  }
}

const manualEntry = () => {
  showManualModal.value = true
}

const closeManualModal = () => {
  showManualModal.value = false
  manualCode.value = ''
}

const processManualCode = async () => {
  if (manualCode.value.trim()) {
    await processQRCode(manualCode.value.trim())
    closeManualModal()
  }
}

const formatTime = (timestamp: Date) => {
  return timestamp.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
</script>