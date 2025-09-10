<template>
  <div class="container my-5">
    <div class="text-center mb-5">
      <h2>
        📅 Réserver votre atelier : 
        <span class="atelier-name">{{ atelierName }}</span>
      </h2>
      <p class="lead">Remplissez le formulaire pour réserver votre place</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <form @submit.prevent="submitReservation" class="p-4 shadow rounded bg-light">
          <div class="mb-3">
            <label class="form-label">Nom complet</label>
            <input type="text" v-model="nom" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Email</label>
            <input type="email" v-model="email" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Téléphone</label>
            <input type="text" v-model="telephone" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Date de réservation</label>
            <input type="date" v-model="date" class="form-control" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Nombre de participants</label>
            <input type="number" v-model.number="participants" class="form-control" min="1" required />
          </div>

          <div class="mb-3">
            <label class="form-label">Âge</label>
            <input type="number" v-model.number="age" class="form-control" min="1" required />
          </div>

          <!-- ✅ bouton avec spinner -->
          <button type="submit" class="btn w-100 reservation-btn" :disabled="loading">
            <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
            {{ loading ? "Envoi en cours..." : "Confirmer la réservation" }}
          </button>
        </form>

        <div v-if="successMessage" class="alert alert-success mt-3 text-center">
          {{ successMessage }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ReservationForm",
  props: ["slug"], 
  data() {
    return {
      nom: "",
      email: "",
      telephone: "",
      date: "",
      participants: 1,
      age: null,
      successMessage: "",
      loading: false // ✅ nouvelle variable
    };
  },
  computed: {
    atelierName() {
      return this.slug;
    }
  },
  mounted() {
    console.log("🚀 Mounted ReservationForm - atelierName :", this.atelierName);
    if (!this.atelierName) {
      console.warn("⚠️ Aucun atelierName fourni !");
    }
  },
  methods: {
    async submitReservation() {
      this.loading = true; // ✅ démarrer le loader
      try {
        const res = await axios.post("http://localhost:3000/reservations", {
          nom: this.nom,
          email: this.email,
          telephone: this.telephone,
          atelier: this.atelierName,
          date: this.date,
          participants: this.participants,
          age: this.age
        });

        console.log("✅ Réservation ajoutée :", res.data);

        this.successMessage = `Votre réservation pour l'atelier ${this.atelierName} a été enregistrée avec succès !`;

        // reset du formulaire
        this.nom = "";
        this.email = "";
        this.telephone = "";
        this.date = "";
        this.participants = 1;
        this.age = null;

        this.$emit("reservation-added", res.data);
      } catch (err) {
        console.error("❌ Erreur ajout réservation :", err);
        alert("Erreur lors de la réservation : " + (err.response?.data?.message || err.message));
      } finally {
        this.loading = false; // ✅ arrêter le loader dans tous les cas
      }
    }
  }
};
</script>

<style scoped>
.reservation-btn {
  background-color: #d4b185;
  color: white;
  font-weight: bold;
  border-radius: 30px;
  padding: 12px;
  transition: 0.3s;
}
.reservation-btn:hover {
  background-color: #c3a77b !important;
  transform: translateY(-2px);
}
.form-label {
  font-weight: 500;
  color: #495057;
}
.bg-light {
  background-color: #f9f7f3 !important;
}
.atelier-name {
  color: #d4b185;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
