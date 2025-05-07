<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/about">À propos</router-link>
        <router-link to="/contact">Contact</router-link>
    </nav>
    <router-view></router-view> <!-- affiche la page en fonction de l’URL -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
nav {
  background: #f2f2f2;
  padding: 10px;
}
nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #333;
}
</style>