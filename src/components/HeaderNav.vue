<template>
  <header class="sticky top-0 z-50 bg-gray-900 border-b border-gray-700">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="flex h-16 items-center justify-between">
        <!-- Logo -->
        <img src="/img/LOGO CBA PASS.png" alt="CbaPass logo" class="h-10 w-auto sm:h-12" />
          <span class="sr-only">CBA Pass</span>

        <!-- Desktop nav -->
        <nav class="hidden md:block">
          <ul class="flex items-center gap-6">
            <!-- NO autenticado -->
            <template v-if="!auth.isAuthenticated">
              <li>
                <RouterLink
                  to="/"
                  class="font-semibold text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105"
                >
                  Inicio
                </RouterLink>
              </li>
              
              <li>
                <RouterLink
                  to="/login"
                  class="font-semibold text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105"
                >
                  Iniciar sesión
                </RouterLink>
              </li>
              <li>
                <RouterLink
                  to="/register"
                  class="inline-flex items-center rounded-lg bg-gray-800 border border-gray-600 hover:border-[#7ED957] px-4 py-2 font-semibold text-[#7ED957] transition-all duration-300 hover:scale-105 hover:bg-gray-700"
                >
                  Registrarse
                </RouterLink>
              </li>
            </template>

            <!-- SÍ autenticado: SOLO cerrar sesión -->
            <template v-else>
              <li>
                <button
                  @click="handleLogout"
                  class="inline-flex items-center rounded-lg bg-gray-800 border border-gray-600 hover:border-[#7ED957] px-4 py-2 font-semibold text-[#7ED957] transition-all duration-300 hover:scale-105 hover:bg-gray-700"
                >
                  Cerrar sesión
                </button>
              </li>
            </template>
          </ul>
        </nav>

        <!-- Botón menú móvil -->
        <button
          @click="isOpen = !isOpen"
          class="inline-flex items-center justify-center rounded-md p-2 md:hidden focus:outline-none focus:ring-2 focus:ring-[#7ED957] focus:ring-offset-2 focus:ring-offset-gray-900 transition-all duration-300"
          :aria-expanded="isOpen.toString()"
          aria-controls="mobile-menu"
        >
          <span class="sr-only">Abrir menú</span>
          <svg
            v-if="!isOpen"
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-gray-300 hover:text-[#7ED957] transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6 text-[#7ED957] transition-colors duration-300"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Menú móvil -->
    <nav v-if="isOpen" id="mobile-menu" class="md:hidden border-t border-gray-700 bg-gray-800">
      <ul class="space-y-2 px-4 py-4">
        <!-- NO autenticado -->
        <template v-if="!auth.isAuthenticated">
          <li>
            <RouterLink
              to="/"
              class="block rounded-lg px-4 py-3 text-gray-300 hover:text-[#7ED957] hover:bg-gray-700 transition-all duration-300"
              @click="closeMenu"
              >Inicio</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/ayuda"
              class="block rounded-lg px-4 py-3 text-gray-300 hover:text-[#7ED957] hover:bg-gray-700 transition-all duration-300"
              @click="closeMenu"
              >Ayuda</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/login"
              class="block rounded-lg px-4 py-3 text-gray-300 hover:text-[#7ED957] hover:bg-gray-700 transition-all duration-300"
              @click="closeMenu"
              >Iniciar sesión</RouterLink
            >
          </li>
          <li>
            <RouterLink
              to="/register"
              class="block rounded-lg bg-gray-700 border border-gray-600 hover:border-[#7ED957] px-4 py-3 font-semibold text-[#7ED957] hover:bg-gray-600 transition-all duration-300 text-center"
              @click="closeMenu"
            >
              Registrarse
            </RouterLink>
          </li>
        </template>

        <!-- SÍ autenticado: SOLO cerrar sesión -->
        <template v-else>
          <li>
            <button
              @click="
                () => {
                  closeMenu()
                  handleLogout()
                }
              "
              class="w-full text-left block rounded-lg bg-gray-700 border border-gray-600 hover:border-[#7ED957] px-4 py-3 font-semibold text-[#7ED957] hover:bg-gray-600 transition-all duration-300"
            >
              Cerrar sesión
            </button>
          </li>
        </template>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuthStore } from '@/store/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

onMounted(() => auth.hydrate())

const isOpen = ref(false)
const closeMenu = () => {
  isOpen.value = false
}

const handleLogout = () => {
  auth.simulateLogout()
  router.push('/') // Te devuelve a la página inicial
}
</script>