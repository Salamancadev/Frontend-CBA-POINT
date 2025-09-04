<template>
  <!-- Sección principal centrada con fondo oscuro y padding -->
  <section class="min-h-[70vh] bg-[#212529] flex items-center justify-center p-6">
    <!-- Contenedor del formulario con estilos y sombra -->
    <div class="w-full max-w-md rounded-2xl bg-[#1c2024] p-6 shadow">
      <!-- Título de la página de login -->
      <h1 class="text-2xl font-bold text-white mb-2">Iniciar sesión</h1>
      <!-- Descripción breve debajo del título -->
      <p class="text-gray-300 mb-6">
        Accede fácil y seguro a Cba<span class="text-[#7ED957]">Point</span>.
      </p>
      <!-- Componente de formulario de login, escucha el evento submit -->
      <LoginForm @submit="handleSubmit" />
      <!-- Enlace para ir a la página de registro si no tiene cuenta -->
      <p class="mt-6 text-sm text-gray-300">
        ¿No tienes cuenta?
        <RouterLink to="/register" class="font-medium hover:text-[#7ED957]">Regístrate</RouterLink>
      </p>
    </div>
  </section>
</template>
<script setup>
// Importa el componente LoginForm para mostrar el formulario de login
import LoginForm from '@/components/Auth/LoginForm.vue'
// Función que maneja el evento submit del formulario
function handleSubmit(payload) {
  // Muestra el payload recibido en consola (solo para desarrollo)
  console.log('login payload', payload)
}
</script>
