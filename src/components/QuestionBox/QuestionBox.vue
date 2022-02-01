<template>
<!-- [shuffledAnswers[correctIndex]] -->
  <div class='question-box-container'>
    <div class='question-container bg-dark'>
      <h3 class='question-text'>{{ cleanData(currentQuestion.question) }}</h3>
      <audio controls preload="none"  v-bind:src="audio" type="audio/mpeg">
      Your browser does not support the audio element.
      </audio>
      <br>
      <img v-bind:src="sono" alt="sonograph">
      <br>
      <button v-for='(answer, index) in shuffledAnswers'
        :key='answer'
        class='possible-answer'
        @click.prevent='selectAnswer(index)'
        :class="answerClass(index)"
      > {{ answer }} </button>
      <div class='buttons-container'>
        <button
          @click='submitAnswer'
          :disabled='selectedIndex === null || answered'
          class='submit-button btn btn-success'
        > submit </button>
        <button
          @click='onNextButtonClick'
          class='next-button btn btn-primary'
          :disabled='!answered'
        > next </button>
      </div>
    </div>
  </div>
</template>

<script>
  import _ from 'lodash';
  export default {
    props: {
      currentQuestion: Object,
      next: Function,
      increment: Function,
      numTotal: Number,
      handleEndOfGame: Function
    },
    methods: {
      forceUpdate() {
        this.$forceUpdate();
      },
      selectAnswer(index) {
        this.selectedIndex = index
        
      },
      shuffleAnswers() {
        let answers = [...this.currentQuestion.incorrect_answers, this.currentQuestion.correct_answer]
        this.shuffledAnswers = _.shuffle(answers)
        this.correctIndex = this.shuffledAnswers.indexOf(this.currentQuestion.correct_answer)
        this.audio = this.currentQuestion.audio
        this.sono = this.currentQuestion.sono
      },
      submitAnswer() {
        let isCorrect = false
        if (this.selectedIndex === this.correctIndex) {
          isCorrect = true
        }
        this.answered = true
        this.increment(isCorrect)
        
      },
      onNextButtonClick() {
        if (this.numTotal === 2) {
          this.handleEndOfGame()
        } else {
          this.next()
          this.forceUpdate()
        }
      },
      answerClass(index) {
        let answerClass = ''
        this.answered ? answerClass = 'disabled' : ''
        if (!this.answered && this.selectedIndex === index) {
          answerClass = 'selected disabled'
        } else if (this.answered && this.correctIndex === index) {
          answerClass = 'correct disabled'
        } else if (this.answered && this.selectedIndex === index && this.correctIndex !== index) {
          answerClass = 'incorrect disabled'
        }
        return answerClass
      },
      cleanData(data) {
        if (data.includes('&quot;') ||
            data.includes('&Uuml;') ||
            data.includes('&#039;') ||
            data.includes('&amp;')) {
          data = data.split('&quot;').join('')
          data = data.split('&#039;').join('')
          data = data.split('&amp;').join(' ')
          data = data.split('&Uuml;').join('U')
          return data
        } else {
          return data
        }
      }
    },
    watch: {
      currentQuestion() {
        this.selectedIndex = null
        this.shuffleAnswers()
        this.answered = false
        
      }
    },
    data() {
      return {
        selectedIndex: null,
        correctIndex: null,
        shuffledAnswers: [],
        answered: false,
        birddata:[],
        audio: null,
        sono: null,
        renderComponent: true,
      }
    },
    computed: {
      answers() {
        let answers = [...this.currentQuestion.incorrect_answers]
        answers.push(this.currentQuestion.correct_answer)
        return answers;
      }
    },
    mounted() {
      this.shuffleAnswers()
      
    }
  }
  
</script>
