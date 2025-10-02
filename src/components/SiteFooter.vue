<template>
  <footer class="bg-gray-900 text-white font-sans border-t border-gray-700">
    <!-- Contenido principal -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        <!-- Logo y descripción -->
        <section class="lg:col-span-1">
          <div class="flex items-center gap-3 mb-4">
            <img src="/img/LOGO CBA PASS.png" alt="CbaPoint logo" class="h-10 w-auto" />
            <span class="text-xl font-bold text-[#7ED957]">CbaPoint</span>
          </div>
          <p class="text-gray-400 text-sm leading-relaxed">
            Sistema de gestión de asistencias para instructores SENA. Facilita, registra y optimiza
            el control de aprendices.
          </p>
        </section>

        <!-- Contacto -->
        <section>
          <h4 class="text-lg font-semibold mb-4 text-[#7ED957]">Contacto</h4>
          <div class="space-y-3">
            <p class="text-gray-300">
              Email:
              <a
                href="mailto:proyectocbapass@gmail.com"
                class="text-gray-400 hover:text-[#7ED957] transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
              >
                proyectocbapass@gmail.com
              </a>
            </p>
            <p class="text-gray-300">
              Teléfono: <span class="text-gray-400">+57 123 456 7890</span>
            </p>
            <p class="text-gray-300">Dirección: <span class="text-gray-400">SENA Mosquera</span></p>
          </div>
        </section>

        <!-- Síguenos -->
        <section>
          <h4 class="text-lg font-semibold mb-4 text-[#7ED957]">Síguenos</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
                aria-label="Abrir Facebook en una nueva pestaña"
              >
                <span class="mr-2">📘</span> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
                aria-label="Abrir Twitter en una nueva pestaña"
              >
                <span class="mr-2">🐦</span> Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
                aria-label="Abrir Instagram en una nueva pestaña"
              >
                <span class="mr-2">📷</span> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
                aria-label="Abrir LinkedIn en una nueva pestaña"
              >
                <span class="mr-2">💼</span> LinkedIn
              </a>
            </li>
          </ul>
        </section>

        <!-- Legal -->
        <section>
          <h4 class="text-lg font-semibold mb-4 text-[#7ED957]">Legal</h4>
          <ul class="space-y-3">
            <li>
              <a
                href="/terminos-y-condiciones"
                class="text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
              >
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a
                href="/politica-de-privacidad"
                class="text-gray-300 hover:text-[#7ED957] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
              >
                Política de Privacidad
              </a>
            </li>
            <li>
              <a
                href="/preguntas-frecuentes"
                class="text-gray-300 hover:text-[#24DEFF] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#24DEFF] rounded-sm"
              >
                Preguntas Frecuentes
              </a>
            </li>
            <li>
              <a
                href="/soporte"
                class="text-gray-300 hover:text-[#24DEFF] transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#24DEFF] rounded-sm"
              >
                Soporte Técnico
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="border-t border-gray-700 bg-gray-800">
      <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm text-center md:text-left">
            &copy; 2025 <span class="text-[#7ED957] font-semibold">CbaPoint</span>. Todos los
            derechos reservados.
          </p>
          <div class="flex items-center gap-2 text-gray-400 text-sm">
            <span>🚀 Hecho con</span>
            <span class="text-[#7ED957]">♥</span>
            <span>para la comunidad SENA</span>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
// Sin lógica necesaria
</script>
