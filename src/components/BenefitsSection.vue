<template>
  <!-- Sección principal con fondo oscuro y alineación de los elementos -->
  <section class="bg-[#212529] flex items-center max-w-full pb-[15%]">
    <!-- Primer artículo: contiene los elementos decorativos circulares e imagen -->
    <article class="relative w-[40%]">
      <!-- Círculo verde decorativo en la parte superior izquierda -->
      <div
        class="absolute w-[180px] h-[180px] bg-[#7ED957] rounded-full top-[-300px] left-[10%]"
      ></div>
      <!-- Imagen de estudiante en círculo grande, con efecto hover de zoom -->
      <div
        class="absolute w-[400px] h-[400px] bg-center rounded-full top-[-200px] left-[40%] bg-[url(/img/estudiante1.jpg)] bg-[length:150%] transition-[background-size] duration-[1500ms] hover:bg-[length:170%]"
      ></div>
      <!-- Círculo verde decorativo en la parte inferior derecha -->
      <div
        class="absolute w-[150px] h-[150px] bg-[#7ED957] rounded-full top-[260px] left-[90%]"
      ></div>
      <!-- Círculo blanco con borde y check, con efecto hover de zoom -->
      <div
        class="absolute w-[150px] h-[150px] bg-white rounded-full top-[90px] left-[30%] border-[15px] border-[#212529] bg-[url(/img/check.png)] bg-cover bg-center transition-[background-size] duration-500 hover:bg-[length:125%]"
      ></div>
    </article>
    <!-- Segundo artículo: contiene el título y la descripción de beneficios -->
    <article class="bg-[#212529] max-w-[50%]">
      <!-- Título principal con estilos y color destacado en "Pass" -->
      <h2 class="m-[10%] text-[aliceblue] text-[3rem] text-end font-verdana">
        ¿Por qué deberías usar Cba<span class="text-[#7ED957]">Point?</span>
      </h2>
      <!-- Párrafo descriptivo de los beneficios, con fondo y estilos -->
      <p
        class="relative m-[5%] p-[5%] text-[aliceblue] font-sans bg-[#343A40] rounded-[15px] text-[2em]"
      >
        Cba<span class="text-[#7ED957]">Point</span> te ayudará llevar el control de asistencias de
        aprendices por medio de qr que generan reportes automaticos así dejando de lado el uso de
        papel y contribuyendo al cuidado del medio ambiente, ademas gestionar las clases de
        induccion para nuevos aprendices con un tour virtual.
      </p>
    </article>
  </section>
</template>
<script setup>
// No hay lógica en este componente, solo estructura visual
</script>

<style scoped>
/* Estilos adicionales si son necesarios */
</style>
