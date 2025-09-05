import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Metiers from '../views/Metiers.vue'
import Atelier from '../views/ReservationView.vue' // on utilise ReservationView pour chaque atelier
import AdminReservations from '../views/AdminReservations.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  },
  {
    path: '/metiers',
    name: 'Metiers',
    component: Metiers
  },
  {
    path: '/atelier/:name',   // ✅ route dynamique pour chaque atelier
    name: 'Atelier',
    component: Atelier,
    props: true               // on reçoit le nom de l'atelier dans ReservationView
  },
  {
    path: '/admin',
    name: 'Admin',
    component: AdminReservations
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
