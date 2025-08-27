<template>
  <div class="container my-5">
    <div class="text-center mb-5">
      <h1>Réservez votre atelier</h1>
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
            <input type="tel" v-model="reservation.phone" class="form-control" id="phone" required>
          </div>

          <div class="mb-3">
            <label for="date" class="form-label"><i class="bi bi-calendar-fill"></i> Date de réservation</label>
            <input type="date" v-model="reservation.date" class="form-control" id="date" required>
          </div>

          <div class="mb-3">
            <label for="participants" class="form-label"><i class="bi bi-people-fill"></i> Nombre de participants</label>
            <input type="number" v-model="reservation.participants" class="form-control" id="participants" min="1" required>
          </div>

          <button type="submit" class="btn btn-lg w-100" style="background-color:#d4b185; color:white;">
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
export default {
  name: "ReservationView",
  data() {
    return {
      reservation: {
        nom: '',
        email: '',
        phone: '',
        date: '',
        participants: 1
      },
      successMessage: ''
    }
  },
  methods: {
    submitReservation() {
      // Ici tu peux envoyer la réservation au backend via axios/fetch
      console.log(this.reservation);
      this.successMessage = "Votre réservation a été enregistrée avec succès !";
      // Reset du formulaire
      this.reservation = { nom: '', email: '', phone: '', date: '', participants: 1 };
    }
  }
}
</script>

<style scoped>
form {
  transition: all 0.3s ease;
}

form:hover {
  transform: translateY(-5px);
}

.btn:hover {
  background-color: #c3a77b !important;
}
</style>
