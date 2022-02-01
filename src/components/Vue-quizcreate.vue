<template>
<br>
<br>
<div class="container">
    <!-- Title -->
    <div>
        <h3>Create Quiz</h3>
    </div>
    <br>
    <!-- Selection -->
    <div>
        <div class="container">
            <input v-model="quizName" class="input" type="text" placeholder="Name of Quiz">
        </div>
        <br>
        <br>
        <div id="filter" class="form-group container">
            <label for="answer">Correct Answer:</label>
            <select class="form-control" id="answer"  v-model="answer" required>
                <option disabled value="">Please select one</option>
                <option  v-for="post of posts" :key="post._id" :selected="answer">
                    {{post.commonName}}
                </option>                
            </select>
        </div>
        <div id="filter" class="form-group container">
            <label for="question1">Wrong Answer:</label>
            <select class="form-control" id="question1" v-model="question1" required>
                <option disabled value="">Please select one</option>
                <option  v-for="post of posts" :key="post._id" :selected="question1">
                    {{post.commonName}}
                </option>
            </select>
        </div>
        <div id="filter" class="form-group container">
            <label for="question2">Wrong Answer:</label>
            <select class="form-control" id="question2" v-model="question2" required>
                <option disabled value="">Please select one</option>
                <option  v-for="post of posts" :key="post._id" :selected="question2">
                    {{post.commonName}}
                </option>    
            </select>
        </div>
        <div id="filter" class="form-group container">
            <label for="question3">Wrong Answer:</label>
            <select class="form-control" id="question3" v-model="question3" required>
                <option disabled value="">Please select one</option>
                <option  v-for="post of posts" :key="post._id" :selected="question3">
                    {{post.commonName}}
                </option>
            </select>
        </div>
        <div class="form-group container" id="v-model-image" >
        <label for="difficulty">Question Dificulty:</label>
        <select class="form-control" id="difficulty" v-model="difficulty">
            <option disabled value="">Please select one</option>
            <option>easy</option>
            <option>medium</option>
            <option>hard</option>
        </select>
        </div>
        <div class="container">
            <div class="row">
                <div class="col">
                    <button @click="getQuestion()" class="btn btn-secondary">Add Question</button>
                </div>
                <div class="col">
                    <p>{{qError}} {{matching}}</p>
                </div>
                <div class="col">
                    <p>{{qCount}}: Questions added</p>
                </div>
                <div class="col">
                </div>
            </div>
        </div>
        <br>
        <br>
    </div>
    <div class="form-group container" id="v-model-image" >
        <label for="image">Image:</label>
        <select class="form-control" id="image" v-model="image">
            <option disabled value="">Please select one</option>
            <option>easy.jpg</option>
            <option>medium.jpg</option>
            <option>hard.jpg</option>
        </select>
    </div>
    <div class="container">
          <button @click="addQuiz()" class="btn btn-secondary">Submit</button>  
    </div>
    <div class="container">
        <p>{{error}}{{countError}}</p>
        <br>
    </div>
    <br>
    <br>
</div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
    return {
        posts: [],
        error: null,
        countError: null,
        qError: null,
        matching: null,
        qCount: 0,
        // Main 
        image: null,
        quizName: null,
        // quiz input
        answer: null,
        question1: null,
        question2: null,
        question3: null,
        difficulty: null,
        audio: null,
        sono: null,
        answerImage: null,
        category: "Birds",
        type: "multiple",
        question: "What Bird Makes This Sound?",
        results: [],
    }
  }, 
  methods: {
    async getData() {
      axios.get('https://heroku-birdv2-api.herokuapp.com/birds')
            .then(function( response ){
                this.posts = response.data;
            }.bind(this));
    },
    async addQuiz() {
        let x = Math.floor((Math.random() * 100) + 9999999);
        const element = document.querySelector('#post-request-set-headers .article-id');
        const article = {
                    _id: x,
                    results : this.results,
                    image: this.image,
                    quizName: this.quizName
            };
        const headers = { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"

        };
        if (this.answer != null && this.image != null && this.difficulty != null && this.question3 != null && this.question2 != null && this.question1 != null && this.quizName != null)
            {
                if (this.qCount >= 2){
                    axios.post('https://bird-quizapi.herokuapp.com/quiz', article, { headers })
                    .then(response => element.innerHTML = response.data.id);
                    this.goToQuiz()
                }
                else{
                    this.error = null
                    this.countError = "Please enter a minimum of 2 Questions"
                }
            }
        else
            {
                this.countError = null
                this.error = "please complete form"
            }
        },
        
        getQuestion() {
            if (this.answer == this.question3 || this.answer == this.question2 || this.answer == this.question1 ||  this.question3 == this.question2 || this.question3 == this.question1  || this.question1 == this.question2 || this.question1 == this.question2 || this.question2 == this.question1 || this.question2 == this.question3){
                this.matching = null
                this.qError = 'Cannot have the same questions'     
            }
            else {
                if (this.answer != null && this.question3 != null && this.question2 != null && this.question1 != null && this.difficulty != null) {
                    for (let item of this.posts){
                        if (item.commonName == this.answer){
                           this.results.push({
                                category: this.category,
                                type: this.type,
                                difficulty: this.difficulty,
                                question: this.question,
                                correct_answer: this.answer,
                                incorrect_answers: [this.question1, this.question2, this.question3],
                                audio: item.xenoCanto.file,
                                sono: item.xenoCanto.sono.med,
                                image: "this.image" // need to fix
                           })
                           this.qCount ++;
                           this.qError = null;
                           this.matching = null; 
                        }
                    }

                }
                else {
                    this.qError = null
                    this.matching = "Answer Missing"  
                }
            }
            
        },
        goToQuiz(){
        this.$router.push({name:'Home'}); 
        },

  },
  created() {
    this.getData();
  },
  
}
</script>
