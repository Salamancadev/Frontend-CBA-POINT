<template>
  <!-- 🔹 NAVBAR con botones tipo tarjetas -->
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto mt-6">
    <!-- Eventos -->
    <RouterLink
      to="/inst_ConsulEvent"
      class="bg-blue-600 text-white p-6 rounded-xl shadow-lg hover:bg-blue-700 transition transform hover:-translate-y-1"
    >
      <div class="flex flex-col items-center text-center">
        <span class="text-3xl mb-2">📅</span>
        <h3 class="font-bold text-lg">Gestionar Eventos</h3>
        <p class="text-sm opacity-80">Ver y administrar eventos propios</p>
      </div>
    </RouterLink>

    <!-- Reportes -->
    <RouterLink
      to="/inst_Reportes"
      class="bg-purple-600 text-white p-6 rounded-xl shadow-lg hover:bg-purple-700 transition transform hover:-translate-y-1"
    >
      <div class="flex flex-col items-center text-center">
        <span class="text-3xl mb-2">📊</span>
        <h3 class="font-bold text-lg">Reportes</h3>
        <p class="text-sm opacity-80">Visualizar estadísticas y exportar</p>
      </div>
    </RouterLink>

    <!-- Escanear QR -->
    <RouterLink
      to="/inst_Scann"
      class="bg-green-600 text-white p-6 rounded-xl shadow-lg hover:bg-green-700 transition transform hover:-translate-y-1"
    >
      <div class="flex flex-col items-center text-center">
        <span class="text-3xl mb-2">📷</span>
        <h3 class="font-bold text-lg">Escanear QR</h3>
        <p class="text-sm opacity-80">Registrar asistencia inmediata</p>
      </div>
    </RouterLink>
  </div>
</template>
