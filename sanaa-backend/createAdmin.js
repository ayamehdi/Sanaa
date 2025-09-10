// createAdmin.js
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const MONGO_URI = "mongodb://127.0.0.1:27017/sanaa"; // adapte si besoin

const AdminSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});
const Admin = mongoose.model("Admin", AdminSchema);

(async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connecté à MongoDB pour insertion admin");

    const email = "admin@sanaa.com";   // change si tu veux
    const plainPassword = "123456";    // change si tu veux

    const existing = await Admin.findOne({ email });
    if (existing) {
      console.log("Admin existe déjà :", existing.email);
      process.exit(0);
    }

    const hash = await bcrypt.hash(plainPassword, 10);
    const admin = new Admin({ email, password: hash });
    await admin.save();
    console.log("Admin créé avec succès :", email);
    process.exit(0);
  } catch (err) {
    console.error("Erreur createAdmin.js :", err);
    process.exit(1);
  }
})();
