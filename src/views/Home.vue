<template>
  <div>
    <!-- Carrousel -->
    <div id="carouselExampleFade" class="carousel slide carousel-fade mb-5" data-bs-ride="carousel" style="position: relative;">
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
      <h1 class="mb-4">Bienvenue A Nos Ateliers Immersifs</h1>
      <p class="lead">
        Découvrez l’art marocain, du zellige à la broderie, en mêlant tradition et modernité.
      </p>
      <router-link to="/about" class="btn btn-primary btn-lg mt-3">En savoir plus</router-link>
    </div>

    <!-- Ateliers -->
    <div class="container my-5">
      <h2 class="mb-4 text-center">Nos Ateliers</h2>
      <div class="row">
        <div class="col-md-4 mb-4" v-for="atelier in ateliers" :key="atelier.title">
          <div class="card shadow-sm h-100">
            <img :src="require(`@/assets/${atelier.image}`)" class="card-img-top" :alt="atelier.title">
            <div class="card-body">
              <h5 class="card-title">{{ atelier.title }}</h5>
              <p class="card-text">{{ atelier.description }}</p>
              <router-link :to="`/atelier/${atelier.slug}`" class="btn btn-outline-primary">
                Reserver l'atelier
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Pourquoi nous choisir -->
    <div class="container my-5 why-us p-5 text-center">
      <h2 class="mb-4">Pourquoi nous choisir ?</h2>
      <div class="row">
        <div class="col-md-4 mb-3">
          <div class="feature-card p-4 h-100 shadow-sm">
            <h5>Artisans Experts</h5>
            <p>Nos ateliers sont dirigés par des artisans passionnés et expérimentés.</p>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="feature-card p-4 h-100 shadow-sm">
            <h5>Immersion Culturelle</h5>
            <p>Vivez une expérience authentique et découvrez l’art marocain en profondeur.</p>
          </div>
        </div>
        <div class="col-md-4 mb-3">
          <div class="feature-card p-4 h-100 shadow-sm">
            <h5>Apprentissage Ludique</h5>
            <p>Des ateliers pratiques, interactifs et adaptés à tous les niveaux.</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Feedbacks Slider -->
    <div class="feedback-slider-container my-5">
      <h3 class="mb-4 text-center">Ce que disent nos participants</h3>
      <div class="feedback-slider">
        <div class="feedback-card" v-for="(feedback, index) in feedbacks" :key="index">
          <p>"{{ feedback.comment }}"</p>
          <h6 class="text-muted">- {{ feedback.name }}</h6>
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
        { current: "zellige.jpg", alt: "Zellige" },
        { current: "calligraphie.jpg", alt: "Calligraphie" },
        { current: "broderie.jpg", alt: "Broderie" }
      ],
      ateliers: [
        { title: "Zellige", slug: "zellige", image: "zellige.jpg", description: "Apprenez l’art du carrelage marocain." },
        { title: "Calligraphie", slug: "calligraphie", image: "calligraphie.jpg", description: "Maîtrisez la beauté des lettres arabes." },
        { title: "Broderie", slug: "broderie", image: "broderie.jpg", description: "Initiez-vous à la broderie marocaine traditionnelle." }
      ],
      feedbacks: [
        { name: "Sara L.", comment: "Une expérience incroyable, je recommande vivement !" },
        { name: "Ahmed B.", comment: "Des ateliers très bien organisés et instructifs." },
        { name: "Leila F.", comment: "J’ai appris beaucoup sur l’art marocain, super immersion !" },
        { name: "Youssef M.", comment: "Les artisans sont très pédagogues et accueillants." },
        { name: "Nora K.", comment: "Une ambiance chaleureuse et des ateliers immersifs." }
      ]
    }
  },
  mounted() {
    // Carrousel automatique
    this.autoChange = setInterval(() => this.nextSlide(), 4000);

    // Animation du slider de feedbacks
    this.animateFeedbacks();
  },
  beforeUnmount() {
    clearInterval(this.autoChange);
  },
  methods: {
    nextSlide() {
      const carousel = document.querySelector('#carouselExampleFade');
      const carouselInstance = bootstrap.Carousel.getInstance(carousel) || new bootstrap.Carousel(carousel);
      carouselInstance.next();
    },
    animateFeedbacks() {
      const slider = document.querySelector('.feedback-slider');
      let translateX = 0;
      setInterval(() => {
        translateX -= 1;
        if (Math.abs(translateX) >= slider.scrollWidth / 2) {
          translateX = 0;
        }
        slider.style.transform = `translateX(${translateX}px)`;
      }, 20);
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
  color: #f5e6d3; /* couleur nude claire pour texte sur image sombre */
  text-shadow: 2px 2px 10px rgba(0,0,0,0.8);
  text-align: center;
}

.card img {
  height: 200px;
  object-fit: cover;
}

/* Présentation */
.container.text-center.my-5 p.lead {
  color: #4b3f2f; /* texte plus foncé nude */
}

.btn-primary {
  background-color: #8c6e58; /* bouton nude foncé */
  border-color: #8c6e58;
}

.btn-primary:hover {
  background-color: #6f5846;
  border-color: #6f5846;
}

/* Pourquoi nous choisir */
.why-us {
  background-color: #e4d7c3; /* nude foncé */
  border-radius: 15px;
  color: #3b2e20;
}
.feature-card {
  background-color: #d6c1a3; /* nude légèrement plus clair */
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  color: #3b2e20;
}

/* Feedback slider */
.feedback-slider-container {
  overflow: hidden;
  background-color: #e4d7c3; /* nude foncé */
  padding: 20px 0;
  border-radius: 15px;
}

.feedback-slider {
  display: flex;
  gap: 20px;
  white-space: nowrap;
  transition: transform 0.1s linear;
}

.feedback-card {
  min-width: 250px;
  background-color: #d6c1a3; /* nude légèrement plus clair */
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0,0,0,0.15);
  flex-shrink: 0;
  color: #3b2e20;
}
</style>