<template>
  <section class="bg-gray-900 text-white">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-14 sm:py-16 lg:py-20">
      <!-- Layout: columna en móvil, dos columnas en md+ -->
      <div class="grid items-center gap-10 md:grid-cols-2">
        <!-- Columna izquierda: ilustración y círculos -->
        <article
          class="relative mx-auto h-80 sm:h-[26rem] md:h-[28rem] w-full max-w-md md:max-w-none"
        >
          <!-- Círculo principal (foto) -->
          <div
            class="absolute left-1/2 top-1/2 aspect-square w-56 sm:w-72 md:w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-center bg-no-repeat bg-[url('/img/estudiante1.jpg')] bg-[length:140%] md:transition-[background-size] md:duration-[1500ms] md:hover:bg-[length:165%] border-4 border-gray-700"
            aria-hidden="true"
          ></div>

          <!-- Círculo verde superior izq (decorativo) -->
          <div
            class="absolute -top-10 sm:-top-16 left-6 sm:left-10 hidden sm:block h-28 w-28 rounded-full bg-[#7ED957]"
            aria-hidden="true"
          ></div>

          <!-- Círculo verde inferior der (decorativo) -->
          <div
            class="absolute bottom-0 right-0 hidden md:block h-24 w-24 translate-x-4 translate-y-6 rounded-full bg-[#7ED957]"
            aria-hidden="true"
          ></div>

          <!-- Círculo blanco con check -->
          <div
            class="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2 h-24 w-24 sm:h-28 sm:w-28 rounded-full border-4 border-gray-900 bg-gray-800 bg-[url('/img/check.png')] bg-cover bg-center md:transition-[background-size] md:duration-500 md:hover:bg-[length:120%] shadow-lg"
            aria-hidden="true"
          ></div>
        </article>

        <!-- Columna derecha: título y texto -->
        <article class="md:pl-8">
          <h2
            class="font-bold text-3xl sm:text-4xl md:text-5xl leading-tight text-white text-center md:text-right"
          >
            ¿Por qué deberías usar Cba<span class="text-[#7ED957]">Point</span>?
          </h2>

          <p
            class="mt-6 rounded-2xl bg-gray-800 border border-gray-700 p-6 sm:p-8 font-sans text-base sm:text-lg md:text-xl text-gray-300 md:text-right shadow-lg"
          >
            Cba<span class="text-[#7ED957] font-semibold">Point</span> te ayudará a llevar el control de
            asistencias de aprendices por medio de códigos QR que generan reportes automáticos,
            dejando de lado el uso de papel y contribuyendo al cuidado del medio ambiente. Además,
            podrás gestionar las clases de inducción para nuevos aprendices con un tour virtual.
          </p>

          <!-- Botones de acción -->
          <div class="flex flex-col sm:flex-row gap-4 justify-end mt-8">
            <RouterLink
              to="/register"
              class="inline-flex items-center justify-center bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-[#7ED957] text-[#7ED957] font-semibold px-6 py-3 rounded-lg transition-all duration-300 hover:scale-105 text-center"
            >
              🚀 Comenzar ahora
            </RouterLink>

          
          </div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
import { RouterLink } from 'vue-router'
</script>

<style scoped>
/* Respeta reducción de movimiento: desactiva transiciones del zoom */
@media (prefers-reduced-motion: reduce) {
  [class*='transition'] {
    transition: none !important;
  }
}
</style>