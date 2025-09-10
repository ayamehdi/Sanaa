// sanaa-backend/db.js
const mongoose = require("mongoose");

const mongoURI = "mongodb://127.0.0.1:27017/sanaa"; // utilise 127.0.0.1 au lieu de localhost

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("✅ Connecté à MongoDB avec succès !");
  } catch (err) {
    console.error("❌ Erreur connexion MongoDB :", err);
    process.exit(1); // quitte le serveur si la connexion échoue
  }

  mongoose.connection.on("error", err => {
    console.error("❌ Erreur MongoDB :", err);
  });

  mongoose.connection.once("open", () => {
    console.log("📌 Connexion MongoDB ouverte !");
  });
};

module.exports = connectDB;
