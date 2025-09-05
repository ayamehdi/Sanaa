const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// Connexion MongoDB
// =====================
mongoose.connect("mongodb://localhost:27017/sanaa", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// =====================
// Schéma Réservation
// =====================
const ReservationSchema = new mongoose.Schema({
  nom: String,
  email: String,
  telephone: String,
  atelier: String,
  date: String,
  participants: Number,
  age: Number,
  statut: { type: String, default: "nouvelle" }
});

const Reservation = mongoose.model("Reservation", ReservationSchema);

// =====================
// Schéma Contact
// =====================
const ContactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  date: { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", ContactSchema);

// =====================
// Routes Réservations
// =====================

// ➕ Ajouter une réservation
app.post("/reservations", async (req, res) => {
  try {
    const newRes = new Reservation(req.body);
    await newRes.save();
    res.status(201).json(newRes);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la réservation", error: err });
  }
});

// 📋 Voir toutes les réservations
app.get("/reservations", async (req, res) => {
  try {
    const all = await Reservation.find();
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du chargement des réservations", error: err });
  }
});

// ✏️ Changer le statut
app.put("/reservations/:id", async (req, res) => {
  try {
    const updated = await Reservation.findByIdAndUpdate(
      req.params.id,
      { statut: req.body.statut },
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la mise à jour", error: err });
  }
});

// =====================
// Routes Contact
// =====================

// ➕ Ajouter un message de contact
app.post("/api/contact", async (req, res) => {
  try {
    const newMsg = new Contact(req.body);
    await newMsg.save();
    res.status(201).json({ message: "Message envoyé avec succès !" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'envoi du message", error: err });
  }
});

// 📋 Voir tous les messages
app.get("/api/contact", async (req, res) => {
  try {
    const all = await Contact.find().sort({ date: -1 });
    res.json(all);
  } catch (err) {
    res.status(500).json({ message: "Erreur lors du chargement des messages", error: err });
  }
});

// =====================
// Envoi d'email (Nodemailer)
// =====================
app.post("/send-email", async (req, res) => {
  const { email, status } = req.body;

  try {
    // ⚠️ Mets ici ton email et mot de passe d'application Gmail
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ayafaouti@gmail.com",          // ton email Gmail
        pass: "yibm zxos pnhl fucu"          // mot de passe d’application Gmail
      }
    });

    const subject = status === "confirmée"
      ? "Votre réservation a été confirmée 🎉"
      : "Votre réservation a été refusée ❌";

    const text = status === "confirmée"
      ? "Bonjour, votre réservation a été confirmée. Merci de votre confiance !"
      : "Bonjour, malheureusement votre réservation a été refusée.";

    await transporter.sendMail({
      from: `"Sanaa Ateliers" <TON_EMAIL@gmail.com>`,
      to: email,
      subject,
      text
    });

    res.json({ message: "Email envoyé avec succès ✅" });
  } catch (err) {
    console.error("Erreur email :", err);
    res.status(500).json({ message: "Erreur lors de l'envoi de l'email", error: err });
  }
});

// =====================
// Lancer le serveur
// =====================
app.listen(3000, () => console.log("✅ Serveur lancé sur http://localhost:3000"));
