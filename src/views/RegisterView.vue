  <template>
    <section class="min-h-[70vh] bg-[#212529] flex items-center justify-center p-6">
      <div class="w-full max-w-2xl rounded-2xl bg-[#1c2024] p-6 shadow">
        <h1 class="text-2xl font-bold text-white mb-2">Crear cuenta</h1>
        <p class="text-gray-300 mb-6">
          Regístrate para empezar a usar Cba<span class="text-[#7ED957]">Point</span>.
        </p>

        <!-- Formulario de registro -->
        <RegisterForm @submit="handleSubmit" />

        <!-- Link a login -->
        <p class="mt-6 text-sm text-gray-300">
          ¿Ya tienes cuenta?
          <RouterLink to="/login" class="font-medium hover:text-[#7ED957]">Inicia sesión</RouterLink>
        </p>
      </div>
    </section>
  </template>

  <script lang="ts" setup>
  import RegisterForm from '../components/Auth/RegisterForm.vue'

  function handleSubmit(payload: any) {
    console.log('register payload', payload)
  }
  </script>