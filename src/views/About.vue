<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <div class="col-md-6">
        <h1 class="mb-4">À propos des Ateliers Immersifs</h1>
        <p>
          Les Ateliers Immersifs vous invitent à explorer l’âme de l’art marocain.
          Du zellige raffiné à la broderie délicate, nous mêlons tradition et modernité
          pour offrir des expériences uniques.
        </p>
        <p>
          Fondés par des passionnés de culture et de savoir-faire, nos ateliers visent
          à transmettre des techniques ancestrales tout en laissant place à la créativité personnelle.
        </p>
        <a href="/contact" class="btn btn-primary mt-3">Nous contacter</a>
      </div>
      <div class="col-md-6">
        <img :src="require('@/assets/atelier.jpg')" class="img-fluid rounded shadow" alt="Atelier">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>
