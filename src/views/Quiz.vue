<template>
  <div id="navbar">
    <vue-navbar/>
  </div>
  <div id="quiz">
    <vue-quiz/>
  </div>
  <div id="footer">
    <vue-footer/>
  </div>
</template>

<script>
import VueFooter from '../components/Vue-footer.vue'
import VueQuiz from '../components/Vue-quiz.vue'
import VueNavbar from '../components/Vue-navbar.vue'

export default {
  name: 'App',
  components: {VueNavbar, VueFooter, VueQuiz}
}
</script>
  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>