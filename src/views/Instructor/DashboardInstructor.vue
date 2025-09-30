<template>
  <!-- 🔹 NAVBAR con botones tipo tarjetas - Rediseño Oscuro -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6 p-4">
    <!-- Eventos -->
    <RouterLink
      to="/inst_ConsulEvent"
      class="bg-gray-800 border border-gray-700 text-white p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#7ED957] group"
    >
      <div class="flex flex-col items-center text-center">
        <span class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📅</span>
        <h3 class="font-bold text-lg text-[#7ED957] group-hover:text-white transition-colors duration-300">Gestionar Eventos</h3>
        <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-2">Ver y administrar eventos propios</p>
      </div>
    </RouterLink>

    <!-- Reportes -->
    <RouterLink
      to="/inst_Reportes"
      class="bg-gray-800 border border-gray-700 text-white p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#7ED957] group"
    >
      <div class="flex flex-col items-center text-center">
        <span class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📊</span>
        <h3 class="font-bold text-lg text-[#7ED957] group-hover:text-white transition-colors duration-300">Reportes</h3>
        <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-2">Visualizar estadísticas y exportar</p>
      </div>
    </RouterLink>

    <!-- Escanear QR -->
    <RouterLink
      to="/inst_Scann"
      class="bg-gray-800 border border-gray-700 text-white p-6 rounded-xl shadow-lg hover:bg-gray-700 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl hover:border-[#7ED957] group"
    >
      <div class="flex flex-col items-center text-center">
        <span class="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">📷</span>
        <h3 class="font-bold text-lg text-[#7ED957] group-hover:text-white transition-colors duration-300">Escanear QR</h3>
        <p class="text-sm text-gray-400 group-hover:text-gray-300 transition-colors duration-300 mt-2">Registrar asistencia inmediata</p>
      </div>
    </RouterLink>
  </div>
</template>