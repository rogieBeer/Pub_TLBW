<template>
  <div id="navbar">
    <vue-navbar/>
  </div>
  <div id="mainSection">
      <br>
      <br>
      <br>
    <h1>Privacy Statement</h1>

    <p> We collect personal information from you, including information about your:</p>
    <ul>
        <li>name</li>
        <li>contact information</li>
    </ul>
    <p></p>
    <p> We collect your personal information in order to:</p>
    <ul>
        <li>create your account, and allow you to track and save your test progress.</li>
    </ul>
    <p></p>
    <p>Providing some information is optional. If you choose not to enter your email address, or provide a username,<br>you will be unable to create your account, or track your progress.<br>However you can still take random tests at any time without an account.</p><br>
    <p>You have the right to ask for a copy of any personal information we hold about you, and to ask for it to be corrected if you think it is wrong.<br>If you would like to ask for a copy of your information, or to have it corrected, please contact us at P.Battley@massey.ac.nz.</p>
    <br>
    <br>
  </div>
  <div id="footer">
    <vue-footer/>
  </div>
</template>

<script>
import VueFooter from '../components/Vue-footer.vue'
import VueNavbar from '../components/Vue-navbar.vue'

export default {
  name: 'App',
  components: {VueNavbar, VueFooter}
}
</script>
  
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>