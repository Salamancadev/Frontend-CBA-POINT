<template>
  <!-- Pie de página principal con fondo oscuro y distribución en cuadrícula -->
  <footer class="grid text-[aliceblue] grid-cols-3 grid-rows-2 font-sans p-[4rem] bg-[#1B1E21]">
    <!-- Sección de contacto con email y teléfono -->
    <section>
      <h4 class="font-semibold mb-2">Contacto</h4>
      <p>
        Email:
        <!-- Enlace para enviar correo electrónico -->
        <a href="mailto:proyectocbapass@gmail.com" class="underline hover:text-[#7ED957]"
          >proyectocbapass@gmail.com</a
        >
      </p>
      <p>Teléfono: +57 123 456 7890</p>
    </section>
    <!-- Sección de redes sociales con enlaces externos -->
    <section>
      <h4 class="font-semibold mb-2">Síguenos</h4>
      <ul class="space-y-1">
        <li>
          <!-- Enlace a Facebook -->
          <a
            href="https://facebook.com"
            target="_blank"
            class="transition-colors duration-500 hover:text-[#7ED957]"
            >Facebook</a
          >
        </li>
        <li>
          <!-- Enlace a Twitter -->
          <a
            href="https://twitter.com"
            target="_blank"
            class="transition-colors duration-500 hover:text-[#7ED957]"
            >Twitter</a
          >
        </li>
        <li>
          <!-- Enlace a Instagram -->
          <a
            href="https://instagram.com"
            target="_blank"
            class="transition-colors duration-500 hover:text-[#7ED957]"
            >Instagram</a
          >
        </li>
      </ul>
    </section>
    <!-- Sección legal con enlaces a términos y privacidad -->
    <section>
      <h4 class="font-semibold mb-2">Legal</h4>
      <ul class="space-y-1">
        <li>
          <!-- Enlace a Términos y Condiciones -->
          <a
            href="/terminos-y-condiciones.html"
            class="transition-colors duration-500 hover:text-[#7ED957]"
            >Términos y Condiciones</a
          >
        </li>
        <li>
          <!-- Enlace a Política de Privacidad -->
          <a
            href="/politica-de-privacidad.html"
            class="transition-colors duration-500 hover:text-[#7ED957]"
            >Política de Privacidad</a
          >
        </li>
      </ul>
    </section>
    <!-- Texto de derechos reservados centrado en el pie de página -->
    <p class="col-span-3 m-[2%] text-center">
      &copy; 2025 CbaPoint. Todos los derechos reservados.
    </p>
  </footer>
</template>
<script setup></script>

<style scoped>
/* Estilos específicos para el pie de página */
footer {
  /* Fondo oscuro y texto en color claro */
  background-color: #1b1e21;
  color: aliceblue;
}

h4 {
  /* Estilo para los encabezados de sección */
  font-weight: 600;
  margin-bottom: 0.5rem;
}

a {
  /* Estilo para los enlaces */
  color: inherit;
  text-decoration: none;
}

a:hover {
  /* Efecto hover para los enlaces */
  color: #7ed957;
}

ul {
  /* Estilo para las listas de enlaces */
  padding-left: 1.5rem;
}

p {
  /* Estilo para los párrafos */
  margin: 0.5rem 0;
}
</style>
