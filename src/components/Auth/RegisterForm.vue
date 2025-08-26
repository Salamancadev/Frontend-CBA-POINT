<template>
  <!-- Formulario de registro, previene el envío por defecto y llama a onSubmit -->
  <form @submit.prevent="onSubmit" class="space-y-4">
    <!-- Campos de nombre y apellido en dos columnas -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <!-- Etiqueta para el campo de nombre -->
        <label for="name" class="block text-sm font-medium text-white"
          >Nombre</label
        >
        <!-- Input para el nombre, vinculado a form.name -->
        <input
          id="name"
          v-model="form.name"
          type="text"
          required
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          placeholder="Tu nombre"
        />
      </div>
      <div>
        <!-- Etiqueta para el campo de apellido -->
        <label for="lastName" class="block text-sm font-medium text-white"
          >Apellido</label
        >
        <!-- Input para el apellido, vinculado a form.lastName -->
        <input
          id="lastName"
          v-model="form.lastName"
          type="text"
          required
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          placeholder="Tu apellido"
        />
      </div>
    </div>
    <!-- Campo de rol -->
    <div>
      <label for="role" class="block text-sm font-medium text-white"
        >Rol</label
      >
      <select
        id="role"
        v-model="form.role"
        required
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
      >
        <option value="" disabled>Selecciona tu rol</option>
        <option value="Aprendiz">Aprendiz</option>
        <option value="Instructor">Instructor</option>
        <option value="Administrativo">Administrativo</option>
      </select>
    </div>
    <!-- Campo de tipo de documento y número de documento en dos columnas -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <div>
        <label for="documentType" class="block text-sm font-medium text-white"
          >Tipo de documento</label
        >
        <select
          id="documentType"
          v-model="form.documentType"
          required
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        >
          <option value="" disabled>Selecciona el tipo</option>
          <option value="Cédula de ciudadania">Cédula de ciudadania</option>
          <option value="Tarjeta de identidad">Tarjeta de identidad</option>
          <option value="Cédula de extranjeria">Cédula de extranjeria</option>
        </select>
      </div>
      <div>
        <label for="documentNumber" class="block text-sm font-medium text-white"
          >Número de documento</label
        >
        <input
          id="documentNumber"
          v-model="form.documentNumber"
          type="text"
          required
          pattern="[0-9]+"
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        />
      </div>
    </div>
    <!-- Campo de correo electrónico -->
    <div>
      <!-- Etiqueta para el campo de correo -->
      <label for="email" class="block text-sm font-medium text-white"
        >Correo</label
      >
      <!-- Input para el correo, vinculado a form.email -->
      <input
        id="email"
        v-model="form.email"
        type="email"
        required
        class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
        placeholder="tu@email.com"
      />
    </div>
    <!-- Campos de contraseña y confirmación en dos columnas -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
      <div>
        <!-- Etiqueta para el campo de confirmación de contraseña -->
        <label for="confirm" class="block text-sm font-medium text-white"
          >Confirmar contraseña</label
        >
        <!-- Input para confirmar la contraseña, vinculado a form.confirm -->
        <input
          id="confirm"
          v-model="form.confirm"
          type="password"
          required
          minlength="6"
          class="mt-1 w-full rounded-xl border border-gray-600 bg-[#2b2f33] p-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#7ED957]"
          placeholder="••••••••"
        />
      </div>
    </div>
    <!-- Checkbox para aceptar términos y condiciones -->
    <label class="inline-flex items-center gap-2 text-sm text-gray-300"
      ><input
        type="checkbox"
        v-model="form.terms"
        required
        class="rounded border-gray-600 bg-[#2b2f33]"
      />
      <span>Acepto los términos y condiciones</span>
    </label>
    <!-- Botón para enviar el formulario -->
    <button
      type="submit"
      class="w-full btn bg-[#7ED957] text-[#0b1220] hover:brightness-90"
    >
      Crear cuenta
    </button>
    <!-- Muestra mensaje de error si existe -->
    <p v-if="error" class="text-red-400 text-sm">{{ error }}</p>
  </form>
</template>
<script setup>
// Importa reactive y ref de Vue para estado reactivo y referencias
import { reactive, ref } from "vue";
// Define el evento personalizado "submit" que puede emitir el componente
const emit = defineEmits(["submit"]);
// Variable reactiva para mostrar errores en el formulario
const error = ref("");
// Estado reactivo para almacenar los datos del formulario
const form = reactive({
  name: "",
  lastName: "",
  role: "",
  documentType: "",
  documentNumber: "",
  email: "",
  password: "",
  confirm: "",
  terms: false,
});
// Función que se ejecuta al enviar el formulario
function onSubmit() {
  // Reinicia el mensaje de error
  error.value = "";
  // Verifica que las contraseñas coincidan
  if (form.password !== form.confirm) {
    error.value = "Las contraseñas no coinciden";
    return;
  }
  // Emite el evento "submit" con los datos del formulario
  emit("submit", { ...form });
  // Muestra los datos en consola (solo para desarrollo)
  console.log("Register submit", form);
  // Simula el registro con una alerta
  alert("Registro simulado");
}
</script>
