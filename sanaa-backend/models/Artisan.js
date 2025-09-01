const mongoose = require('mongoose');

const artisanSchema = new mongoose.Schema({
  nom: String,
  ville: String,
  spécialité: String
});

module.exports = mongoose.model('Artisan', artisanSchema); 