const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contactRoutes = require('./routes/contactRoutes'); // Route des contacts

// Importer les modèles
const Artisan = require('./models/Artisan');
const Contact = require('./models/Contact');
const Reservation = require('./models/Reservation'); // ✅ Nouveau modèle Reservation

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', contactRoutes); // Utiliser les routes contact

// Connexion à MongoDB
mongoose.connect('mongodb://localhost:27017/sanaa', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connecté à MongoDB');
}).catch((err) => {
  console.error('❌ Erreur MongoDB:', err);
});

// Route de base
app.get('/', (req, res) => {
  res.send('API backend de SANAA');
});


// =======================
// 🔹 ARTISANS
// =======================

// Récupérer tous les artisans
app.get('/artisans', async (req, res) => {
  try {
    const artisans = await Artisan.find();
    res.json(artisans);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Ajouter un artisan
app.post('/artisans', async (req, res) => {
  const artisan = new Artisan({
    nom: req.body.nom,
    metier: req.body.metier
  });

  try {
    const nouveau = await artisan.save();
    res.status(201).json(nouveau);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// =======================
// 🔹 CONTACTS
// =======================

// Récupérer tous les contacts
app.get('/api/contact', async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =======================
// 🔹 RESERVATIONS
// =======================

// Ajouter une réservation
app.post('/api/reservations', async (req, res) => {
  try {
    const reservation = new Reservation(req.body);
    const saved = await reservation.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Récupérer toutes les réservations
app.get('/api/reservations', async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// =======================
// 🚀 Démarrage du serveur
// =======================
app.listen(3000, () => {
  console.log('🚀 Serveur lancé sur http://localhost:3000');
});
