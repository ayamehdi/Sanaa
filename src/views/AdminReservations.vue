<template>
  <div class="admin-page py-5">
    <div class="container">
      <div class="text-end mb-3">
        <button @click="logout" class="btn btn-secondary">Déconnexion</button>
      </div>

      <div class="text-center mb-5">
        <h1 class="title">📊 Tableau de bord Admin</h1>
        <p class="subtitle">Choisissez ce que vous voulez consulter</p>
      </div>

      <!-- Boutons -->
      <div class="d-flex justify-content-center mb-5 gap-4 flex-wrap">
        <button class="main-btn reservations-btn"
                :class="activeSection === 'reservations' ? 'active' : ''"
                @click="activeSection = 'reservations'; selectedAtelier = null; fetchReservations()">
          Réservations
        </button>

        <button class="main-btn messages-btn"
                :class="activeSection === 'messages' ? 'active' : ''"
                @click="activeSection = 'messages'; fetchMessages()">
          Messages de contact
        </button>
      </div>

      <!-- Feedback -->
      <div v-if="feedback.message" :class="['alert', feedback.type]" role="alert">
        {{ feedback.message }}
      </div>

      <!-- Réservations -->
      <div v-if="activeSection === 'reservations'">
        <div class="d-flex justify-content-center mb-3 flex-wrap gap-3">
          <button v-for="atelier in ateliers"
                  :key="atelier.value"
                  @click="filterAtelier(atelier.value)"
                  class="atelier-btn"
                  :class="selectedAtelier === atelier.value ? 'active' : ''">
            {{ atelier.label }}
          </button>
        </div>

        <div v-if="selectedAtelier">
          <div v-if="filteredReservations.length > 0" class="table-responsive mb-5">
            <table class="table shadow rounded reservations-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Participants</th>
                  <th>Âge</th>
                  <th>Date</th>
                  <th>Statut</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="res in filteredReservations" :key="res._id">
                  <td>{{ res.nom }}</td>
                  <td>{{ res.email }}</td>
                  <td>{{ res.telephone }}</td>
                  <td>{{ res.participants }}</td>
                  <td>{{ res.age }}</td>
                  <td>{{ res.date }}</td>
                  <td>
                    <span :class="['badge', getBadgeClass(res.statut)]">{{ res.statut }}</span>
                  </td>
                  <td>
                    <button v-if="res.statut === 'nouvelle'" class="btn btn-success btn-sm me-1"
                            @click="updateStatus(res, 'confirmée')">
                      Confirmer
                    </button>
                    <button v-if="res.statut === 'nouvelle'" class="btn btn-danger btn-sm"
                            @click="updateStatus(res, 'refusée')">
                      Refuser
                    </button>
                    <span v-else>-</span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="alert alert-warning text-center">
            Aucune réservation trouvée pour cet atelier.
          </div>
        </div>
      </div>

      <!-- Messages -->
      <div v-if="activeSection === 'messages'" class="messages-section">
        <h2 class="text-center mb-4">📩 Messages de contact</h2>
        <div v-if="messages.length > 0" class="table-responsive">
          <table class="table shadow rounded messages-table">
            <thead>
              <tr>
                <th>Nom</th>
                <th>Email</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="msg in messages" :key="msg._id">
                <td>{{ msg.name }}</td>
                <td>{{ msg.email }}</td>
                <td>{{ msg.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="alert alert-info text-center">
          Aucun message reçu.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AdminReservations",
  data() {
    return {
      ateliers: [
        { label: "Zellige", value: "zellige" },
        { label: "Calligraphie", value: "calligraphie" },
        { label: "Broderie", value: "broderie" }
      ],
      selectedAtelier: null,
      reservations: [],
      messages: [],
      activeSection: null,
      feedback: { message: "", type: "" }
    };
  },
  computed: {
    filteredReservations() {
      if (!this.selectedAtelier) return [];
      return this.reservations.filter(res => res.atelier === this.selectedAtelier);
    }
  },
  methods: {
    async fetchReservations() {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:3000/reservations", {
          headers: { Authorization: token }
        });
        this.reservations = res.data;
      } catch (err) {
        console.error("Erreur fetchReservations :", err);
      }
    },
    async fetchMessages() {
      try {
        const token = localStorage.getItem("adminToken");
        const res = await axios.get("http://localhost:3000/api/contact", {
          headers: { Authorization: token }
        });
        this.messages = res.data;
      } catch (err) {
        console.error("Erreur fetchMessages :", err);
      }
    },
    filterAtelier(atelier) {
      this.selectedAtelier = atelier;
    },
    async updateStatus(reservation, newStatus) {
      try {
        const token = localStorage.getItem("adminToken");
        await axios.put(`http://localhost:3000/reservations/${reservation._id}`, 
          { statut: newStatus },
          { headers: { Authorization: token } }
        );

        reservation.statut = newStatus;

        await axios.post("http://localhost:3000/send-email", 
          { email: reservation.email, status: newStatus },
          { headers: { Authorization: token } }
        );

        this.showFeedback(`Email envoyé à ${reservation.email} pour le statut "${newStatus}"`, "alert-success");
      } catch (err) {
        console.error("Erreur updateStatus :", err);
        this.showFeedback("Erreur lors de la mise à jour ou de l'envoi d'email", "alert-danger");
      }
    },
    getBadgeClass(statut) {
      switch (statut) {
        case "confirmée": return "bg-success";
        case "refusée": return "bg-danger";
        default: return "bg-warning text-dark";
      }
    },
    showFeedback(message, type) {
      this.feedback.message = message;
      this.feedback.type = type;
      setTimeout(() => { this.feedback.message = ""; }, 3000);
    },
    logout() {
      localStorage.removeItem("adminToken");
      this.$router.push("/admin/login");
    }
  },
  mounted() {
    const token = localStorage.getItem("adminToken");
    if (!token) this.$router.push("/admin/login");
  }
};
</script>

<style scoped>
/* Styles simplifiés pour l'admin */
.admin-page { background: #f9fafc; min-height: 100vh; }
.title { font-size: 2.5rem; font-weight: 700; color: #2c3e50; }
.subtitle { color: #6c757d; }
.main-btn { padding: 12px 24px; border-radius: 30px; font-weight: 600; border: none; transition: 0.3s; background: #e9ecef; color: #333; }
.main-btn.active { background: #0d6efd; color: #fff; }
.atelier-btn { padding: 10px 18px; border-radius: 25px; background: #f1f1f1; border: 1px solid #ddd; transition: 0.3s; }
.atelier-btn.active { background: #198754; color: #fff; border-color: #198754; }
.table { background: #fff; border-radius: 12px; overflow: hidden; }
.table thead { background: #0d6efd; color: #fff; }
.table tbody tr:hover { background: #f8f9fa; }
.alert { border-radius: 8px; font-weight: 500; }
</style>
