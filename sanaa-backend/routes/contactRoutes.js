const express = require('express');
const Contact = require('../models/Contact'); // Chemin vers le modèle Contact
const router = express.Router();

// Route pour enregistrer un contact
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(200).json({ message: 'Message envoyé avec succès!' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue' });
  }
});

module.exports = router;