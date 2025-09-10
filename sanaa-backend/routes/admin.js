// sanaa-backend/routes/admin.js
const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// =====================
// Créer un admin (à utiliser une seule fois)
// =====================
router.post("/create", async (req, res) => {
  const { email, password } = req.body;
  try {
    // Vérifier si l'admin existe déjà
    const existing = await Admin.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: "Admin déjà existant" });
    }

    // Hacher le mot de passe
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const admin = new Admin({ email, password: hashedPassword });
    await admin.save();

    res.json({ success: true, message: "Admin créé avec succès !" });
  } catch (err) {
    console.error("Erreur création admin :", err);
    res.status(500).json({ success: false, message: "Erreur serveur" });
  }
});

// =====================
// Login admin
// =====================
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.json({ success: false, message: "Email non trouvé" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Mot de passe incorrect" });
    }

    const token = jwt.sign({ id: admin._id }, "SECRET_KEY", { expiresIn: "1h" });
    res.json({ success: true, message: "Connexion réussie", token });
  } catch (err) {
    console.error("Erreur login admin :", err);
    res.status(500).json({ success: false, message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
