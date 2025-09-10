// server.js
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const adminRoutes = require("./sanaa-backend/routes/admin");
const connectDB = require("./sanaa-backend/db"); // <-- utilise ton db.js

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB().then(() => {
  console.log("✅ MongoDB est connecté, on peut lancer le serveur et les routes.");

  // Routes Admin
  app.use("/admin", adminRoutes);

  // Reste de ton code pour Réservations, Contact, Email...
  // (copie exactement ton code actuel ici pour les schémas et routes)

  app.listen(3000, () => console.log("✅ Serveur lancé sur http://127.0.0.1:3000"));
}).catch(err => {
  console.error("❌ Impossible de connecter MongoDB :", err);
  process.exit(1);
});