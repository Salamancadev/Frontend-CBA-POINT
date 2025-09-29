<template>
  <RouterLink
    to="/dashboard-aprendiz"
    class="bg-red-600 text-black font-semibold px-4 py-2 rounded hover:bg-red-700"
  >
    Back
  </RouterLink>
  <div class="generador-qr">
    <h1>Generador de QR del Estudiante</h1>

    <div class="form-container">
      <div class="input-group">
        <label for="nombre">Nombre:</label>
        <input
          v-model="estudiante.nombre"
          type="text"
          id="nombre"
          placeholder="Ingrese el nombre"
        />
      </div>

      <div class="input-group">
        <label for="apellido">Apellido:</label>
        <input
          v-model="estudiante.apellido"
          type="text"
          id="apellido"
          placeholder="Ingrese el apellido"
        />
      </div>

      <div class="input-group">
        <label for="ficha">Ficha:</label>
        <input
          v-model="estudiante.ficha"
          type="text"
          id="ficha"
          placeholder="Ingrese la ficha"
        />
      </div>

      <div class="input-group">
        <label for="ficha">Num Documento</label>
        <input
          v-model="estudiante.documento"
          type="text"
          id="documento"
          placeholder="Ingrese su numero de"
        />
      </div>
    </div>

    <button @click="generarQR" class="btn-generar">Generar QR</button>

    <div v-if="qrData" class="qr-container">
      <h2>QR del Estudiante</h2>
      <div v-html="qrData" class="qr"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import QRCode from 'qrcode';

interface Estudiante {
  nombre: string;
  apellido: string;
  documento: string;
  ficha: string;
}

export default defineComponent({
  name: 'GeneradorQR',
  setup() {
    // Datos del estudiante
    const estudiante = ref<Estudiante>({ nombre: '', apellido: '', ficha: '', documento: '' });
    const qrData = ref<string | null>(null);

    // Función para generar el QR
    const generarQR = async () => {
      if (estudiante.value.nombre && estudiante.value.apellido && estudiante.value.ficha) {
        const datosEstudiante = `Nombre: ${estudiante.value.nombre}\nApellido: ${estudiante.value.apellido}\nFicha: ${estudiante.value.ficha}\nDocumento: ${estudiante.value.documento}`;
        //const url = "git-scm.com/downloads/win"
        try {
          // Generar el QR con los datos del estudiante
          qrData.value = await QRCode.toString(datosEstudiante, { type: 'svg' });
        } catch (error) {
          console.error('Error al generar el QR:', error);
        }
      } else {
        alert('Por favor, complete todos los campos.');
      }
    };

    return {
      estudiante,
      qrData,
      generarQR
    };
  }
});
</script>

<style scoped>
.generador-qr {
  background-color: #0200057a;
  font-family: 'Arial', sans-serif;
  color: #333;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

h1 {
  font-size: 2rem;
  color: #038b25;
  margin-bottom: 20px;
  font-weight: bold;
}

.form-container {
  width: 100%;
  max-width: 400px;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 30px;
}

.input-group {
  margin-bottom: 20px;
}

label {
  font-size: 1rem;
  color: #555;
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  color: #333;
  box-sizing: border-box;
}

input:focus {
  outline: none;
  border-color: #3498db;
}

button {
  padding: 12px 20px;
  background-color: #069932;
  color: white;
  font-size: 1.1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3dce04;
}

.qr-container {
  text-align: center;
  margin-top: 20px;
}

.qr {
  margin-top: 20px;
  max-width: 300px;
  max-height: 300px;
}

h2 {
  font-size: 1.5rem;
  color: #007e35;
  font-weight: bold;
}
</style>
