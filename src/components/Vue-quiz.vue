<template>
<br>
<!-- Title -->
    <div id="app">
        <h1 class="text-center m-5">Bird Sound Quizzes</h1>
        <div class="container d-flex flex-row-reverse">
          <button class="btn btn-secondary mx-3" @click="goToCreate()">Create Quiz</button>
          <button class="btn btn-secondary mx-3" @click="goToDelete()">Delete Quiz</button>
        </div>
        <br>
<!-- Search Bar -->
        <div class="container">
             <div class="input-group search-wrapper">
            <input type="search" v-model="searchQuery" class="form-control rounded" placeholder="Search Quizzes" aria-label="Search"
                aria-describedby="search-addon" />
            </div>
        </div>
        <br>
        <br>   
<!-- Quizzes -->
        <div class="container">
          <div class="row justify-content-center">
            <div class="row justify-content-center">
                <div v-for="post of resultQuery" :key="post._id">
                    <div class="container">
                        <div class="col">
                            <p class="text-center">{{post.quizName}}</p>
                            <a href="">
                                <img @click="goToEdit(post._id)" :src="require(`@/assets/${post.image}`)" alt="..." class="img-thumbnail">
                            </a> 
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <br>
        <p class="text-center font-italic font-weight-light text-muted m-5" >Copywrite: Wikipedia.com & Xeno Canto</p>            
    </div>
        </div>
        
</template>


<script>
import axios from 'axios';

export default {
  name: "App",
  data() {
    return {
        data: [],
        posts: [],  
        searchQuery: null,
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.posts.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.quizName.toLowerCase().includes(v));
        });
      } else {
        return this.posts;
      }
    }
  },

  methods: {
    async getData() {
      axios.get('https://bird-quizapi.herokuapp.com/quiz')
            .then(function( response ){
                this.posts = response.data;
            }.bind(this));
    },
    goToEdit(param){
    this.$router.push({name:'Active',query:{id:param}}); 
      },
    goToCreate(param){
    this.$router.push({name:'Create',query:{id:param}}); 
      },
      goToDelete(){
    this.$router.push({name:'Delete'}); 
      },
  },

  created() {
    this.getData();
  }
}
</script>


<style scoped>

</style>