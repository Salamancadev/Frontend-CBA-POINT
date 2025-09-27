<template>
  <div class="min-h-screen py-8 px-2 sm:px-8" style="background-color: #212529; color: #f8f9fa;">
    <div class="tour-header text-center mb-10">
      <h1 class="text-4xl font-extrabold mb-2 drop-shadow" style="color: #7ED957;">Recorrido Virtual CBA</h1>
      <p class="text-lg mb-6" style="color: #7ED957;">Explora el Centro de Biotecnología Agropecuaria</p>
    </div>

  <div class="tour-content grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
      <div class="map-container h-[400px] lg:h-[600px]">
        <div class="rounded-2xl shadow-lg h-full flex flex-col" style="background-color: #212529; border: 2px solid #7ED957;">
          <div class="map-header flex justify-between items-center p-6 border-b border-[#7ED957]">
            <h3 class="text-2xl font-bold" style="color: #7ED957;">Mapa Interactivo</h3>
            <div class="map-controls flex gap-2">
              <button @click="centerMap" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #7ED957; color: #212529;">📍 Centrar</button>
              <button @click="toggleSatellite" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #212529; color: #7ED957; border: 1px solid #7ED957;">🛰️ Satélite</button>
            </div>
          </div>
          
          <div ref="mapContainer" class="map-display flex-1 relative overflow-hidden">
            <div class="mock-map w-full h-full relative">
              <div class="map-background absolute inset-0" style="background: linear-gradient(135deg, #212529 0%, #212529 100%);"></div>
              <div v-for="location in campusLocations" :key="location.id"
                class="map-marker absolute cursor-pointer transition-all duration-200"
                :style="{ left: location.position.x + '%', top: location.position.y + '%', zIndex: selectedLocation?.id === location.id ? 2 : 1 }"
                @click="selectLocation(location)"
                :class="{ 'scale-125': selectedLocation?.id === location.id }"
              >
                <div class="marker-icon w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg border-2" :style="selectedLocation?.id === location.id ? 'background-color: #7ED957; color: #212529; border-color: #7ED957;' : 'background-color: #212529; color: #7ED957; border-color: #7ED957;'">{{ location.icon }}</div>
                <div class="marker-label mt-1 px-2 py-1 rounded text-xs font-semibold" style="background-color: #7ED957; color: #212529;">{{ location.nombre }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="tour-sidebar rounded-2xl shadow-lg p-6 h-[400px] lg:h-[600px] overflow-y-auto" style="background-color: #212529; border: 2px solid #7ED957;">
        <div v-if="selectedLocation">
          <div class="info-header flex items-center gap-4 mb-6 pb-4 border-b border-[#7ED957]">
            <div class="location-icon w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-lg" style="background-color: #7ED957; color: #212529;">{{ selectedLocation.icon }}</div>
            <div>
              <h3 class="text-xl font-bold" style="color: #7ED957;">{{ selectedLocation.nombre }}</h3>
              <p class="location-type text-sm" style="color: #f8f9fa;">{{ selectedLocation.tipo }}</p>
            </div>
          </div>
          
          <div class="location-description mb-6">
            <p class="text-base" style="color: #fff;">{{ selectedLocation.descripcion }}</p>
          </div>
          
          <div class="location-details mb-6">
            <div class="detail-item flex justify-between py-2 border-b border-[#7ED957] text-sm" style="color: #7ED957;">
              <span>Capacidad:</span> <span style="color: #fff;">{{ selectedLocation.capacidad }}</span>
            </div>
            <div class="detail-item flex justify-between py-2 border-b border-[#7ED957] text-sm" style="color: #7ED957;">
              <span>Horario:</span> <span style="color: #fff;">{{ selectedLocation.horario }}</span>
            </div>
            <div class="detail-item flex justify-between py-2 border-b border-[#7ED957] text-sm" style="color: #7ED957;">
              <span>Acceso:</span> <span style="color: #fff;">{{ selectedLocation.acceso }}</span>
            </div>
          </div>
          
          <div class="location-actions flex flex-col gap-4 mt-auto">
            <button @click="navigateToLocation" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #7ED957; color: #212529;">🧭 Cómo llegar</button>
            <button @click="checkInLocation" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #212529; color: #7ED957; border: 1px solid #7ED957;">📍 Check-in aquí</button>
          </div>
        </div>

        <div v-else>
          <h3 class="text-xl font-bold mb-6" style="color: #7ED957;">Puntos de Interés</h3>
          <div class="locations-grid flex flex-col gap-4">
            <div v-for="location in campusLocations" :key="location.id" class="location-card flex items-center gap-4 p-4 rounded-lg cursor-pointer transition-all duration-200" style="background-color: #212529; border: 1px solid #7ED957;" @click="selectLocation(location)">
              <div class="card-icon w-10 h-10 rounded-full flex items-center justify-center text-xl font-bold shadow-lg" style="background-color: #7ED957; color: #212529;">{{ location.icon }}</div>
              <div class="card-content">
                <h4 class="font-bold" style="color: #7ED957;">{{ location.nombre }}</h4>
                <p class="text-sm" style="color: #fff;">{{ location.tipo }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation Modal -->
    <div v-if="showNavigationModal" class="fixed inset-0 bg-black/40 flex items-center justify-center z-50" @click="closeNavigationModal">
      <div class="rounded-2xl shadow-lg p-8 w-full max-w-md relative" style="background-color: #212529; border: 2px solid #7ED957;" @click.stop>
        <h3 class="text-xl font-bold mb-6 text-center" style="color: #7ED957;">Navegación a {{ selectedLocation?.nombre }}</h3>
        <div class="navigation-info mb-6">
          <div class="route-step flex gap-4 mb-4 p-4 rounded-lg" v-for="(step, index) in navigationSteps" :key="index" style="background-color: #212529; border: 1px solid #7ED957;">
            <div class="step-number w-8 h-8 rounded-full flex items-center justify-center font-bold" style="background-color: #7ED957; color: #212529;">{{ index + 1 }}</div>
            <div class="step-content">
              <p class="text-base" style="color: #fff;">{{ step.instruction }}</p>
              <small style="color: #7ED957;">{{ step.distance }}</small>
            </div>
          </div>
        </div>
        <div class="modal-actions flex gap-4 justify-end">
          <button @click="closeNavigationModal" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #212529; color: #7ED957; border: 1px solid #7ED957;">Cerrar</button>
          <button @click="startNavigation" class="px-4 py-2 rounded-lg font-semibold shadow" style="background-color: #7ED957; color: #212529;">Iniciar Navegación</button>
        </div>
      </div>
    </div>

    <!-- Tour Statistics -->
    <div class="tour-stats mt-10 rounded-2xl shadow-lg p-8" style="background-color: #212529; border: 2px solid #7ED957;">
      <div class="stats-card grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="stat-item flex items-center gap-4 text-center">
          <div class="stat-icon text-3xl" style="color: #7ED957;">🏢</div>
          <div class="stat-content">
            <h4 class="font-bold text-2xl" style="color: #7ED957;">{{ campusLocations.length }}</h4>
            <p class="text-sm" style="color: #fff;">Ubicaciones</p>
          </div>
        </div>
        <div class="stat-item flex items-center gap-4 text-center">
          <div class="stat-icon text-3xl" style="color: #7ED957;">👥</div>
          <div class="stat-content">
            <h4 class="font-bold text-2xl" style="color: #7ED957;">{{ visitedLocations }}</h4>
            <p class="text-sm" style="color: #fff;">Visitadas</p>
          </div>
        </div>
        <div class="stat-item flex items-center gap-4 text-center">
          <div class="stat-icon text-3xl" style="color: #7ED957;">🎯</div>
          <div class="stat-content">
            <h4 class="font-bold text-2xl" style="color: #7ED957;">{{ Math.round((visitedLocations / campusLocations.length) * 100) }}%</h4>
            <p class="text-sm" style="color: #fff;">Progreso</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

interface CampusLocation {
  id: string
  nombre: string
  descripcion: string
  tipo: string
  icon: string
  position: { x: number; y: number }
  capacidad: string
  horario: string
  acceso: string
  visited?: boolean
}

const mapContainer = ref<HTMLElement | null>(null)
const selectedLocation = ref<CampusLocation | null>(null)
const showNavigationModal = ref(false)
const visitedLocations = ref(3)

const campusLocations = ref<CampusLocation[]>([
  {
    id: '1',
    nombre: 'Laboratorio de Biotecnología',
    descripcion: 'Laboratorio principal equipado con tecnología de punta para investigación en biotecnología agropecuaria.',
    tipo: 'Laboratorio',
    icon: '🧪',
    position: { x: 25, y: 30 },
    capacidad: '30 estudiantes',
    horario: '6:00 AM - 10:00 PM',
    acceso: 'Estudiantes y docentes'
  },
  {
    id: '2',
    nombre: 'Auditorio Principal',
    descripcion: 'Espacio para conferencias, eventos académicos y presentaciones institucionales.',
    tipo: 'Auditorio',
    icon: '🎭',
    position: { x: 60, y: 20 },
    capacidad: '200 personas',
    horario: '7:00 AM - 9:00 PM',
    acceso: 'Comunidad académica'
  },
  {
    id: '3',
    nombre: 'Biblioteca',
    descripción: 'Centro de recursos bibliográficos y digitales especializados en biotecnología.',
    tipo: 'Biblioteca',
    icon: '📚',
    position: { x: 40, y: 50 },
    capacidad: '80 personas',
    horario: '6:00 AM - 8:00 PM',
    acceso: 'Estudiantes y docentes'
  },
  {
    id: '4',
    nombre: 'Cafetería',
    descripcion: 'Espacio de alimentación y descanso para la comunidad académica.',
    tipo: 'Cafetería',
    icon: '🍽️',
    position: { x: 70, y: 60 },
    capacidad: '120 personas',
    horario: '6:00 AM - 6:00 PM',
    acceso: 'Comunidad académica'
  },
  {
    id: '5',
    nombre: 'Invernadero',
    descripcion: 'Instalación para cultivos controlados y experimentos agrícolas.',
    tipo: 'Invernadero',
    icon: '🌱',
    position: { x: 20, y: 70 },
    capacidad: '15 estudiantes',
    horario: '6:00 AM - 5:00 PM',
    acceso: 'Estudiantes de agronomía'
  },
  {
    id: '6',
    nombre: 'Oficinas Administrativas',
    descripcion: 'Sede administrativa del centro con oficinas de coordinación y dirección.',
    tipo: 'Oficinas',
    icon: '🏢',
    position: { x: 80, y: 35 },
    capacidad: '20 funcionarios',
    horario: '7:00 AM - 5:00 PM',
    acceso: 'Personal autorizado'
  }
])

const navigationSteps = ref([
  {
    instruction: 'Salir del edificio actual y dirigirse hacia el norte',
    distance: '50 metros'
  },
  {
    instruction: 'Tomar el sendero principal hacia la derecha',
    distance: '100 metros'
  },
  {
    instruction: 'Continuar hasta llegar al edificio de destino',
    distance: '75 metros'
  }
])

onMounted(() => {
  // Initialize map or any other setup
})

const selectLocation = (location: CampusLocation) => {
  selectedLocation.value = location
}

const centerMap = () => {
  // Center map logic
  console.log('Centering map')
}

const toggleSatellite = () => {
  // Toggle satellite view
  console.log('Toggling satellite view')
}

const navigateToLocation = () => {
  showNavigationModal.value = true
}

const checkInLocation = () => {
  if (selectedLocation.value) {
    // Simulate check-in
    alert(`Check-in realizado en: ${selectedLocation.value.nombre}`)
    if (!selectedLocation.value.visited) {
      selectedLocation.value.visited = true
      visitedLocations.value++
    }
  }
}

const closeNavigationModal = () => {
  showNavigationModal.value = false
}

const startNavigation = () => {
  // Start GPS navigation
  alert('Navegación iniciada - Sigue las indicaciones en tu dispositivo')
  closeNavigationModal()
}
</script>

<style scoped>
.campus-tour {
  max-width: 1400px;
  margin: 0 auto;
}

.tour-header {
  text-align: center;
  margin-bottom: 2rem;
}

.tour-header h1 {
  color: white;
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.tour-header p {
  color: rgba(255, 255, 255, 0.8);
  font-size: 1.1rem;
}

.tour-content {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;
}

.map-container {
  height: 600px;
}

.map-card {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  height: 100%;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.map-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e1e8ed;
}

.map-header h3 {
  color: #2c3e50;
  margin: 0;
}

.map-controls {
  display: flex;
  gap: 0.5rem;
}

.control-btn {
  background: #667eea;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: background 0.3s ease;
}

.control-btn:hover {
  background: #5a67d8;
}

.map-display {
  flex: 1;
  position: relative;
  overflow: hidden;
}

.mock-map {
  width: 100%;
  height: 100%;
  position: relative;
}

.map-background {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #a8e6cf 0%, #dcedc8 50%, #f8bbd9 100%);
  position: relative;
}

.map-background::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(circle at 20% 30%, rgba(76, 175, 80, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 80% 70%, rgba(33, 150, 243, 0.3) 0%, transparent 50%),
    radial-gradient(circle at 60% 20%, rgba(255, 193, 7, 0.3) 0%, transparent 50%);
}

.map-marker {
  position: absolute;
  transform: translate(-50%, -50%);
  cursor: pointer;
  transition: all 0.3s ease;
}

.map-marker:hover,
.map-marker.active {
  transform: translate(-50%, -50%) scale(1.2);
}

.marker-icon {
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border: 3px solid #667eea;
}

.marker-label {
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  text-align: center;
  margin-top: 0.5rem;
  white-space: nowrap;
}

.tour-sidebar {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  height: 600px;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.location-info {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.info-header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e1e8ed;
}

.location-icon {
  width: 60px;
  height: 60px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
}

.info-header h3 {
  color: #2c3e50;
  margin: 0;
  font-size: 1.3rem;
}

.location-type {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

.location-description {
  margin-bottom: 1.5rem;
}

.location-description p {
  color: #2c3e50;
  line-height: 1.6;
}

.location-details {
  margin-bottom: 2rem;
}

.detail-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  border-bottom: 1px solid #f8f9fa;
  color: #2c3e50;
  font-size: 0.9rem;
}

.location-actions {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.navigate-btn,
.checkin-btn {
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.navigate-btn {
  background: #3498db;
  color: white;
}

.checkin-btn {
  background: #2ecc71;
  color: white;
}

.navigate-btn:hover,
.checkin-btn:hover {
  transform: translateY(-2px);
}

.locations-list h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}

.locations-grid {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.location-card {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background: rgba(102, 126, 234, 0.05);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.location-card:hover {
  background: rgba(102, 126, 234, 0.1);
  transform: translateX(5px);
}

.card-icon {
  width: 40px;
  height: 40px;
  background: #667eea;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
}

.card-content h4 {
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
  font-size: 1rem;
}

.card-content p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.8rem;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 15px;
  padding: 2rem;
  width: 90%;
  max-width: 500px;
  max-height: 80vh;
  overflow-y: auto;
}

.modal-content h3 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
  text-align: center;
}

.navigation-info {
  margin-bottom: 2rem;
}

.route-step {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 10px;
}

.step-number {
  width: 30px;
  height: 30px;
  background: #667eea;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content p {
  color: #2c3e50;
  margin: 0 0 0.25rem 0;
}

.step-content small {
  color: #7f8c8d;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  justify-content: flex-end;
}

.close-btn,
.start-nav-btn {
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.close-btn {
  background: #6c757d;
  color: white;
}

.start-nav-btn {
  background: #28a745;
  color: white;
}

.tour-stats {
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  padding: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.stats-card {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 2rem;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  text-align: center;
}

.stat-icon {
  font-size: 2.5rem;
}

.stat-content h4 {
  color: #667eea;
  font-size: 2rem;
  font-weight: 700;
  margin: 0;
}

.stat-content p {
  color: #7f8c8d;
  margin: 0;
  font-size: 0.9rem;
}

@media (max-width: 1024px) {
  .tour-content {
    grid-template-columns: 1fr;
  }
  
  .map-container {
    height: 400px;
  }
  
  .tour-sidebar {
    height: auto;
  }
}

@media (max-width: 768px) {
  .map-controls {
    flex-direction: column;
  }
  
  .control-btn {
    font-size: 0.8rem;
    padding: 0.4rem 0.8rem;
  }
  
  .stats-card {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}
</style>
