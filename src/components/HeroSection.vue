<template>
  <!-- HERO -->
  <section
    id="inicio"
    class="group relative isolate overflow-hidden bg-center bg-no-repeat text-white"
    :class="[
      // Tamaño del fondo y animación (solo md+ para evitar jank en móvil)
      'bg-[length:100%] md:transition-[background-size] md:duration-[1500ms] md:hover:bg-[length:110%]',
      // Altura y espaciado
      'px-4 py-16 sm:py-20 lg:py-28',
    ]"
    style="
      background-image:
        linear-gradient(rgba(0, 0, 0, 0.65), rgba(0, 0, 0, 0.85)), url('/img/principal.png');
      background-size: cover;
    "
  >
    <!-- Elementos decorativos de fondo -->
    <div class="absolute inset-0 bg-gray-900/40"></div>
    
    <!-- Patrón de puntos decorativos -->
    <div class="absolute inset-0 opacity-10">
      <div class="absolute top-10 left-10 w-4 h-4 bg-[#7ED957] rounded-full"></div>
      <div class="absolute top-20 right-20 w-3 h-3 bg-[#24DEFF] rounded-full"></div>
      <div class="absolute bottom-16 left-1/4 w-2 h-2 bg-[#7ED957] rounded-full"></div>
    </div>

    <div class="mx-auto max-w-7xl relative z-10">
      <!-- Contenido -->
      <div class="max-w-3xl md:max-w-4xl lg:max-w-5xl">
        <!-- Título -->
        <h1
          class="font-bold leading-tight tracking-tight text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem]"
        >
          Cba<span class="text-[#7ED957]">Point</span>
        </h1>

        <!-- Subtítulo -->
        <h2 class="mt-3 font-sans font-bold text-base sm:text-xl md:text-2xl text-white">
          Asiste <span class="text-[#7ED957]">fácil</span> y
          <span class="text-[#24DEFF]">seguro</span>
        </h2>

        <!-- Descripción -->
        <p
          class="mt-6 font-sans text-[1.05rem] sm:text-lg md:text-xl text-gray-200 w-full md:w-3/4 lg:w-1/2 leading-relaxed"
        >
          <strong class="text-white">Cba<span class="text-[#7ED957]">Point</span></strong>
          es un sistema de
          <span class="text-[#24DEFF] font-bold">gestión de asistencias</span>
          para instructores SENA y personal administrativo que facilita la
          <span class="text-[#7ED957] font-bold">gestión</span> de aprendices en la institución.
        </p>

        <!-- Características rápidas -->
        <div class="mt-8 flex flex-wrap gap-4 text-sm text-gray-300">
          <div class="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg">
            <span class="text-[#7ED957]">✓</span> Códigos QR
          </div>
          <div class="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg">
            <span class="text-[#7ED957]">✓</span> Reportes automáticos
          </div>
          <div class="flex items-center gap-2 bg-gray-800/50 px-3 py-2 rounded-lg">
            <span class="text-[#7ED957]">✓</span> Tour virtual
          </div>
        </div>

        <!-- CTA -->
        <div class="mt-8 flex flex-col sm:flex-row gap-4">
          <a
            href="/descargas/cba-maps.apk"
            download="cba-maps.apk"
            class="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-[#7ED957] to-[#0097B2] px-8 py-4 text-base md:text-lg font-bold text-white transition-all duration-300 hover:from-[#66b047] hover:to-[#006e81] hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span class="mr-2">📱</span> ¡Descárgala ya!
          </a>
          
          <RouterLink
            to="/register"
            class="inline-flex items-center justify-center rounded-full bg-gray-800 border border-gray-600 hover:border-[#24DEFF] px-8 py-4 text-base md:text-lg font-bold text-[#24DEFF] transition-all duration-300 hover:bg-gray-700 hover:shadow-2xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#24DEFF] focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <span class="mr-2">🚀</span> Comenzar ahora
          </RouterLink>
        </div>

        <!-- Información adicional -->
        <div class="mt-6 text-xs text-gray-400">
          Disponible para dispositivos Android • Versión 1.0.0
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Opcional: respeta usuarios con reducción de movimiento */
@media (prefers-reduced-motion: reduce) {
  .group:hover {
    background-size: cover !important;
    transition: none !important;
  }
  
  .hover\:scale-105 {
    transform: none !important;
  }
}
</style>