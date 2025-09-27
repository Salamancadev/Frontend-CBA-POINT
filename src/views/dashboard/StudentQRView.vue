<template>
  <div class="min-h-screen py-8 px-2 sm:px-8 text-gray-100" style="background-color: #212529;">
    <div class="qr-header mb-10">
      <h1 class="text-4xl font-extrabold mb-2 drop-shadow" style="color: #7ED957;">Mi QR de Asistencia</h1>
      <p class="text-lg mb-6" style="color: #7ED957;">Genera tu código QR personal para que el instructor registre tu asistencia</p>
    </div>

  <div class="qr-content">
      <!-- Current QR Display -->
      <div class="current-qr-section mb-8">
  <div class="rounded-2xl shadow-lg p-6 flex flex-col gap-6" style="background-color: #212529; border: 2px solid #7ED957;">
          <div class="qr-info-header flex items-center justify-between mb-4">
            <h3 class="text-2xl font-bold" style="color: #7ED957;">Tu Código QR Actual</h3>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold"
                 :style="currentQR.activo ? 'background-color: #7ED957; color: #212529;' : 'background-color: #ff4d4f; color: #fff;'">
              <span>{{ currentQR.activo ? '🟢 Activo' : '🔴 Inactivo' }}</span>
            </div>
          </div>

          <div class="qr-display-container">
            <div class="qr-visual flex flex-col md:flex-row gap-6 items-center justify-center">
              <div class="qr-code-display">
       <div class="grid grid-cols-7 gap-0.5 rounded-lg p-2 relative w-32 h-36 shadow-inner" style="background-color: #212529; border: 2px solid #7ED957;">
         <div v-for="i in 49" :key="i"
           :style="getQRPattern(i) ? 'background-color: #7ED957;' : 'background-color: #212529; border: 1px solid #7ED957;'"
           class="w-4 h-4 rounded-sm"></div>
         <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full px-2 py-1 font-bold shadow text-xs" style="background-color: #7ED957; color: #212529;">CBA</div>
                </div>
              </div>
              <div class="qr-details flex flex-col gap-2">
                <div class="student-info mb-2">
                  <h4 class="text-lg font-bold" style="color: #7ED957;">{{ user?.name || 'Estudiante' }}</h4>
                  <p class="text-sm"><span class="font-semibold" style="color: #7ED957;">Cédula:</span> {{ user?.documentNumber }}</p>
                  <p class="text-sm"><span class="font-semibold" style="color: #7ED957;">Ficha:</span> {{ user?.role }}</p>
                  <p class="text-sm"><span class="font-semibold" style="color: #7ED957;">Programa:</span> {{ user?.role || 'Biotecnología Agropecuaria' }}</p>
                </div>
                <div class="qr-metadata text-xs rounded-lg p-2" style="background-color: #212529; border: 1px solid #7ED957;">
                  <p><span class="font-semibold" style="color: #7ED957;">Código QR:</span> {{ currentQR.codigo }}</p>
                  <p><span class="font-semibold" style="color: #7ED957;">Generado:</span> {{ formatDateTime(currentQR.fechaGeneracion) }}</p>
                  <p><span class="font-semibold" style="color: #7ED957;">Válido hasta:</span> {{ formatDateTime(currentQR.fechaExpiracion) }}</p>
                  <p><span class="font-semibold" style="color: #7ED957;">Ubicación:</span> {{ currentLocation }}</p>
                </div>
              </div>
            </div>
          </div>

          <div class="qr-actions flex flex-wrap gap-3 mt-4">
            <button @click="regenerateQR" :disabled="loading"
              class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #7ED957; color: #212529;">
              <span v-if="loading">Generando...</span>
              <span v-else>🔄 Regenerar QR</span>
            </button>
            <button @click="shareQR" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #212529; color: #7ED957; border: 1px solid #7ED957;">
              📤 Compartir
            </button>
            <button @click="downloadQR" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #212529; color: #7ED957; border: 1px solid #7ED957;">
              📥 Descargar
            </button>
            <button @click="toggleQRStatus"
              :style="currentQR.activo ? 'background-color: #ff4d4f; color: #fff;' : 'background-color: #7ED957; color: #212529;'"
              class="px-4 py-2 rounded-lg font-semibold shadow transition">
              {{ currentQR.activo ? '⏸️ Desactivar' : '▶️ Activar' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Instructions for Students -->
      <div class="instructions-section mt-10">
  <h3 class="text-2xl font-bold mb-4" style="color: #7ED957;">¿Cómo funciona?</h3>
        <div class="instruction-steps grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="step">
            <div class="step-number w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl mb-2" style="background-color: #7ED957; color: #212529;">1</div>
            <div class="step-content">
              <h4 class="font-semibold" style="color: #7ED957;">Genera tu QR</h4>
              <p class="text-sm text-gray-600">Tu código QR contiene tus datos personales, fecha, hora y ubicación actual</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl mb-2" style="background-color: #7ED957; color: #212529;">2</div>
            <div class="step-content">
              <h4 class="font-semibold" style="color: #7ED957;">Muestra al Instructor</h4>
              <p class="text-sm text-gray-600">Presenta tu QR al docente para que lo escanee con su dispositivo</p>
            </div>
          </div>

          <div class="step">
            <div class="step-number w-10 h-10 flex items-center justify-center rounded-full font-bold text-xl mb-2" style="background-color: #7ED957; color: #212529;">3</div>
            <div class="step-content">
              <h4 class="font-semibold" style="color: #7ED957;">Asistencia Registrada</h4>
              <p class="text-sm text-gray-600">El instructor escanea tu QR y tu asistencia queda automáticamente registrada</p>
            </div>
          </div>
        </div>
      </div>

      <!-- QR History -->
      <div class="qr-history-section mt-10">
  <h3 class="text-2xl font-bold mb-4" style="color: #7ED957;">Historial de QR Generados</h3>
        <div class="history-list flex flex-col gap-4">
          <div v-for="qr in qrHistory" :key="qr.id" class="history-item flex items-center rounded-xl shadow p-4 gap-4" style="background-color: #212529; border: 1px solid #7ED957;">
            <div class="history-date flex flex-col items-center justify-center rounded-lg px-3 py-2" style="background-color: #7ED957;">
              <div class="date-day text-2xl font-bold" style="color: #212529;">{{ formatDay(qr.fechaGeneracion) }}</div>
              <div class="date-month text-xs font-semibold" style="color: #212529;">{{ formatMonth(qr.fechaGeneracion) }}</div>
            </div>
            <div class="history-details flex-1">
              <h4 class="font-bold" style="color: #7ED957;">QR de Asistencia</h4>
              <p class="text-sm"><span class="font-semibold" style="color: #7ED957;">Código:</span> {{ qr.codigo }}</p>
              <p class="text-sm"><span class="font-semibold" style="color: #7ED957;">Hora:</span> {{ formatTime(qr.fechaGeneracion) }}</p>
              <p class="text-sm"><span class="font-semibold" style="color: #7ED957;">Estado:</span>
                <span :style="qr.usado ? 'color: #7ED957; font-weight: bold;' : 'color: #fff;'">
                  {{ qr.usado ? 'Usado por instructor' : 'No utilizado' }}
                </span>
              </p>
              <p v-if="qr.instructor" class="text-sm"><span class="font-semibold" style="color: #7ED957;">Escaneado por:</span> {{ qr.instructor }}</p>
            </div>
            <div class="history-status flex flex-col items-center">
              <div class="status-indicator w-4 h-4 rounded-full mb-1"
                :style="qr.activo ? 'background-color: #7ED957;' : isExpired(qr.fechaExpiracion) ? 'background-color: #fff;' : 'background-color: #ff4d4f;'">
              </div>
              <span class="status-text text-xs font-semibold" style="color: #7ED957;">
                {{ getStatusText(qr) }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Live Attendance Feed -->
      <div class="live-feed-section mt-10">
  <h3 class="text-2xl font-bold mb-4" style="color: #7ED957;">Registro en Tiempo Real</h3>
        <div class="live-feed flex flex-col gap-3">
          <div v-for="registro in liveAttendance" :key="registro.id" class="feed-item flex items-center rounded-xl shadow p-3 gap-4" style="background-color: #212529; border: 1px solid #7ED957;">
            <div class="feed-icon text-2xl" style="color: #7ED957;">✅</div>
            <div class="feed-content flex-1">
              <h4 class="font-bold" style="color: #7ED957;">Asistencia Registrada</h4>
              <p class="text-sm" style="color: #fff;">{{ registro.materia }} - {{ registro.instructor }}</p>
              <span class="feed-time text-xs" style="color: #7ED957;">{{ formatTime(registro.fecha) }}</span>
            </div>
            <div class="feed-status success font-bold" style="color: #7ED957;">Confirmado</div>
          </div>
          <div v-if="liveAttendance.length === 0" class="no-activity text-center py-4" style="color: #fff;">
            <p>No hay registros de asistencia hoy</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Location Permission Modal -->
    <div v-if="showLocationModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click="closeLocationModal">
      <div class="rounded-xl shadow-lg p-8 w-full max-w-md relative" style="background-color: #212529; border: 2px solid #7ED957;" @click.stop>
        <h3 class="text-xl font-bold mb-2" style="color: #7ED957;">Permiso de Ubicación</h3>
        <p class="mb-4" style="color: #fff;">Para generar un QR más preciso, necesitamos acceso a tu ubicación actual.</p>
        <div class="flex gap-4 justify-end">
          <button @click="allowLocation" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #7ED957; color: #212529;">Permitir</button>
          <button @click="denyLocation" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #212529; color: #7ED957; border: 1px solid #7ED957;">Continuar sin ubicación</button>
        </div>
        <button @click="closeLocationModal" class="absolute top-2 right-2 text-xl" style="color: #7ED957;">×</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import type { User } from 'src/types/User'

interface StudentQR {
  id: string
  codigo: string
  fechaGeneracion: Date
  fechaExpiracion: Date
  activo: boolean
  usado: boolean
  instructor?: string
  ubicacion?: string
}

const user = ref<User | null>(null)
const loading = ref(false)
const showLocationModal = ref(false)
const currentLocation = ref('Ubicación no disponible')

const currentQR = ref<StudentQR>({
  id: '1',
  codigo: '',
  fechaGeneracion: new Date(),
  fechaExpiracion: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 horas
  activo: true,
  usado: false
})

const qrHistory = ref<StudentQR[]>([
  {
    id: '2',
    codigo: 'STU-2024-001-1234567890',
    fechaGeneracion: new Date(Date.now() - 2 * 60 * 60 * 1000),
    fechaExpiracion: new Date(Date.now() + 22 * 60 * 60 * 1000),
    activo: false,
    usado: true,
    instructor: 'Prof. María González',
    ubicacion: 'Laboratorio A'
  },
  {
    id: '3',
    codigo: 'STU-2024-002-1234567890',
    fechaGeneracion: new Date(Date.now() - 24 * 60 * 60 * 1000),
    fechaExpiracion: new Date(Date.now() - 1 * 60 * 60 * 1000),
    activo: false,
    usado: false,
    ubicacion: 'Aula 201'
  }
])

const liveAttendance = ref([
  {
    id: 1,
    materia: 'Biotecnología Aplicada',
    instructor: 'Prof. María González',
    fecha: new Date(Date.now() - 30 * 60 * 1000)
  },
  {
    id: 2,
    materia: 'Microbiología',
    instructor: 'Prof. Carlos Ruiz',
    fecha: new Date(Date.now() - 2 * 60 * 60 * 1000)
  }
])

onMounted(async () => {
  const userData = localStorage.getItem('cba_user')
  if (userData) {
    user.value = JSON.parse(userData)
    generateInitialQR()
  }

  // Request location permission
  if (navigator.geolocation) {
    showLocationModal.value = true
  }
})

const generateInitialQR = () => {
  if (user.value) {
    const timestamp = Date.now()
    currentQR.value.codigo = `STU-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${user.value.documentNumber}`
  }
}

const regenerateQR = async () => {
  loading.value = true

  try {
    // Simulate QR generation
    await new Promise(resolve => setTimeout(resolve, 1500))

    // Add current QR to history
    if (currentQR.value.codigo) {
      qrHistory.value.unshift({ ...currentQR.value })
    }

    // Generate new QR
    const timestamp = Date.now()
    currentQR.value = {
      id: Date.now().toString(),
      codigo: `STU-${new Date().getFullYear()}-${String(Math.floor(Math.random() * 1000)).padStart(3, '0')}-${user.value?.documentNumber}`,
      fechaGeneracion: new Date(),
      fechaExpiracion: new Date(Date.now() + 24 * 60 * 60 * 1000),
      activo: true,
      usado: false,
      ubicacion: currentLocation.value
    }

    alert('¡QR regenerado exitosamente!')

  } catch (error) {
    alert('Error al generar el QR')
  } finally {
    loading.value = false
  }
}

const shareQR = () => {
  if (navigator.share) {
    navigator.share({
      title: 'Mi QR de Asistencia - CbaPoint',
      text: `QR de asistencia de ${user.value?.name}`,
      url: window.location.href
    })
  } else {
    // Fallback: copy to clipboard
    const qrData = `${user.value?.name} - ${currentQR.value.codigo}`
    navigator.clipboard.writeText(qrData)
    alert('Datos del QR copiados al portapapeles')
  }
}

const downloadQR = () => {
  // Simulate QR download
  alert('Descargando QR como imagen PNG...')
}

const toggleQRStatus = () => {
  currentQR.value.activo = !currentQR.value.activo
  alert(`QR ${currentQR.value.activo ? 'activado' : 'desactivado'}`)
}

const allowLocation = () => {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      currentLocation.value = `Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
      showLocationModal.value = false
      alert('Ubicación obtenida exitosamente')
    },
    (error) => {
      currentLocation.value = 'Error al obtener ubicación'
      showLocationModal.value = false
    }
  )
}

const denyLocation = () => {
  currentLocation.value = 'Ubicación no autorizada'
  showLocationModal.value = false
}

const closeLocationModal = () => {
  showLocationModal.value = false
}

const getQRPattern = (index: number): boolean => {
  // Create a pseudo-random pattern based on user data and current time
  const seed = (user.value?.documentNumber || '123456789') + currentQR.value.codigo
  const hash = seed.split('').reduce((a, b) => {
    a = ((a << 5) - a) + b.charCodeAt(0)
    return a & a
  }, 0)
  return (hash + index) % 3 === 0
}

const isExpired = (fecha: Date): boolean => {
  return new Date() > fecha
}

const getStatusText = (qr: StudentQR): string => {
  if (qr.usado) return 'Usado'
  if (isExpired(qr.fechaExpiracion)) return 'Expirado'
  if (qr.activo) return 'Activo'
  return 'Inactivo'
}

const formatDateTime = (fecha: Date): string => {
  return fecha.toLocaleString('es-CO', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatTime = (fecha: Date): string => {
  return fecha.toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const formatDay = (fecha: Date): string => {
  return fecha.getDate().toString().padStart(2, '0')
}

const formatMonth = (fecha: Date): string => {
  const meses = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN',
                 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
  return meses[fecha.getMonth()]
}
</script>

<style scoped>
/* El diseño ahora usa Tailwind, puedes agregar detalles extra aquí si lo deseas */
</style>
