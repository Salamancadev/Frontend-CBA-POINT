<template>
  <RouterLink
    to="/dashboard-aprendiz"
    class="bg-red-600 text-black font-semibold px-4 py-2 mt-8 rounded hover:bg-red-700"
  >
    Back
  </RouterLink>

  <div class="camera-container">
    <h1>Escanear QR con la Cámara</h1>

    <!-- Contenedor de la cámara -->
    <div v-if="isCameraActive" class="camera-display">
      <video ref="videoElement" width="100%" height="auto" autoplay></video>
    </div>

    <!-- Mensaje si la cámara no está activa -->
    <div v-else class="no-camera">
      <p>Tu cámara no está disponible o no se pudo acceder.</p>
    </div>

    <!-- Mostrar los resultados del escaneo -->
    <div v-if="qrResult" class="result-container">
      <h2>Resultado del QR</h2>
      <pre>{{ qrResult }}</pre>
    </div>

    <!-- Botones para iniciar y detener la cámara -->
    <div class="controls">
      <button v-if="!isCameraActive" @click="iniciarCamara">Iniciar Cámara</button>
      <button v-if="isCameraActive" @click="detenerCamara">Detener Cámara</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount } from 'vue';
import jsQR from 'jsqr';

export default defineComponent({
  name: 'EscanearQRConCamara',
  setup() {
    // Referencia para el video de la cámara
    const videoElement = ref<HTMLVideoElement | null>(null);
    const qrResult = ref<string | null>(null);
    const isCameraActive = ref<boolean>(false);
    let stream: MediaStream | null = null;

    // Función para iniciar la cámara
    const iniciarCamara = async () => {
      try {
        const constraints = {
          video: true, // Usamos la cámara del dispositivo
        };

        // Acceder a la cámara
        stream = await navigator.mediaDevices.getUserMedia(constraints);
        if (videoElement.value) {
          videoElement.value.srcObject = stream; // Asignamos el stream al video
        }
        isCameraActive.value = true;
        escanearQR(); // Iniciar escaneo inmediatamente después de activar la cámara
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        isCameraActive.value = false;
      }
    };

    // Función para detener la cámara
    const detenerCamara = () => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop()); // Detenemos todos los tracks
      }
      isCameraActive.value = false;
    };

    // Función para escanear el QR cada vez que se actualiza el video
    const escanearQR = () => {
      if (videoElement.value && videoElement.value.readyState === videoElement.value.HAVE_ENOUGH_DATA) {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (context) {
          // Establecemos el tamaño del canvas igual al del video
          canvas.height = videoElement.value.videoHeight;
          canvas.width = videoElement.value.videoWidth;

          // Dibujamos el cuadro del video en el canvas
          context.drawImage(videoElement.value, 0, 0, canvas.width, canvas.height);

          // Extraemos la imagen del canvas
          const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
          const code = jsQR(imageData.data, canvas.width, canvas.height, {
            inversionAttempts: 'dontInvert',
          });

          // Si se detecta un código QR
          if (code) {
            qrResult.value = code.data; // Guardamos el contenido del QR
            detenerCamara(); // Detenemos el escaneo una vez leemos el QR

            // Redirigir al enlace del QR escaneado
            if (qrResult.value) {
              // Intentamos abrir la URL directamente
              window.location.href = qrResult.value; // Redirige a la URL contenida en el QR
            }
          }
        }
      }

      // Llamamos nuevamente a la función para seguir escaneando
      if (isCameraActive.value) {
        requestAnimationFrame(escanearQR);
      }
    };

    // Limpiar recursos cuando el componente se desmonte
    onBeforeUnmount(() => {
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    });

    return {
      videoElement,
      qrResult,
      isCameraActive,
      iniciarCamara,
      detenerCamara,
    };
  },
});
</script>

<style scoped>
.camera-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  background-color: 212529;
  min-height: 100vh;
}

h1 {
  font-size: 2rem;
  color: #049c55;
  margin-bottom: 20px;
}

.camera-display {
  width: 100%;
  max-width: 500px;
  background-color: black;
  border-radius: 10px;
  margin-bottom: 20px;
}

.no-camera {
  color: red;
  font-size: 1rem;
}

.controls {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: #3498db;
  color: white;
  font-size: 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9;
}

.result-container {
  margin-top: 30px;
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 500px;
}

pre {
  background-color: #ecf0f1;
  padding: 10px;
  border-radius: 5px;
  word-wrap: break-word;
  white-space: pre-wrap;
}
</style>
