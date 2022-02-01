<template>
<br>
<br>
<br>
<br>
<div class="container">
    <!-- Title -->
    <div>
        <h3>Delete Quizzes</h3>
    </div>
    <br>
    <!-- Selection -->
    <div class="container">
        <div v-for="post of posts" :key="post._id" class="container m-1">
            <div class="row">
                <div class="col">
                    {{post.quizName}}
                </div>
                <div class="col">
                    <button type="button" class="btn btn-danger" @click="delQuiz(post._id)">DELETE</button>
                </div>
                <div class="col">
                </div>
            </div>
        </div>
    </div>
    <br>
     <button type="button" class="btn btn-primary" @click="goToQuiz()">Refresh Page</button>
    <br>
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
        quizId: null
    }
  }, 
  methods: {
    async getData() {
      axios.get('https://bird-quizapi.herokuapp.com/quiz')
            .then(function( response ){
                this.posts = response.data;
            }.bind(this));
    },
        goToQuiz(){
        this.$router.go()	
        this.$router.push({name:'Delete'}); 
    },
    async delQuiz(quiz) {
        this.quizId = quiz
        await axios.delete('https://bird-quizapi.herokuapp.com/quiz/'+ this.quizId)
             .then(response => {
                 console.log(response);
             });
    },

  },
  created() {
    this.getData();
  },
  
}
</script>
