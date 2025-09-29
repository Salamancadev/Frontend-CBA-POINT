<template>
  <!-- HERO -->
  <section
    id="inicio"
    class="group relative isolate overflow-hidden bg-center bg-no-repeat text-white"
    :class="[
      // Tamaño del fondo y animación (solo md+ para evitar jank en móvil)
      'bg-[length:100%] md:transition-[background-size] md:duration-[1500ms] md:hover:bg-[length:110%]',
      // Altura y espaciado
      'px-4 py-16 sm:py-20 lg:py-28'
    ]"
    style="
      background-image:
        linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.75)),
        url('/img/principal.png');
      background-size: cover;
    "
  >
    <div class="mx-auto max-w-7xl">
      <!-- Contenido -->
      <div class="max-w-3xl md:max-w-4xl lg:max-w-5xl">
        <!-- Título -->
        <h1
          class="font-bold leading-tight tracking-tight text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] lg:text-[4.5rem]"
        >
          Cba<span class="text-[#7ED957]">Point</span>
        </h1>

        <!-- Subtítulo -->
        <h2
          class="mt-3 font-sans font-bold text-base sm:text-xl md:text-2xl text-[aliceblue]"
        >
          Asiste <span class="text-[#7ED957]">fácil</span> y
          <span class="text-[#24DEFF]">seguro</span>
        </h2>

        <!-- Descripción -->
        <p
          class="mt-6 font-sans text-[1.05rem] sm:text-lg md:text-xl text-[aliceblue] w-full md:w-3/4 lg:w-1/2"
        >
          <strong>
            Cba<span class="text-[#7ED957]">Point</span>
          </strong>
          es un sistema de
          <span class="text-[#24DEFF] font-bold">gestión de asistencias</span>
          para instructores SENA y personal administrativo que facilita la
          <span class="text-[#7ED957] font-bold">gestión</span> de aprendices en
          la institución.
        </p>

        <!-- CTA -->
        <div class="mt-8">
          <a
            href="/descargas/cba-maps.apk"
            download="cba-maps.apk"
            class="inline-flex items-center justify-center rounded-full
                   bg-gradient-to-r from-[#7ED957] to-[#0097B2]
                   px-6 py-3 text-base md:text-lg font-bold text-[aliceblue]
                   transition-all duration-300 hover:from-[#66b047] hover:to-[#006e81]
                   hover:shadow-inner focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:ring-offset-2 focus:ring-offset-black/30"
          >
            ¡Descárgala ya!
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// No script necesario por ahora
</script>

<style scoped>
/* Opcional: respeta usuarios con reducción de movimiento */
@media (prefers-reduced-motion: reduce) {
  .group:hover {
    background-size: cover !important;
    transition: none !important;
  }
}
</style>