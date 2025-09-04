<template>
  <!-- Contenedor principal de la aplicación con fondo y altura mínima -->
  <div class="min-h-screen max-w-full bg-[#212529]">
    <!-- Componente de navegación superior (header) -->
    <HeaderNav />
    <!-- Vista actual según la ruta (routing de Vue Router) -->
    <RouterView />
    <!-- Componente de pie de página -->
    <SiteFooter />
  </div>
</template>
<script setup>
// Importa el componente de navegación superior
import HeaderNav from './components/HeaderNav.vue'
// Importa el componente de pie de página
import SiteFooter from './components/SiteFooter.vue'
</script>
