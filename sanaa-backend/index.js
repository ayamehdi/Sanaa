// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ReservationForm from '../views/ReservationForm.vue'
import ReservationView from '../views/ReservationView.vue'
console.log('Router index.js chargé !')
const routes = [
  { path: '/', name: 'home', component: HomeView },

  // La page des détails de l'atelier
  { 
    path: '/atelier/:slug', 
    name: 'reservationview', 
    component: ReservationView, 
    props: true 
  },

  // La page du formulaire de réservation
  { 
    path: '/reservationform/:slug', 
    name: 'reservationform', 
    component: ReservationForm, 
    props: true 
  }
]
console.log(routes)
const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router