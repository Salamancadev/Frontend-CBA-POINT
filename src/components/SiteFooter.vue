<template>
  <footer class="bg-[#1B1E21] text-[aliceblue] font-sans">
    <!-- Contenido principal -->
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
      <div class="grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Contacto -->
        <section>
          <h4 class="text-lg font-semibold mb-2">Contacto</h4>
          <p class="mb-2">
            Email:
            <a
              href="mailto:proyectocbapass@gmail.com"
              class="underline underline-offset-4 hover:text-[#7ED957] focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
            >
              proyectocbapass@gmail.com
            </a>
          </p>
          <p>Teléfono: +57 123 456 7890</p>
        </section>

        <!-- Síguenos -->
        <section>
          <h4 class="text-lg font-semibold mb-2">Síguenos</h4>
          <ul class="space-y-1 list-disc pl-6">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors duration-300 hover:text-[#7ED957] focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
                aria-label="Abrir Facebook en una nueva pestaña"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors duration-300 hover:text-[#7ED957] focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
                aria-label="Abrir Twitter en una nueva pestaña"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                class="transition-colors duration-300 hover:text-[#7ED957] focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
                aria-label="Abrir Instagram en una nueva pestaña"
              >
                Instagram
              </a>
            </li>
          </ul>
        </section>

        <!-- Legal -->
        <section>
          <h4 class="text-lg font-semibold mb-2">Legal</h4>
          <ul class="space-y-1 list-disc pl-6">
            <li>
              <a
                href="/terminos-y-condiciones.html"
                class="transition-colors duration-300 hover:text-[#7ED957] focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
              >
                Términos y Condiciones
              </a>
            </li>
            <li>
              <a
                href="/politica-de-privacidad.html"
                class="transition-colors duration-300 hover:text-[#7ED957] focus:outline-none focus:ring-2 focus:ring-[#7ED957] rounded-sm"
              >
                Política de Privacidad
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>

    <!-- Barra inferior -->
    <div class="border-t border-white/10">
      <p class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 text-center text-sm sm:text-base">
        &copy; 2025 CbaPoint. Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup>
// Sin lógica necesaria
</script>