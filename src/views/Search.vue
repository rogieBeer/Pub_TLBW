<template>
  <div id="navbar">
    <vue-navbar/>
  </div>
  <div id="search">
    <vue-search/>
  </div>
  <div id="footer">
    <vue-footer/>
  </div>
</template>

<script>
import VueFooter from '../components/Vue-footer.vue'
import VueSearch from '../components/Vue-search.vue'
import VueNavbar from '../components/Vue-navbar.vue'

export default {
  name: 'App',
  components: {VueNavbar, VueFooter, VueSearch}
}
</script>
  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>