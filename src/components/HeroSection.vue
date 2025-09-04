<template>
  <!-- Sección principal tipo "hero" con fondo de imagen y gradiente oscuro -->
  <section
    id="inicio"
    class="font-sans p-[5%] bg-[linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.8)),url(/img/principal.png)] bg-[length:100%] transition-[background-size] duration-[1500ms] hover:bg-[length:110%]"
  >
    <!-- Título principal con nombre de la app y color destacado en "Pass" -->
    <h1 class="text-[4.5rem] font-bold text-[aliceblue]">
      Cba<span class="text-[#7ED957]">Point</span>
    </h1>
    <br />
    <!-- Subtítulo con palabras clave resaltadas en colores -->
    <h2 class="font-verdana text-[aliceblue] text-[150%] font-bold">
      Asiste <span class="text-[#7ED957]">fácil</span> y
      <span class="text-[#24DEFF]">seguro</span>
    </h2>
    <br /><br />
    <!-- Descripción del sistema y sus beneficios, con palabras resaltadas -->
    <p class="text-[1.5rem] w-[45%] font-sans text-[aliceblue]">
      <strong>Cba<span class="text-[#7ED957]">Point</span></strong> es un sistema de
      <span class="text-[#24DEFF] font-bold">gestion de asistencias</span> para instructores SENA y
      personal administrativo que facilita la
      <span class="text-[#7ED957] font-bold">gestión</span> de aprendices en la institución.
    </p>
    <br /><br /><br />
    <!-- Botón/enlace para descargar la aplicación, con estilos y efectos hover -->
    <a
      href="#"
      download="cba-maps.apk"
      class="inline-block h-[50px] w-[200px] bg-gradient-to-r from-[#7ED957] to-[#0097B2] rounded-full border-none cursor-pointer font-bold text-[1.2rem] text-[aliceblue] transition-all duration-400 hover:from-[#66b047] hover:to-[#006e81] hover:shadow-inner hover:bg-opacity-80 flex items-center justify-center"
      >¡Descárgala ya!</a
    >
  </section>
</template>
<script setup></script>

<style scoped>
/* Estilos adicionales para el componente, si son necesarios */
</style>
