<template>
  <div id="app">
    <!-- Navbar fixe -->
    <nav class="my-navbar">
      <div class="nav-container">
        <div class="logo">SANAA</div>
        <div class="links">
          <router-link to="/">Accueil</router-link>
          <router-link to="/about">À propos</router-link>
          <router-link to="/contact">Contact</router-link>
          <router-link to="/metiers">Métiers</router-link>
        </div>
      </div>
    </nav>

    <!-- Contenu principal -->
    <div class="main-content">
      <router-view></router-view>
    </div>

       <!-- Footer -->
    <footer class="footer">
      <div class="footer-content">
        <p>© 2025 SANAA — Ateliers immersifs : tradition & modernité</p>

        <div class="footer-contact">
          <p>
            <i class="bi bi-telephone-fill"></i>
            <a href="tel:0617910573">0617910573</a>
          </p>
          <p>
            <i class="bi bi-envelope-fill"></i>
            <a href="mailto:sanaa.contact@gmail.com">sanaa.contact@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
/* Structure globale : footer fixé en bas */
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh; /* toute la hauteur de la fenêtre */
}

/* Navbar fixe */
.my-navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: linear-gradient(90deg, #d4b185, #8c6239);
  padding: 12px 30px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  z-index: 1000;
}

/* Conteneur pour aligner logo et liens */
.nav-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* Logo */
.logo {
  font-size: 1.4rem;
  font-weight: bold;
  color: #fff;
  letter-spacing: 2px;
}

/* Liens */
.links a {
  margin: 0 15px;
  text-decoration: none;
  color: #fff;
  font-weight: 500;
  transition: color 0.3s, border-bottom 0.3s;
}
.links a:hover {
  color: #ffd699;
  border-bottom: 2px solid #ffd699;
  padding-bottom: 2px;
}

/* Contenu principal */
.main-content {
  flex: 1; /* pousse le footer en bas */
  padding-top: 80px; /* espace sous la navbar */
  padding-bottom: 120px; /* espace avant le footer */
}

/* Footer fixé en bas */

.footer {
  background: #222;
  color: #eee;
  padding: 20px 15px;
  text-align: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.15);
}

.footer-content {
  max-width: 1200px;
  margin: auto;
}

.footer p {
  margin: 5px 0;
  font-size: 14px;
}

.footer-contact {
  margin-top: 10px;
}

.footer-contact i {
  margin-right: 8px;
  color: #d4b185;
}

.footer-contact a {
  color: #eee;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-contact a:hover {
  color: #d4b185;
}
</style>
