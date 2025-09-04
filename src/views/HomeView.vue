<template>
  <!-- Contenido principal de la página de inicio -->
  <main>
    <!-- Sección "hero" con título, descripción y botón de descarga -->
    <HeroSection />
    <!-- Sección de beneficios con información visual y texto descriptivo -->
    <BenefitsSection />
  </main>
</template>
<script setup>
// Importa el componente HeroSection para mostrar la sección principal
import HeroSection from '../components/HeroSection.vue'
// Importa el componente BenefitsSection para mostrar los beneficios
import BenefitsSection from '../components/BenefitsSection.vue'
</script>
