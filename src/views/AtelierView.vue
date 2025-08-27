<template>
  <div v-if="atelier" class="container my-5">
    <div class="row align-items-center g-5">
      <!-- Image à gauche -->
      <div class="col-md-6">
        <img
          :src="atelier.image"
          :alt="atelier.title"
          class="img-fluid rounded shadow"
          style="max-height:520px; object-fit:cover; width:100%;"
        >
      </div>

      <!-- Contenu à droite -->
      <div class="col-md-6 text-center text-md-start">
        <h1 class="mb-3 fw-bold">{{ atelier.title }}</h1>
        <p class="text-muted mb-4">{{ atelier.subtitle }}</p>

        <!-- Ligne d'icônes seulement (avec tooltips pour afficher la valeur) -->
        <div class="d-flex flex-wrap gap-3 align-items-center justify-content-center justify-content-md-start mb-4">
          <button
            class="icon-badge"
            type="button"
            data-bs-toggle="tooltip"
            :title="`Ville : ${atelier.ville}`"
          >
            <i class="bi bi-geo-alt-fill"></i>
          </button>

          <button
            class="icon-badge"
            type="button"
            data-bs-toggle="tooltip"
            :title="`Prix : ${atelier.price} MAD`"
          >
            <i class="bi bi-cash-stack"></i>
          </button>

          <button
            class="icon-badge"
            type="button"
            data-bs-toggle="tooltip"
            :title="`Horaire : ${atelier.horaire}`"
          >
            <i class="bi bi-clock-fill"></i>
          </button>

          <button
            class="icon-badge"
            type="button"
            data-bs-toggle="tooltip"
            :title="`Durée : ${atelier.duree}`"
          >
            <i class="bi bi-hourglass-split"></i>
          </button>
        </div>

        <p class="lead">{{ atelier.description }}</p>

        <!-- Gros bouton beige -->
       <router-link to="/reservation" class="btn btn-lg" style="background-color:#d4b185; color:white;">
  Réserver maintenant
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
import { Tooltip } from 'bootstrap'

// importe tes images (évite require() dans data)
import zelligeImg from '@/assets/zellige.jpg'
import calligraphieImg from '@/assets/calligraphie.jpg'
import broderieImg from '@/assets/broderie.jpg'

export default {
  name: 'AtelierView',
  data() {
    return {
      ateliers: {
        zellige: {
          title: 'Atelier Zellige',
          subtitle: 'Mosaïque traditionnelle marocaine',
          description: "Découvrez l’art ancestral du zellige et réalisez votre propre motif avec l’aide d’un maître artisan.",
          price: 250,
          ville: 'Fès',
          horaire: '10:00 - 12:30',
          duree: '2h30',
          image: zelligeImg
        },
        calligraphie: {
          title: 'Atelier Calligraphie',
          subtitle: 'Beauté des lettres arabes',
          description: "Initiez-vous à la calligraphie, apprenez les bases des traits et composez votre prénom en arabe.",
          price: 200,
          ville: 'Rabat',
          horaire: '15:00 - 17:00',
          duree: '2h',
          image: calligraphieImg
        },
        broderie: {
          title: 'Atelier Broderie',
          subtitle: 'Fils, motifs et patience',
          description: "Explorez les techniques de broderie marocaine et repartez avec une petite création personnalisée.",
          price: 300,
          ville: 'Meknès',
          horaire: '11:00 - 13:30',
          duree: '2h30',
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
  },
  mounted() {
    // activer les tooltips Bootstrap
    const els = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    els.forEach(el => new Tooltip(el))
  }
}
</script>

<style scoped>
/* pastille ronde pour icônes */
.icon-badge {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  border: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f3efe9;   /* beige très doux */
  box-shadow: 0 6px 14px rgba(0,0,0,0.07);
  transition: transform .2s ease, box-shadow .2s ease;
  font-size: 1.4rem;
  color: #222;
}
.icon-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.10);
}

/* Bouton beige en utilisant les variables Bootstrap (meilleure priorité) */
.custom-btn {
  --bs-btn-bg: #d9c3a9;              /* beige */
  --bs-btn-border-color: #d9c3a9;
  --bs-btn-color: #1f1f1f;
  --bs-btn-hover-bg: #c9b091;
  --bs-btn-hover-border-color: #c9b091;
  --bs-btn-hover-color: #fff;
  --bs-btn-focus-shadow-rgb: 201, 176, 145;
  padding: 14px 36px;
  border-radius: 40px;
  font-weight: 600;
  letter-spacing: .2px;
}
</style>
