<template>
<br>
<div id="app">
    <div class="header-container">
        <h1 class='title'>{{quizSettings.quizName}}</h1>
    </div> 
    <Header
      :numCorrect='numCorrect'
      :numTotal='numTotal'
      :roundNumber='index'
      :rulesVisible='rulesVisible'
      :handleRulesVisible='handleRulesVisible'
    />
    <QuestionBox
      v-if='questions.length && !endOfGame '
      :currentQuestion='questions[index]'
      :next='next'
      :increment='increment'
      :numTotal='numTotal'
      :handleEndOfGame='handleEndOfGame'
      :class="[ rulesVisible ? 'hidden' : '']"
    />
    <Rules v-if='rulesVisible'/>
    <h1 v-if='!questions.length' class='loading-text'>loading...</h1>
    <div v-if='endOfGame' class='game-over-container'>
      <p class='game-over-text'>game over!</p>
      <p class='number-correct-text'>You got <span class='num-correct'>{{numCorrect}}</span> correct!</p>
      <button class='play-again-button btn btn-secondary mx-3' @click='startGame'>play again!</button>
      <button class='play-again-button btn btn-secondary mx-3'>Subscribe</button>
      <button class='play-again-button btn btn-secondary mx-3'>Email Score</button>
      <button class='play-again-button btn btn-secondary mx-3' @click='goToQuiz'>Return</button>
    </div>
  </div>
  <br>
</template>

<script>       
import Header from '../components/Header/Header.vue'
import QuestionBox from '../components/QuestionBox/QuestionBox.vue'
import Rules from '../components/Rules/Rules.vue'
export default {

  name: 'App',
  components: {
    Header,
    QuestionBox,
    Rules
  },
  methods: {
    goToQuiz(){
      this.$router.push('/Quiz'); 
      },
    next() {
      this.index++
    },
    increment(isCorrect) {
      if (isCorrect) {
        this.numCorrect++
      }
      this.numTotal++
    },
    handleEndOfGame() {
      this.endOfGame = true
    },
    startGame() {
        this.index = 0
        this.numCorrect = 0
        this.numTotal = 0
        fetch('https://bird-quizapi.herokuapp.com/quiz/' + this.quizID)
            .then(response => response.json())
            .then(apiData => this.quizSettings = apiData)
            .then(apiData => this.questions = apiData.results)
            .then(() => this.endOfGame = false)   
    },
    handleRulesVisible() {
      if (this.rulesVisible) {
        this.rulesVisible = false
      } else {
        this.rulesVisible = true
      }
    },
  },
  data() {
    return {
      questions: [],
      index: 0,
      numCorrect: 0,
      numTotal: 0,
      endOfGame: false,
      rulesVisible: false,
      data: {},
      quizID: this.$route.query.id,
      quizSettings:[]
    }
  },
  mounted() {
    this.startGame()
  }
}
</script>


<style scoped>
    @import '../components/Header/Header.css';
    @import '../components/QuestionBox/QuestionBox.css';
    @import '../components/Rules/quizView.css';

</style>