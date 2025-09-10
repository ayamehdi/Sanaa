<template>
  <div class="container py-5">
    <div class="row align-items-center">
      <div class="col-md-6">
        <h1 class="mb-4">À propos des Ateliers Immersifs</h1>
        <p>
         Les Ateliers Immersifs SANAA, situés à Casablanca, sont organisés par un collectif de jeunes artisans passionnés. Nos ateliers vous permettent de passer un moment agréable, de vous détendre et d’éliminer le stress, tout en découvrant l’artisanat marocain.

Du zellige raffiné à la broderie délicate, chaque atelier mêle techniques traditionnelles et touches de modernité, pour offrir une expérience immersive et créative. À la fin de chaque session, vous repartez avec un objet unique que vous avez créé vous-même, un souvenir tangible de votre découverte et de votre créativité.
        </p>
        <p>
          Notre objectif est de transmettre le savoir-faire ancestral marocain tout en valorisant la créativité de chacun, pour que chaque participant vive une expérience enrichissante et mémorable.
        </p>
        <!-- Bouton corrigé -->
        <a href="/contact" class="btn-contact mt-3">Nous contacter</a>
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

<style scoped>
.btn-contact {
  display: inline-block;
  background-color: #A67C52; /* couleur nude foncée */
  color: #fff;
  padding: 10px 25px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border: none;
  border-radius: 5px;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-contact:hover {
  background-color: #8C5E3C; /* nuance plus foncée au survol */
  color: #fff;
  transform: translateY(-2px);
  cursor: pointer;
}
</style>
