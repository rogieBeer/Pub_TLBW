<template>
<br>
<!-- Title -->
    <div id="app">
        <h1 class="text-center m-5">New Zealand Bird Species</h1>
    <div class="container d-flex flex-row-reverse">
      <button class="btn btn-secondary mx-3" @click="goToAdd()">Add Bird</button>
    </div>
    <br>
<!-- Search Bar -->
        <div class="container">
             <div class="input-group search-wrapper">
            <input type="search" v-model="searchQuery" class="form-control rounded" placeholder="Search Common Name" aria-label="Search"
                aria-describedby="search-addon" />
            </div>
        </div>
        <br>
<!-- Images -->
        <div class="container">
            <div class="row justify-content-center">
            <div v-for="post of resultQuery" :key="post._id">
                <div class="col gallery_product filter">
          <a class="" rel="ligthbox" href="#" data-toggle="modal" v-bind:data-target="'.bd-' + post._id">
            {{addURL(post._id)}}
            <img  class="img-responsive" alt= "X" :src="url" />
            <div class='img-info'>
              <h6>{{ post.commonName }}</h6>
              <p>{{ post.binomialName }}</p>
            </div>
            <div>
                <div v-bind:class="'modal fade bd-'+ post._id" tabindex="-1" role="dialog" v-bind:aria-labelledby="'aria'+post._id" aria-hidden="true">
              <div class="modal-dialog modal-lg" role="document">
                <div class="modal-content ">
                  <div class="modal-header ">
                    <h5 class="modal-title" id="exampleModalLongTitle">{{ post.commonName }}</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body ">
                    <div class="row">
                      <div class="col">
                        <h4 class="">Name</h4>
                        <p>Species: {{ post.binomialName }}</p>
                        <p>Order: {{ post.order }}</p>
                        <div id="habitat" v-for="habitat in post.habitat" v-bind:key="habitat">
                          <p>Habitat: {{ habitat }}</p>
                        </div>
                        <p>This species is {{ post.statusEndemic }} to New Zealand</p>
                      </div>
                      <div class="col">
                        <img  class="img-responsive" alt= "" :src="url" />
                      </div>
                    </div>              
                    <h4 class="">Summary</h4>
                    <p v-if="post.summary !== undefined">{{ post.summary }}</p>
                    <p v-else>No Summary Info</p>
                    <h4 class="">Audio</h4>
                    <div class="row">
                      <div v-if="post.xenoCanto.file !== undefined || post.xenoCanto.file !== null" class="col">
                        <audio controls preload="none">
                          <source v-bind:src="post.xenoCanto.file" type="audio/mpeg">
                        Your browser does not support the audio element.
                        </audio>
                        <p>Call Information: {{post.xenoCanto.type}}</p>
                      </div>
                      <div v-else class="col">
                        <p>No Xeno Canto Information</p>
                      </div>
                      <div class="col">
                        <img v-bind:src="post.xenoCanto.sono.large" alt="sonograph">
                      </div>
                    </div>     
                  </div>
                  <div class="modal-footer ">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button @click="goToEdit(post._id)" type="button" data-dismiss="modal" class="btn btn-primary">Edit</button>
                  </div> 
              </div>
            </div>
          </div>
            </div>       
        </a>
      </div>        
            </div> 
        </div>
        </div>
        
<!-- Copywrite -->
         <p class="text-center font-italic font-weight-light text-muted m-5" >Copywrite: Wikipedia.com & Xeno Canto</p>
    </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      posts: [],  
      searchQuery: null,
      uri: null,
    };
  },
  computed: {
    resultQuery() {
      if (this.searchQuery) {
        return this.posts.filter(item => {
          return this.searchQuery
            .toLowerCase()
            .split(" ")
            .every(v => item.binomialName.toLowerCase().includes(v) || item.commonName.toLowerCase().includes(v));
        });
      } else {
        return this.posts;
      }
    }
  },

  methods: {
    async getData() {
      let fetchBird = require("../functions/birdApi") 
      let Birds = await fetchBird.Birds
      console.log(Birds)
      this.posts = await Birds
    },
    goToEdit(param){
    this.$router.push({name:'Edit',query:{name:param}}); 
      },
    goToAdd(){
        this.$router.push({name:'Add'}); 
    },
    addURL(value){
      this.url = null
      try {
        this.url = require("../assets/"+value+".jpg")
      } catch (error) {
        console.log(error)
      }finally{
        if (this.url == null){
          try {
            // this.url = ("https://storage.googleapis.com/lbw-images/test.jpg")
            this.url = require("../../public/"+value+".jpg")
          } catch (error){
            this.url = require("../assets/placeholder.jpg")
            console.log(error)
          }          
        }
      }    
    },
  },

  created() {
    this.getData();
  }


};
</script>


<style scoped>
img {
    width:auto;
    height: 10em;
  }

.gallery_product{
  margin: 0px;
	padding:0;
	position:relative;
}
.gallery_product .img-info{
	position: absolute;
    background: rgba(0,0,0,0.5);
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px;
	overflow:hidden;
	color:rgb(255, 255, 255);
  font-size: 12px;
	top:0;
	display:none;
  -webkit-transition: 2s;
  transition: 2s;
}

.gallery_product:hover .img-info{
	display:block;
   -webkit-transition: 2s;
    transition: 2s;
}

.modal {
  text-align: center;
  text-decoration: none;
  color:rgb(0, 0, 0);
}
.modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  margin-right: -4px;
}
.modal-dialog {
  display: inline-block;
  text-align: left;
  vertical-align: middle;
  padding: 0;
  margin: 0
}

.modal-lg {
  max-width: 90%;
}
</style>