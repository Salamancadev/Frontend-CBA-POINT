<template>
  <div class="min-h-screen bg-gray-900 p-4 sm:p-6">
    <!-- Botón Volver -->
    <RouterLink
      to="/dashboard-aprendiz"
      class="inline-flex items-center bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] px-4 py-2 rounded-lg font-semibold transition-all duration-300 hover:scale-105 mb-6"
    >
      ← Volver al Dashboard
    </RouterLink>

    <div class="container">
      <!-- Encabezado con controles -->
      <div class="controls-header bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-4 mb-4">
        <div class="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center w-full">
          <input
            v-model="searchQuery"
            id="searchBox"
            placeholder="Buscar dirección o lugar..."
            class="search-input bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-lg px-4 py-2 focus:ring-2 focus:ring-[#7ED957] focus:border-transparent transition-all duration-300 flex-1"
          />
          <div class="flex gap-2">
            <button
              @click="buscarLugar"
              class="btn btn-search bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              🔍 Buscar
            </button>
            <button
              @click="irDestino"
              class="btn btn-destination bg-gray-700 hover:bg-gray-600 border border-gray-600 hover:border-[#24DEFF] text-[#24DEFF] font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
            >
              🎯 Ir al destino
            </button>
          </div>
        </div>

        <div class="status-container mt-3 flex flex-col sm:flex-row gap-2 text-sm">
          <span
            id="routeInfo"
            class="route-info text-[#24DEFF] font-semibold bg-gray-700 px-3 py-1 rounded-lg"
            >{{ routeInfo }}</span
          >
        </div>
      </div>

      <!-- Mapa -->
      <div
        id="map"
        class="bg-gray-800 border border-gray-700 rounded-xl shadow-lg overflow-hidden"
      ></div>
    </div>
  </div>
</template>

<script>
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

