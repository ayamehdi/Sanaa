<template>
  <div class="container my-5">
    <div class="text-center mb-5">
      <h1>Réservez votre atelier : <span class="atelier-name">{{ name }}</span></h1>
      <p class="lead">Remplissez le formulaire pour réserver votre place</p>
    </div>

    <div class="row justify-content-center">
      <div class="col-md-8">
        <form @submit.prevent="submitReservation" class="p-4 shadow rounded bg-light">

          <div class="mb-3">
            <label for="name" class="form-label"><i class="bi bi-person-fill"></i> Nom complet</label>
            <input type="text" v-model="reservation.nom" class="form-control" id="name" required>
          </div>

          <div class="mb-3">
            <label for="email" class="form-label"><i class="bi bi-envelope-fill"></i> Email</label>
            <input type="email" v-model="reservation.email" class="form-control" id="email" required>
          </div>

          <div class="mb-3">
            <label for="phone" class="form-label"><i class="bi bi-telephone-fill"></i> Téléphone</label>
            <input type="tel" v-model="reservation.telephone" class="form-control" id="phone" required>
          </div>

          <div class="mb-3">
            <label for="participants" class="form-label"><i class="bi bi-people-fill"></i> Nombre de participants</label>
            <input type="number" v-model="reservation.participants" class="form-control" id="participants" min="1" required>
          </div>

          <div class="mb-3">
            <label for="age" class="form-label"><i class="bi bi-person-badge-fill"></i> Âge</label>
            <input type="number" v-model="reservation.age" class="form-control" id="age" required>
          </div>

          <div class="mb-3">
            <label for="date" class="form-label"><i class="bi bi-calendar-fill"></i> Date de réservation</label>
            <input type="date" v-model="reservation.date" class="form-control" id="date" required>
          </div>

          <button type="submit" class="btn btn-lg w-100 reservation-btn">
            Confirmer la réservation
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
  name: "ReservationView",
  props: ["name"],
  data() {
    return {
      reservation: {
        nom: "",
        email: "",
        telephone: "",
        participants: 1,
        age: "",
        atelier: this.name,
        date: ""
      },
      successMessage: ""
    };
  },
  methods: {
    submitReservation() {
      axios
        .post("http://localhost:3000/reservations", this.reservation)
        .then(() => {
          this.successMessage =
            `Votre réservation pour l'atelier ${this.name} a été enregistrée avec succès !`;
          this.reservation = {
            nom: "",
            email: "",
            telephone: "",
            participants: 1,
            age: "",
            atelier: this.name,
            date: ""
          };
        })
        .catch((err) => {
          console.error(err);
          alert("Erreur lors de la réservation : " + (err.response?.data?.message || err.message));
        });
    }
  }
};
</script>

<style scoped>
.reservation-btn {
  background-color: #d4b185;
  color: white;
  font-weight: bold;
}
.reservation-btn:hover {
  background-color: #c3a77b !important;
}
.atelier-name {
  color: #d4b185;
  font-weight: bold;
  text-transform: capitalize;
}
</style>
