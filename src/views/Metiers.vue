<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
    <!-- Hero Section -->

   
  </div>

  <!-- Section Métiers -->
  <section id="metiers" class="py-16 bg-white">
    <div class="max-w-6xl mx-auto px-4">
      <h2 class="text-3xl font-bold text-indigo-700 text-center mb-12">Métiers de l’artisanat</h2>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <!-- Métier 1 -->
        <div class="bg-gray-50 rounded-lg shadow hover:shadow-md transition p-6 text-center">
          <img src="/src/assets/zellige.jpg" alt="Zellige" class="h-40 w-full object-cover rounded mb-4">
          <h3 class="text-xl font-semibold text-gray-800">Zellige</h3>
          <p class="text-gray-600 text-sm mt-2">Art de la mosaïque en céramique, emblématique de Fès.</p>
        </div>

        <!-- Métier 2 -->
        <div class="bg-gray-50 rounded-lg shadow hover:shadow-md transition p-6 text-center">
          <img src="/src/assets/tapis.jpg" alt="Tapis berbère" class="h-40 w-full object-cover rounded mb-4">
          <h3 class="text-xl font-semibold text-gray-800">Tapis berbère</h3>
          <p class="text-gray-600 text-sm mt-2">Tissés à la main par les femmes amazighes du Moyen Atlas.</p>
        </div>

        <!-- Métier 3 -->
        <div class="bg-gray-50 rounded-lg shadow hover:shadow-md transition p-6 text-center">
          <img src="/src/assets/cuir.jpg" alt="Cuir de Fès" class="h-40 w-full object-cover rounded mb-4">
          <h3 class="text-xl font-semibold text-gray-800">Cuir de Fès</h3>
          <p class="text-gray-600 text-sm mt-2">Travail du cuir dans les tanneries traditionnelles de Fès.</p>
        </div>

      </div>
    </div>
  </section>
</template>
<script>
export default {
  name: 'MetiersView'
}
</script>