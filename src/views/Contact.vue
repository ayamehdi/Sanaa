<template>
  <div class="content">
    <h1>Contactez-nous</h1>
    <p>Vous pouvez nous envoyer un message via ce formulaire.</p>
    <form @submit.prevent="submitForm">
      <div>
        <label for="name">Nom :</label>
        <input type="text" id="name" v-model="form.name" required />
      </div>
      <div>
        <label for="email">Email :</label>
        <input type="email" id="email" v-model="form.email" required />
      </div>
      <div>
        <label for="message">Message :</label>
        <textarea id="message" v-model="form.message" required></textarea>
      </div>
      <button type="submit">Envoyer</button>
    </form>

    <div v-if="submitted">
      <h2>Merci pour votre message, {{ form.name }} !</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        message: ''
      },
      submitted: false
    }
  },
  methods: {
    submitForm() {
      // Afficher un message de confirmation
      this.submitted = true;

      // Réinitialiser le formulaire
      this.form.name = '';
      this.form.email = '';
      this.form.message = '';
    }
  }
}
</script>

<style scoped>
/* Form styling */
form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 15px;
}

form label {
  margin-bottom: 5px;
}

form input, form textarea {
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #333;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #555;
}
</style>