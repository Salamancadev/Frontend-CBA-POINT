<template>
  <RouterLink
  to="/dashboard-instructor"
  class="bg-red-600 text-black font-semibold px-4 py-2 rounded hover:bg-red-700"
>
  Back
</RouterLink>
  <div class="p-6">
    <h2 class="text-xl font-bold mb-4">Escanear QR para registrar asistencia</h2>

    <div id="reader" class="w-full max-w-md mx-auto border rounded-md"></div>

    <p v-if="mensaje" class="mt-4 font-semibold text-green-700">{{ mensaje }}</p>
    <p v-if="error" class="mt-4 font-semibold text-red-700">{{ error }}</p>
  </div>
</template>

<script>
import { Html5Qrcode } from "html5-qrcode";
import axios from "axios";

export default {
  name: "EscanearAsistencia",
  data() {
    return {
      scanner: null,
      mensaje: "",
      error: "",
    };
  },
  mounted() {
    this.iniciarScanner();
  },
  methods: {
    async iniciarScanner() {
      this.scanner = new Html5Qrcode("reader");
      try {
        await this.scanner.start(
          { facingMode: "environment" }, // usa cámara trasera en móviles
          { fps: 10, qrbox: { width: 250, height: 250 } },
          (decodedText) => {
            this.registrarAsistencia(decodedText);
          },
          (errorMessage) => {
            // errores de escaneo (se pueden ignorar)
          }
        );
      } catch (err) {
        console.error("Error iniciando la cámara: ", err);
        this.error = "No se pudo acceder a la cámara.";
      }
    },

    async registrarAsistencia(codigoQR) {
      try {
        const token = localStorage.getItem("token"); // JWT del login
        const response = await axios.post(
          "http://127.0.0.1:8000/api/asistencia/registrar/",
          {
            evento_id: 1, // 🔹 Aquí puedes pasar dinámicamente el evento actual
            metodo: "qr",
            estado: "presente",
            codigo_qr: codigoQR,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        this.mensaje = `✅ Asistencia registrada: ${response.data.evento.nombre}`;
        this.error = "";

        // 🔹 Detener el escaneo después de un registro exitoso
        this.scanner.stop().catch((e) => console.error("Error al detener escáner", e));
      } catch (err) {
        console.error(err);
        this.error = "❌ No se pudo registrar la asistencia (QR inválido o error de red)";
        this.mensaje = "";
      }
    },
  },
};
</script>

<style>
#reader {
  min-height: 300px;
}
</style>
