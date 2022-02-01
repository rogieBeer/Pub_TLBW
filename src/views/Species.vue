<template>
  <div id="navbar">
    <vue-navbar/>
  </div>
  <div>
    <vue-topbar/>
  </div>
    <div>
        <vue-species/>
    </div>
  <div id="footer">
    <vue-footer/>
  </div>
</template>

<script>
import VueFooter from '../components/Vue-footer.vue'
import VueNavbar from '../components/Vue-navbar.vue'
import VueSpecies from '../components/Vue-species.vue'
import VueTopbar from '../components/Vue-topbar.vue'

export default {
  name: 'App',
  components: {VueNavbar, VueFooter, VueSpecies, VueTopbar}
}
</script>
 
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  padding: 0;
}
</style>