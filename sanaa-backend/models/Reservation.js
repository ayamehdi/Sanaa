const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  telephone: { type: String, required: true },
  date: { type: String, required: true },
  participants: { type: Number, required: true },
  atelier: { type: String, required: true }, // nouveau champ
  statut: { type: String, default: 'nouvelle' } // nouveau champ
});

module.exports = mongoose.model('Reservation', reservationSchema);