<template>
  <div class="ateliers-section py-5">
    <div class="container">
      <h1 class="text-center mb-5">Nos Ateliers</h1>

      <div
        v-for="(atelier, index) in ateliers"
        :key="atelier.slug"
        class="row align-items-center mb-5 atelier-card"
        :class="{ 'flex-row-reverse': index % 2 !== 0 }"
      >
        <!-- Image + bouton -->
        <div class="col-md-6 text-center d-flex flex-column align-items-center">
          <h3 class="atelier-title">{{ atelier.title }}</h3>
          <img
            :src="require(`@/assets/${atelier.image}`)"
            class="img-fluid rounded shadow atelier-img"
            :alt="atelier.title"
          />
          <!-- Bouton toujours sous l’image -->
          <div class="mt-3">
            <router-link :to="`/atelier/${atelier.slug}`" class="btn-reserve">
              Réserver
            </router-link>
          </div>
        </div>

        <!-- Description -->
        <div class="col-md-6 atelier-description">
          <p>{{ atelier.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "AtelierView",
  data() {
    return {
      ateliers: [
        {
          title: "Zellige",
          slug: "zellige",
          image: "zellige.jpg",
          description:
            "Le zellige marocain est un art ancestral qui consiste à créer des mosaïques colorées en faïence émaillée. Chaque pièce est taillée à la main et assemblée pour former des motifs géométriques raffinés, reflétant l’élégance et le savoir-faire marocain."
        },
        {
          title: "Calligraphie",
          slug: "calligraphie",
          image: "calligraphie.jpg",
          description:
            "La calligraphie arabe est l’art d’écrire de façon esthétique et artistique. Elle exprime la beauté des lettres et leur harmonie, transformant l’écriture en œuvre d’art spirituelle et visuelle."
        },
        {
          title: "Broderie",
          slug: "broderie",
          image: "broderie.jpg",
          description:
            "La broderie marocaine est un artisanat raffiné qui mêle fils colorés et motifs traditionnels. Chaque pièce raconte une histoire et valorise la richesse culturelle et créative du Maroc."
        }
      ]
    };
  }
};
</script>

<style scoped>
/* Section */
.ateliers-section {
  background-color: #f8f4f0; /* Nude clair */
}

/* Cartes ateliers */
.atelier-card {
  background: #fff;
  border-radius: 15px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  padding: 30px;
  transition: transform 0.3s ease;
}

.atelier-card:hover {
  transform: translateY(-5px);
}

/* Titres */
h1 {
  font-weight: 700;
  color: #4a2c2a;
}

.atelier-title {
  margin-bottom: 15px;
  font-size: 1.8rem;
  font-weight: bold;
  color: #a67c52;
}

/* Images */
.atelier-img {
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
}

/* Texte description */
.atelier-description p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

/* Bouton réserver */
.btn-reserve {
  display: inline-block;
  background-color: #a67c52; /* Nude foncé */
  color: #fff;
  padding: 10px 25px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 8px;
  transition: background-color 0.3s, transform 0.2s;
}

.btn-reserve:hover {
  background-color: #8c5e3c;
  transform: scale(1.05);
  color: #fff;
}
</style>
