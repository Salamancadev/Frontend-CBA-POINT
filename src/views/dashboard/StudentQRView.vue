<template>
  <div class="qr-container">
    <h1>Generador de Código QR</h1>
    <!-- Componente de QR con el contenido dinámico que puedes cambiar -->
    <qrcode-vue :value="qrValue" :size="250" />
    <div class="input-container">
      <input type="text" v-model="qrValue" placeholder="Ingresa el texto para el código QR" />
    </div>
  </div>
</template>

<script>
import QRCodeVue from 'qrcode.vue'

export default {
  components: {
    QRCodeVue,
  },
  data() {
    return {
      qrValue: 'https://example.com', // Puedes inicializar con cualquier valor
    }
  },
}
</script>

<style scoped>
.qr-container {
  text-align: center;
  margin-top: 50px;
}

.input-container {
  margin-top: 20px;
}

input {
  padding: 10px;
  font-size: 16px;
  width: 80%;
  max-width: 400px;
  margin-top: 10px;
}
</style>
