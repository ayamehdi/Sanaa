<template>
  <div class="admin-page py-5">
    <div class="container">
      <div class="text-center mb-5">
        <h1 class="title">📊 Tableau de bord Admin</h1>
        <p class="subtitle">Choisissez ce que vous voulez consulter</p>
      </div>

      <!-- Boutons principaux -->
      <div class="d-flex justify-content-center mb-5 gap-4 flex-wrap">
        <button class="main-btn reservations-btn"
                :class="activeSection === 'reservations' ? 'active' : ''"
                @click="activeSection = 'reservations'; selectedAtelier = null">
          Réservations
        </button>
        <button class="main-btn messages-btn"
                :class="activeSection === 'messages' ? 'active' : ''"
                @click="activeSection = 'messages'">
          Messages de contact
        </button>
      </div>

      <!-- ✅ Message de feedback -->
      <div v-if="feedback.message" :class="['alert', feedback.type]" role="alert">
        {{ feedback.message }}
      </div>

      <!-- Section Réservations -->
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
                    <span :class="['badge', getBadgeClass(res.statut)]">
                      {{ res.statut }}
                    </span>
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

      <!-- Section Messages -->
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
    fetchReservations() {
      axios.get("http://localhost:3000/reservations")
        .then(res => this.reservations = res.data)
        .catch(err => console.error(err));
    },
    fetchMessages() {
      axios.get("http://localhost:3000/api/contact")
        .then(res => this.messages = res.data)
        .catch(err => console.error(err));
    },
    filterAtelier(atelier) {
      this.selectedAtelier = atelier;
    },
    async updateStatus(reservation, newStatus) {
      try {
        // ✅ Update in DB
        await axios.put(`http://localhost:3000/reservations/${reservation._id}`, { statut: newStatus });
        reservation.statut = newStatus;

        // ✅ Send email
        await axios.post("http://localhost:3000/send-email", {
          email: reservation.email,
          status: newStatus
        });

        // ✅ Show feedback
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
      setTimeout(() => {
        this.feedback.message = "";
      }, 3000);
    }
  },
  mounted() {
    this.fetchReservations();
    this.fetchMessages();
  }
};
</script>

<style scoped>
.admin-page { background: #f9f7f3; min-height: 100vh; padding-bottom: 50px; }
.title { font-weight: 800; color: #6e4b2c; }
.subtitle { color: #8c7a63; font-size: 1.1rem; }
.main-btn { min-width: 180px; font-weight: bold; font-size: 1.1rem; border: none; padding: 15px 35px; border-radius: 50px; cursor: pointer; transition: all 0.3s ease; box-shadow: 0 4px 15px rgba(0,0,0,0.1); }
.main-btn:hover { transform: translateY(-3px) scale(1.05); }
.reservations-btn, .messages-btn { background: #6e4b2c; color: white; }
.main-btn.active { box-shadow: 0 6px 25px rgba(0,0,0,0.2); }
.atelier-btn { background-color: #c3a77b; color: white; font-weight: bold; border: none; padding: 12px 25px; border-radius: 50px; cursor: pointer; transition: 0.3s; }
.atelier-btn:hover { background-color: #b39765; }
.atelier-btn.active { box-shadow: 0 4px 15px rgba(0,0,0,0.2); transform: translateY(-2px); }
.reservations-table thead { background-color: #6e4b2c; color: white; }
.messages-table thead { background-color: #d4b185; color: white; }
table { border-radius: 10px; overflow: hidden; }
table td, table th { vertical-align: middle !important; }
.table-responsive { box-shadow: 0 8px 20px rgba(0,0,0,0.1); border-radius: 10px; overflow: hidden; margin-bottom: 40px; }
.messages-section h2 { color: #6e4b2c; font-weight: 700; margin-bottom: 20px; }
.badge { padding: 6px 12px; font-size: 0.9rem; border-radius: 10px; }
</style>
