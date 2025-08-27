<template>
  <div>
    <!-- Carrousel -->
    <div id="carouselExampleFade" class="carousel slide carousel-fade mb-5" data-bs-ride="carousel" style="position: relative;">
      
      <!-- Titre blanc fixe -->
      <div class="fixed-caption">
        <h1>À la Découverte des Ateliers d’Artisanat</h1>
      </div>

      <div class="carousel-inner">
        <div
          class="carousel-item"
          v-for="(image, index) in carouselImages"
          :key="index"
          :class="{ active: index === 0 }"
        >
          <img
            :src="require(`@/assets/${image.current}`)"
            class="d-block w-100 clickable-image"
            :alt="image.alt"
            @click="nextSlide"
          >
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
        <span class="carousel-control-prev-icon"></span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
        <span class="carousel-control-next-icon"></span>
      </button>
    </div>

    <!-- Présentation -->
    <div class="container text-center my-5">
      <h1 class="mb-4">Bienvenue aux Ateliers Immersifs</h1>
      <p class="lead">
        Découvrez l’art marocain, du zellige à la broderie, en mêlant tradition et modernité.
      </p>
      <router-link to="/about" class="btn btn-primary btn-lg mt-3">En savoir plus</router-link>
    </div>

    <!-- Carte des ateliers -->
    <div class="container my-5">
      <div class="row">
        <div class="col-md-4" v-for="atelier in ateliers" :key="atelier.slug">
          <div class="card shadow-sm h-100">
            <img :src="require(`@/assets/${atelier.image}`)" class="card-img-top" :alt="atelier.title">
            <div class="card-body">
              <h5 class="card-title">{{ atelier.title }}</h5>
              <p class="card-text">{{ atelier.description }}</p>
              <router-link :to="`/atelier/${atelier.slug}`" class="btn btn-outline-primary">
                Réserver
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as bootstrap from "bootstrap";

export default {
  name: 'HomeView',
  data() {
    return {
      carouselImages: [
        { current: "zellige.jpg", first: "zellige.jpg", second: "zellige2.jpg", alt: "Zellige" },
        { current: "calligraphie.jpg", first: "calligraphie.jpg", second: "calligraphie2.jpg", alt: "Calligraphie" },
        { current: "broderie.jpg", first: "broderie.jpg", second: "broderie2.jpg", alt: "Broderie" }
      ],
      ateliers: [
        { title: "Zellige", slug: "zellige", image: "zellige.jpg", description: "Apprenez l’art du carrelage marocain." },
        { title: "Calligraphie", slug: "calligraphie", image: "calligraphie.jpg", description: "Maîtrisez la beauté des lettres arabes." },
        { title: "Broderie", slug: "broderie", image: "broderie.jpg", description: "Initiez-vous à la broderie marocaine traditionnelle." }
      ]
    }
  },
  mounted() {
    // Auto-changer toutes les 4 secondes
    this.autoChange = setInterval(() => {
      this.nextSlide();
    }, 4000);
  },
  beforeUnmount() {
    clearInterval(this.autoChange);
  },
  methods: {
    nextSlide() {
      const carousel = document.querySelector('#carouselExampleFade');
      const carouselInstance = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
      carouselInstance.next();
    }
  }
}
</script>

<style scoped>
.clickable-image {
  height: 500px;
  object-fit: cover;
  cursor: pointer;
  transition: opacity 0.5s ease-in-out;
}

.fixed-caption {
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
}

.fixed-caption h1 {
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 2px 2px 10px rgba(0,0,0,0.7);
  text-align: center;
}

.card img {
  height: 250px;
  object-fit: cover;
}
</style>
