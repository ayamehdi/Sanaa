import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Metiers from '../views/Metiers.vue'
import Atelier from '../views/ReservationView.vue'
import ReservationForm from '../views/ReservationForm.vue'
import AdminReservations from '../views/AdminReservations.vue'
import AdminLogin from '../views/AdminLogin.vue'  // import du login admin

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/contact', name: 'Contact', component: Contact },
  { path: '/metiers', name: 'Metiers', component: Metiers },
  { path: '/atelier/:name', name: 'Atelier', component: Atelier, props: true },
  { path: '/reservationform/:slug', name: 'reservationform', component: ReservationForm, props: true },

  // Route admin login
  { path: '/admin/login', name: 'AdminLogin', component: AdminLogin },

  // Route admin protégée
  { 
    path: '/admin', 
    name: 'Admin', 
    component: AdminReservations,
    beforeEnter: (to, from, next) => {
      const token = localStorage.getItem("adminToken"); // vérifie le token
      if (!token) {
        next("/admin/login"); // pas de token → redirection login
      } else {
        next(); // token présent → accès autorisé
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
