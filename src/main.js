// src/main.js
import { createApp } from 'vue'
import App from './App.vue'

// Import du router
import router from './router' // Vue cherchera automatiquement index.js dans ce dossier

// Styles
import './assets/styles.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css'

// Création de l'app Vue
const app = createApp(App)

// Vérifie que le router est chargé
console.log('Router chargé :', router)

// Utilisation du router
app.use(router)

// Montage de l'app
app.mount('#app')
