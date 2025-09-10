<template>
  <div class="container my-5 text-center" v-if="atelier">
    <h1>{{ atelier.title }}</h1>
    <img :src="require(`@/assets/${atelier.image}`)" class="img-fluid mb-3" />
    <p>{{ atelier.description }}</p>

    <!-- Bouton vers la page de réservation -->
    <router-link :to="`/reservation/${atelier.slug}`" class="btn btn-primary">
      Confirmer la réservation
    </router-link>
  </div>

  <div v-else class="container text-center my-5">
    <h2>Atelier introuvable</h2>
    <router-link to="/" class="btn btn-outline-secondary mt-3">Retour à l'accueil</router-link>
  </div>
</template>

<script>
export default {
  name: "AtelierView",
  props: ["slug"],
  data() {
    return {
      ateliers: [
        { slug: "zellige", title: "Atelier Zellige", image: "zellige.jpg", description: "Découvrez l’art du zellige marocain." },
        { slug: "calligraphie", title: "Atelier Calligraphie", image: "calligraphie.jpg", description: "Initiez-vous à l’art de la calligraphie." },
        { slug: "broderie", title: "Atelier Broderie", image: "broderie.jpg", description: "Maîtrisez les techniques de broderie traditionnelles." }
      ]
    };
  },
  computed: {
    atelier() {
      return this.ateliers.find(a => a.slug === this.slug);
    }
  }
};
</script>

<style scoped>
h1 { color: #d4b185; font-weight: bold; margin-bottom: 20px; }
p { font-size: 1.2rem; margin-bottom: 30px; }
</style>
