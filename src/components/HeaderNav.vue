<template>
  <!-- Encabezado principal con alineación de elementos y fondo oscuro -->
  <header class="flex items-center bg-[#212529] p-4">
    <!-- Logo de la aplicación, imagen alineada a la izquierda -->
    <img src="/img/LOGO CBA PASS.png" alt="CbaPass logo" class="w-[10%] h-auto" />
    <!-- Barra de navegación principal -->
    <nav class="w-full bg-[#212529]">
      <!-- Lista de enlaces de navegación alineados horizontalmente -->
      <ul class="flex justify-end gap-10 bg-[#212529]">
        <li>
          <!-- Enlace a la página de inicio -->
          <RouterLink
            class="font-bold text-[1.2rem] font-sans text-white no-underline transition-colors duration-300 hover:text-[#7ED957]"
            to="/"
            >Inicio</RouterLink
          >
        </li>
        <li>
          <!-- Enlace a la página de inicio -->
          <RouterLink
            class="font-bold text-[1.2rem] font-sans text-white no-underline transition-colors duration-300 hover:text-[#7ED957]"
            to="/"
            >Ayuda</RouterLink
          >
        </li>
        <li>
          <!-- Enlace a la página de login -->
          <RouterLink
            class="font-bold text-[1.2rem] font-sans text-white no-underline transition-colors duration-300 hover:text-[#7ED957]"
            to="/login"
            >Iniciar sesión</RouterLink
          >
        </li>
        <li>
          <!-- Enlace a la página de registro -->
          <RouterLink
            class="font-bold text-[1.2rem] font-sans text-white no-underline transition-colors duration-300 hover:text-[#7ED957]"
            to="/register"
            >Registrarse</RouterLink
          >
        </li>
      </ul>
    </nav>
  </header>
</template>
<script setup></script>
