<template>
  <div class="login-page">
    <div class="login-card">
      <h2>Connexion Admin</h2>
      <form @submit.prevent="login">
        <!-- Email -->
        <div class="input-group">
          <input type="email" v-model="email" placeholder="Email" required />
        </div>

        <!-- Password -->
        <div class="input-group password-group">
          <input :type="showPassword ? 'text' : 'password'" v-model="password" placeholder="Mot de passe" required />
          <button type="button" class="toggle-password" @click="showPassword = !showPassword">
            {{ showPassword ? 'Masquer' : 'Afficher' }}
          </button>
        </div>

        <button type="submit" class="btn-login">Se connecter</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      email: "",
      password: "",
      error: "",
      showPassword: false
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post("http://localhost:3000/admin/login", {
          email: this.email,
          password: this.password
        });

        if (res.data.success) {
          localStorage.setItem("adminToken", res.data.token);
          this.$router.push("/admin");
        } else {
          this.error = res.data.message || "Email ou mot de passe incorrect";
        }
      } catch (err) {
        console.error(err);
        this.error = "Erreur serveur";
      }
    }
  }
};
</script>

<style scoped>
/* Page login centré */
.login-page {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7ece1; /* nude clair */
  font-family: 'Poppins', sans-serif;
}

/* Card */
.login-card {
  background-color: #fff3e6; /* nude doux */
  padding: 50px 40px;
  border-radius: 15px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.12);
  width: 100%;
  max-width: 450px;
  text-align: center;
}

/* Title */
.login-card h2 {
  margin-bottom: 30px;
  color: #a67857;
}

/* Inputs */
.input-group {
  position: relative;
  margin-bottom: 25px;
}

input {
  width: 100%;
  padding: 15px 15px;
  border-radius: 10px;
  border: 1px solid #d6bfa8;
  font-size: 16px;
  outline: none;
  transition: border-color 0.3s;
}

input:focus {
  border-color: #a67857;
}

/* Password toggle button */
.password-group {
  display: flex;
  align-items: center;
}

.toggle-password {
  background: none;
  border: none;
  color: #a67857;
  cursor: pointer;
  font-weight: bold;
  margin-left: 10px;
}

/* Button login */
.btn-login {
  width: 100%;
  padding: 15px;
  background-color: #a67857;
  color: #fff;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
}

.btn-login:hover {
  background-color: #8c5e43;
}

/* Error message */
.error {
  color: #e74c3c;
  margin-top: 15px;
  font-size: 14px;
}
</style>
