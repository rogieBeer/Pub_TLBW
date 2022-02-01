<template>
    <div class="container">
        <div class="row">
            <div class="col">
            <h1>The LITTLE <span style="background-color: #121212; color: #ffffff">BIRD</span> WEBSITE</h1>
            <br>
            <div class="container">
                <p><span class="lead" style="font-family: 'Open Sans', sans-serif; font-size: 16px">Nau mai, welcome to the Little Bird Website! Here you can learn all you need to know about native New Zealand Bird Species. Click below to start testing your bird call knowledge, or sign up to track your progress!</span>
                </p>
                <p><span class="lead" style="font-family: 'Open Sans', sans-serif; font-size: 16px"><em>Ko te manu e kai i te miro nōna te ngahere, Ko te manu kai i te mātauranga, nōna te ao.</em></span></p>
                <p><span class="lead" style="font-family: 'Open Sans', sans-serif; font-size: 16px">The bird that eats the miro berry owns the forest. The bird that feasts on knowledge owns the world.</span></p>
                <br><br>
                <button @click='goToQuiz' type="button" class="btn btn-secondary">Take a Quiz</button>
            </div>
        </div>
        <div class="col">
            <img class="img-fluid rounded-sm" src="../assets/tui.jpg" alt="Image of Tui" />
        </div>
    </div>      
    </div>
    
</template>

<script>
    export default {

  name: 'App',
  methods: {
    goToQuiz(){
      this.$router.push('/Quiz'); 
      }
  }
}
</script>

<style scoped>
    div {
        margin-top: 5%;
        margin-bottom: 2%;
    }
</style>