export default {
  name: 'Mapa',
  data() {
    return {
      map: null,
      userMarker: null,
      destMarker: null,
      routeLayer: null,
      destCoords: null,
      searchQuery: '',
      status: 'Ubicación no disponible',
      routeInfo: '',
    }
  },
  mounted() {
    const SENA_LAT = 4.6929141
    const SENA_LNG = -74.2162249

    // Inicializar mapa
    this.map = L.map('map').setView([SENA_LAT, SENA_LNG], 17)
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 30,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map)

    // Seguimiento geolocalización
    if ('geolocation' in navigator) {
      navigator.geolocation.watchPosition(
        (pos) => {
          const lat = pos.coords.latitude
          const lng = pos.coords.longitude
          this.status = `Ubicación: ${lat.toFixed(5)}, ${lng.toFixed(5)}`
          if (!this.userMarker) {
            this.userMarker = L.marker([lat, lng]).addTo(this.map).bindPopup('Tú estás aquí')
          } else {
            this.userMarker.setLatLng([lat, lng])
          }
        },
        (err) => {
          this.status = 'Error geolocalización: ' + err.message
        },
        { enableHighAccuracy: true, maximumAge: 10000 },
      )
    }

    // Polígono de zona
    const zonaCoords = [
      [4.696285, -74.21715],
      [4.692722, -74.221821],
      [4.688678, -74.218051],
      [4.692324, -74.21455],
      [4.696692, -74.212033],
    ]
    L.polygon(zonaCoords, {
      color: '#7ED957',
      fillColor: '#7ED957',
      fillOpacity: 0.2,
      weight: 2,
    })
      .addTo(this.map)
      .bindPopup('Centro de Biotecnologia Agropecuaria Sena')

    // Marcadores
    const puntos = [
      { nombre: 'CBA Administracion', lat: 4.695753, lng: -74.215855 },
      { nombre: 'CBA Auditorio', lat: 4.695316, lng: -74.21607 },
      { nombre: 'CBA Gastronomia y Cafeteria', lat: 4.695594, lng: -74.216431 },
      { nombre: 'CBA Comedor', lat: 4.695391, lng: -74.216613 },
      { nombre: 'CBA Sala Instructores', lat: 4.695173, lng: -74.216875 },
      { nombre: 'CBA Sofia Plus y Biblioteca', lat: 4.695629, lng: -74.217025 },
      { nombre: 'CBA Cancha de micro', lat: 4.695098, lng: -74.215442 },
      { nombre: 'CBA Maquinaria Agricola', lat: 4.694539, lng: -74.214936 },
      { nombre: 'CBA Cerveceria', lat: 4.693959, lng: -74.217998 },
      { nombre: 'CBA Electricidad', lat: 4.693597, lng: -74.218539 },
    ]

    const bloques = [
      { nombre: 'Sena Mosquera CBA Bloque A ', lat: 4.695134, lng: -74.216396 },
      { nombre: 'Sena Mosquera CBA Bloque B', lat: 4.695013, lng: -74.21654 },
      { nombre: 'Sena Mosquera CBA Bloque C', lat: 4.694757, lng: -74.21672 },
      { nombre: 'Sena Mosquera CBA Bloque D', lat: 4.695206, lng: -74.217199 },
      { nombre: 'Sena Mosquera CBA Bloque Cunicultura', lat: 4.693664, lng: -74.218919 },
      { nombre: 'Sena Mosquera CBA Bloque I', lat: 4.693242, lng: -74.219064 },
      { nombre: 'Sena Mosquera CBA Bloque Caprinos', lat: 4.693258, lng: -74.220471 },
      { nombre: 'Sena Mosquera CBA Bloque Porsicultura', lat: 4.692939, lng: -74.220107 },
      { nombre: 'Sena Mosquera CBA Bloque H Ganaderia', lat: 4.691532, lng: -74.219067 },
      { nombre: 'Sena Mosquera CBA Bloque G', lat: 4.694306, lng: -74.214459 },
    ]

    const internado = [
      { nombre: 'Sena Mosquera CBA Internado 1', lat: 4.694902, lng: -74.217449 },
      { nombre: 'Sena Mosquera CBA Internado 2', lat: 4.694672, lng: -74.217108 },
    ]

    const redIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    const yellowIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-yellow.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    const greenIcon = new L.Icon({
      iconUrl:
        'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
      shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      shadowSize: [41, 41],
    })

    puntos.forEach((p) =>
      L.marker([p.lat, p.lng], { icon: redIcon }).addTo(this.map).bindPopup(p.nombre),
    )
    bloques.forEach((p) =>
      L.marker([p.lat, p.lng], { icon: yellowIcon }).addTo(this.map).bindPopup(p.nombre),
    )
    internado.forEach((p) =>
      L.marker([p.lat, p.lng], { icon: greenIcon }).addTo(this.map).bindPopup(p.nombre),
    )
  },
  methods: {
    async buscarLugar() {
      if (!this.searchQuery) return
      const resp = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(this.searchQuery)}`,
        { headers: { 'User-Agent': 'MiProyectoDjango/1.0' } },
      )
      const results = await resp.json()
      if (!results.length) {
        alert('No se encontró el lugar')
        return
      }
      const best = results[0]
      this.destCoords = [parseFloat(best.lat), parseFloat(best.lon)]
      if (this.destMarker) this.map.removeLayer(this.destMarker)
      this.destMarker = L.marker(this.destCoords)
        .addTo(this.map)
        .bindPopup(best.display_name)
        .openPopup()
      this.map.setView(this.destCoords, 15)
    },
    irDestino() {
      if (!this.destCoords) {
        alert('Primero busca y selecciona un destino')
        return
      }
      const from = this.userMarker
        ? this.userMarker.getLatLng()
        : { lat: 4.6929141, lng: -74.2162249 }
      this.drawRoute(from.lat, from.lng, this.destCoords[0], this.destCoords[1])
    },
    async drawRoute(fromLat, fromLng, toLat, toLng) {
      const url = `https://router.project-osrm.org/route/v1/driving/${fromLng},${fromLat};${toLng},${toLat}?overview=full&geometries=geojson`
      const resp = await fetch(url)
      const data = await resp.json()
      if (data.code !== 'Ok') {
        alert('No se pudo calcular la ruta')
        return
      }

      const route = data.routes[0].geometry
      const distance = (data.routes[0].distance / 1000).toFixed(2)
      const duration = Math.round(data.routes[0].duration / 60)

      if (this.routeLayer) this.map.removeLayer(this.routeLayer)

      this.routeLayer = L.geoJSON(route, {
        style: {
          color: '#7ED957',
          weight: 6,
          opacity: 0.8,
        },
      }).addTo(this.map)
      this.map.fitBounds(this.routeLayer.getBounds(), { padding: [50, 50] })

      this.routeInfo = `Distancia: ${distance} km — Tiempo estimado: ${duration} min`
    },
  },
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: calc(100vh - 100px);
}

.controls-header {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.search-input {
  flex: 1;
  min-width: 200px;
  padding: 12px;
  border-radius: 8px;
  font-size: 16px;
}

.btn {
  padding: 12px 16px;
  font-size: 15px;
  border-radius: 8px;
  cursor: pointer;
  border: none;
  transition: all 0.3s ease;
  font-weight: 600;
}

#map {
  flex: 1;
  height: calc(100vh - 200px);
  width: 100%;
  border-radius: 12px;
}

.status-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  font-size: 14px;
}

/* Responsive */
@media (max-width: 768px) {
  .controls-header {
    flex-direction: column;
    align-items: stretch;
  }

  #map {
    height: 60vh;
  }

  .search-input {
    min-width: unset;
  }
}

@media (max-width: 640px) {
  .status-container {
    flex-direction: column;
  }
}
</style>
