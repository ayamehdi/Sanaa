<template>
  <div v-if="atelier" class="container my-5">
    <div class="row align-items-center">
      
      <!-- Colonne image -->
      <div class="col-md-6 mb-4 mb-md-0">
        <img 
          :src="atelier.image" 
          :alt="atelier.title" 
          class="img-fluid rounded shadow" 
          style="max-height:500px; object-fit:cover; width:100%;"
        >
      </div>

      <!-- Colonne contenu -->
      <div class="col-md-6">
        <h1 class="mb-3">{{ atelier.title }}</h1>

        <ul class="list-unstyled fs-5">
          <li class="mb-2">
            <i class="bi bi-geo-alt-fill text-danger me-2"></i>
            <strong>Ville :</strong> Marrakech
          </li>
          <li class="mb-2">
            <i class="bi bi-cash-stack text-success me-2"></i>
            <strong>Prix :</strong> {{ atelier.price }} MAD
          </li>
          <li class="mb-2">
            <i class="bi bi-clock text-primary me-2"></i>
            <strong>Durée :</strong> 3h
          </li>
          <li class="mb-2">
            <i class="bi bi-calendar-event text-warning me-2"></i>
            <strong>Horaires :</strong> 10h - 13h
          </li>
        </ul>

        <p class="lead mt-3">{{ atelier.description }}</p>
        

        <!-- Router link vers la page de réservation -->
      <router-link 
  :to="`/reservationform/${name}`" 
  class="btn btn-primary btn-lg mt-3"
>
  <i class="bi bi-check2-circle me-2"></i> Réserver maintenant
</router-link>

      </div>
    </div>
  </div>

  <!-- Cas introuvable -->
  <div v-else class="container my-5 text-center">
    <h1>Atelier introuvable</h1>
    <router-link to="/" class="btn btn-secondary mt-3">Retour</router-link>
  </div>
</template>

<script>
import zelligeImg from '@/assets/zellige.jpg'
import calligraphieImg from '@/assets/calligraphie.jpg'
import broderieImg from '@/assets/broderie.jpg'

export default {
   props: ['slug'],
  data() {
    return {
      ateliers: {
        zellige: {
          title: "Atelier Zellige",
          description: "Découvrez l’art ancestral du zellige, mosaïque traditionnelle marocaine.",
          price: 250,
          image: zelligeImg
        },
        calligraphie: {
          title: "Atelier Calligraphie",
          description: "Maîtrisez la beauté des lettres arabes.",
          price: 200,
          image: calligraphieImg
        },
        broderie: {
          title: "Atelier Broderie",
          description: "Initiez-vous à la broderie marocaine traditionnelle.",
          price: 300,
          image: broderieImg
        }
      }
    }
  },
  computed: {
    name() {
      return this.$route.params.name?.toLowerCase()
    },
    atelier() {
      return this.ateliers[this.name]
    }
  }
}
</script>

<style>
h1 {
  font-weight: bold;
}
</style>
