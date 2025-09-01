const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  nom: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  participants: { type: Number, required: true },
  message: { type: String } // optional
});

module.exports = mongoose.model('Reservation', reservationSchema);