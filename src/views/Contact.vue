<template>
  <div class="container py-5">
    <h1 class="text-center mb-4 text-primary fw-bold">Contactez-nous</h1>
    <p class="text-center text-muted mb-5">
      Une question, une idée ou envie de collaborer ? Laissez-nous un message.
    </p>

    <div class="row justify-content-center">
      <div class="col-md-8 col-lg-6">
        <div class="card shadow-lg border-0 rounded-4">
          <div class="card-body p-4">
            <form @submit.prevent="sendMessage">
              <div class="mb-3">
                <label for="name" class="form-label fw-semibold">Nom complet</label>
                <input type="text" v-model="name" class="form-control" id="name" placeholder="Entrez votre nom" required>
              </div>

              <div class="mb-3">
                <label for="email" class="form-label fw-semibold">Adresse e-mail</label>
                <input type="email" v-model="email" class="form-control" id="email" placeholder="exemple@email.com" required>
              </div>

              <div class="mb-3">
                <label for="message" class="form-label fw-semibold">Votre message</label>
                <textarea v-model="message" class="form-control" id="message" rows="5" placeholder="Écrivez votre message ici..." required></textarea>
              </div>

              <button type="submit" class="btn btn-primary w-100 py-2">
                ✉️ Envoyer
              </button>
            </form>
          </div>
        </div>

        <div v-if="success" class="alert alert-success mt-4" role="alert">
          ✅ Merci ! Votre message a bien été envoyé.
        </div>
        <div v-if="error" class="alert alert-danger mt-4" role="alert">
          ❌ Oups... Une erreur est survenue, veuillez réessayer.
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContactPage",
  data() {
    return {
      name: "",
      email: "",
      message: "",
      success: false,
      error: false
    };
  },
  methods: {
    async sendMessage() {
      try {
        const response = await fetch("http://localhost:3000/api/contact", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.name,
            email: this.email,
            message: this.message
          })
        });

        if (response.ok) {
          this.success = true;
          this.error = false;
          this.name = "";
          this.email = "";
          this.message = "";
        } else {
          this.error = true;
        }
      } catch {
        this.error = true;
      }
    }
  }
};
</script>

<style>
body {
  background-color: #f9f9f9;
}
.card {
  background: white;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
  box-shadow: 0px 10px 25px rgba(0, 0, 0, 0.1);
}
</style>
