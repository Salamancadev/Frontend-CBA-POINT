<template>
  <!-- Formulario de login, previene el envío por defecto y llama a onSubmit -->
  <form @submit.prevent="onSubmit" class="space-y-4">
    <div>
      <!-- Etiqueta para el campo de correo -->
      <label for="email" class="block text-sm font-medium text-white"
        >Correo</label
      >
      <!-- Input para el correo, vinculado al estado form.email -->
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        placeholder="tu@email.com"
      />
    </div>
    <div>
      <!-- Etiqueta para el campo de contraseña -->
      <label for="password" class="block text-sm font-medium text-white"
        >Contraseña</label
      >
      <!-- Input para la contraseña, vinculado a form.password -->
      <input
        id="password"
        v-model="form.password"
        type="password"
        required
        minlength="6"
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        placeholder="••••••••"
      />
    </div>
    <div class="flex items-center justify-between">
      <!-- Checkbox para "Recuérdame", vinculado a form.remember -->
      <label class="inline-flex items-center gap-2 text-sm text-gray-300"
        ><input
          type="checkbox"
          v-model="form.remember"
          class="rounded border-gray-600 bg-[#2b2f33]"
        />
        <span>Recuérdame</span>
      </label>
      <!-- Enlace para recuperar contraseña -->
      <a href="#" class="text-sm hover:text-[#7ED957]"
        >¿Olvidaste tu contraseña?</a
      >
    </div>
    <!-- Botón para enviar el formulario -->
    <button
      type="submit"
      class="w-full btn bg-[#7ED957] text-[#0b1220] hover:brightness-90"
    >
      Ingresar
    </button>
  </form>
</template>
<script setup>
// Importa la función reactive de Vue para crear un objeto reactivo
import { reactive } from "vue";
// Define el evento personalizado "submit" que puede emitir el componente
const emit = defineEmits(["submit"]);
// Estado reactivo para almacenar los datos del formulario
const form = reactive({ email: "", password: "", remember: false });
// Función que se ejecuta al enviar el formulario
function onSubmit() {
  // Emite el evento "submit" con los datos del formulario
  emit("submit", { ...form });
  // Muestra los datos en consola (solo para desarrollo)
  console.log("Login submit", form);
  // Simula el inicio de sesión con una alerta
  alert("Inicio de sesión simulado.");
}
</script>
