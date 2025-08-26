<template>
  <!-- Sección principal centrada con fondo oscuro y padding -->
  <section
    class="min-h-[70vh] bg-[#212529] flex items-center justify-center p-6"
  >
    <!-- Contenedor del formulario de registro con estilos y sombra -->
    <div class="w-full max-w-2xl rounded-2xl bg-[#1c2024] p-6 shadow">
      <!-- Título de la página de registro -->
      <h1 class="text-2xl font-bold text-white mb-2">Crear cuenta</h1>
      <!-- Descripción breve debajo del título -->
      <p class="text-gray-300 mb-6">
        Regístrate para empezar a usar Cba<span class="text-[#7ED957]"
          >Point</span
        >.
      </p>
      <!-- Componente de formulario de registro, escucha el evento submit -->
      <RegisterForm @submit="handleSubmit" />
      <!-- Enlace para ir a la página de login si ya tiene cuenta -->
      <p class="mt-6 text-sm text-gray-300">
        ¿Ya tienes cuenta?
        <RouterLink to="/login" class="font-medium hover:text-[#7ED957]"
          >Inicia sesión</RouterLink
        >
      </p>
    </div>
  </section>
</template>
<script setup>
  // Importa el componente RegisterForm para mostrar el formulario de registro
  import RegisterForm from "@/components/Auth/RegisterForm.vue";
  // Función que maneja el evento submit del formulario
  function handleSubmit(payload) {
    // Muestra el payload recibido en consola (solo para desarrollo)
    console.log("register payload", payload);
  }
</script>
