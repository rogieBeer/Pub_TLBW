<template>
     <div id="navbar">
        <vue-navbar/>
    </div>
    <div>
        <vue-about/>
    </div>  
    <div id="footer">
        <vue-footer/>
     </div>
</template>

<script>
import VueAbout from '../components/Vue-about.vue'
import VueFooter from '../components/Vue-footer.vue'
import VueNavbar from '../components/Vue-navbar.vue'

export default {
  name: 'App',
  components: {VueNavbar, VueFooter, VueAbout}
}
</script>
  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>