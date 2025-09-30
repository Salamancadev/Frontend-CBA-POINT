<template>
  <RouterLink
    to="/dashboard-aprendiz"
    class="bg-red-600 text-black font-semibold px-4 py-2 mt-8 rounded hover:bg-red-700"
  >
    Back
  </RouterLink>
  <div class="events-container">
    <h1 class="events-title">Eventos Actuales</h1>

    <!-- Lista de eventos -->
    <div v-if="events.length > 0" class="events-list">
      <div v-for="event in events" :key="event.id" class="event-card">
        <h2 class="event-title">{{ event.name }}</h2>
        <p class="event-date">{{ formatDate(event.date) }}</p>
        <p class="event-description">{{ event.description }}</p>
      </div>
    </div>

    <!-- Mensaje si no hay eventos -->
    <div v-else class="no-events">
      <p>No hay eventos disponibles actualmente.</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'Eventos',
  setup() {
    // Simulación de eventos
    const events = ref([
      {
        id: 1,
        name: 'Presentacio de proyectos finales',
        date: new Date('2025-10-02T07:00:00'),
        description: 'Una exposicion de diferentes proyectos de ADSO',
      },
      {
        id: 2,
        name: 'Exposiciones volumen 2',
        date: new Date('2025-10-10T14:00:00'),
        description: 'Podras ver mas exposiciones de el tegnologo de ADSO',
      },
      {
        id: 3,
        name: 'OctoberFest 🍻',
        date: new Date('2025-10-12T09:00:00'),
        description: 'Aqui no hay pero si deberian.',
      },
      {
        id: 4,
        name: 'Fiesta Helloween 🎃🦇',
        date: new Date('2025-10-29T08:00:00'),
        description: 'Disfrasate! Y se parte de nuestri equipo Sena',
      },
    ])

    // Función para formatear la fecha de los eventos
    const formatDate = (date: Date) => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }
      return date.toLocaleDateString('es-ES', options)
    }

    return {
      events,
      formatDate,
    }
  },
})
</script>

<style scoped>
.events-container {
  padding: 20px;
  background-color: #0200057a;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.events-title {
  font-size: 2rem;
  color: #05b640;
  margin-bottom: 20px;
}

.events-list {
  width: 100%;
  max-width: 800px;
}

.event-card {
  background-color: #ffffff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  transition: transform 0.2s ease-in-out;
}

.event-card:hover {
  transform: scale(1.02);
}

.event-title {
  font-size: 1.5rem;
  color: #1c8a00;
}

.event-date {
  font-size: 1rem;
  color: #7f8c8d;
  margin: 10px 0;
}

.event-description {
  font-size: 1rem;
  color: #2c3e50;
}

.no-events {
  font-size: 1.2rem;
  color: #e74c3c;
}
</style>
