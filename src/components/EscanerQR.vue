<template>
  <div class="escaner-qr">
    <h1>Escanear QR del Estudiante</h1>

    <!-- Componente de cámara -->
    <qrcode-stream @decode="onDecode" @init="onInit" />

    <!-- Datos del estudiante -->
    <div v-if="datosEstudiante" class="datos-container">
      <h2>Datos del Estudiante</h2>
      <pre>{{ datosEstudiante }}</pre>

      <button @click="marcarAsistencia" class="btn-asistio">
        ✅ Asistió
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

import "vue-qrcode-reader/vue-qrcode-reader.css";

import { QrcodeStream } from "vue-qrcode-reader";

export default defineComponent({
  name: "EscanerQR",
  components: { QrcodeStream },
  setup() {
    const datosEstudiante = ref<string | null>(null);

    // Cuando escanea correctamente
    const onDecode = (decodedText: string) => {
      datosEstudiante.value = decodedText;
    };

    // Inicialización de la cámara
    const onInit = (promise: Promise<void>) => {
      promise.catch(err => {
        console.error("Error al iniciar la cámara:", err);
        alert("No se pudo acceder a la cámara.");
      });
    };

    // Acción de marcar asistencia
    const marcarAsistencia = () => {
      if (datosEstudiante.value) {
        alert("✅ Asistencia registrada para:\n" + datosEstudiante.value);
        // Aquí podrías enviar un POST a tu backend (Django) para guardar la asistencia
      }
    };

    return {
      datosEstudiante,
      onDecode,
      onInit,
      marcarAsistencia,
    };
  },
});
</script>

<style scoped>
.escaner-qr {
  background-color: #f9f9f9;
  font-family: "Arial", sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: #038b25;
  margin-bottom: 20px;
}

.datos-container {
  margin-top: 20px;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
}

pre {
  background: #f0f0f0;
  padding: 10px;
  border-radius: 8px;
  font-size: 1rem;
  white-space: pre-wrap;
}

.btn-asistio {
  margin-top: 15px;
  padding: 12px 20px;
  background-color: #069932;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn-asistio:hover {
  background-color: #3dce04;
}
</style>
