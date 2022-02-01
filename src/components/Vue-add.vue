<template>
<br>
<br>
    <div id="App container">
        <div class="container">
            <h1>Add Species</h1>
            <p>The add section utilizes Xeno Canto and openApis to attempt to build a bird from the information provided. It is very important that the scientific name is correct otherwise it will reject the request. A Bird can be edited if needed once created from selecting it within the species page.</p>
            <br>
        </div>
        <div v-if="hidden === true" class="input container">
            <form method="patch" >
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Scientific Name</label>
                    <input v-model="binomialName" type="text" class="form-control" id="inputAddress" :required="!binomialName" placeholder="Example: Prosthemadera novaeseelandiae">
                </div>
                <div class="container">
                    <p class="text-danger">{{error}}</p>
                </div>
                <div id="filter" class="form-group container">
                    <label for="statusEndemic">Status</label>
                    <select class="form-control" id="statusEndemic"  v-model="statusEndemic" required>
                        <option disabled value="">Please select one</option>
                        <option value="Native">Native</option>  
                        <option value="Endemic">Endemic</option>  
                        <option value="Introduced">Introduced</option>                
                    </select>
                </div>
                <div class="col-12">
                    <label for="inputAddress" class="form-label">Habitat</label>
                    <input v-model="habitat" type="text" class="form-control" id="inputAddress" :required="!habitat">
                </div>
                <div id="filter" class="form-group container">
                    <label for="callLevel">Call Level</label>
                    <select class="form-control" id="callLevel"  v-model="callLevel" required >
                        <option disabled value="">Please select one</option>
                        <option  value="Easy">Easy</option>  
                        <option  value="Moderate">Moderate</option>  
                        <option  value="Hard">Hard</option>                
                    </select>
                </div>
                <br>
                <div class="container">
                    <div class="row">
                        <div class="col">
                            <div class="container">
                                  <div class="file-upload">
                                        <input type="file" @change="onFileChange" />
                                    </div>
                            </div>
                        </div>
                        <div class="col"></div>
                    </div>

                </div>
                <br>
        </form>
        <div class="container">
                <button @click="onUploadFile" class="upload-button"
                :disabled="!this.selectedFile">Upload file</button>
                <button type="button" @click="stringHasTheWhiteSpaceOrNot(this.binomialName), submitFiles()" class="btn btn-danger">Submit Bird</button>
        </div>
        </div>
        <div v-else class="container loading">
            <br>
            <br>
            <h1 v-if="res == null">Loading</h1>
            <p>{{res}}</p>
            <button type="button" @click="goToEdit()">Add Bird</button>
            <button type="button" @click="goToHome()">Home</button>
        </div>
        <br>
        <div class="container">
            
            
        </div>        
        <br>
    </div>
</template>


<script>
import axios from 'axios';

export default {
  name: "App",
//   props: ['files'],
  data() {
    return {
        data: {},
        error: null,
        errorNew: null,
        binomialName: null,
        statusEndemic : null,
        habitat : [],
        maoriNames : [],
        modules : [],
        confusiable : [],
        callLevel : null,
        mainImage : null,
        audioID: null,
        sex: null,
        call: null,
        callURL: null,
        location: null,
        region: null,
        fileName: null,
        comments: null,
        sono: null,
        tempAudio : [],
        audioAdd: null,
        res : null, 
        hidden : true,
        selectedFile: "",
        file: '' 
    }
  },
  
  methods: {
      async addName() {
        const element = document.querySelector('#post-request-set-headers .article-id');
        const article = {
                    binomialName: this.binomialName.toLowerCase(),
                    statusEndemic : this.statusEndemic,
                    habitat : this.habitat,
                    // maoriNames : this.maoriNames,
                    // modules : this.modules,
                    // confusiable : this.confusiable,
                    callLevel : this.callLevel,
                    mainImage : "image.jpg",
                    // uploadedAudio : [],
                    
            };
        const headers = { 
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":"*"

        };
        axios.post('https://heroku-birdv2-api.herokuapp.com/birds', article, { headers })
            .then(response => 
            element.innerHTML = response.data.id)
            .catch(error => this.res = error.response.data)
            .finally(this.birdAdded());
        },
   
      goToEdit(){
        this.hidden = true
        this.$router.go()  
      },
      goToHome(){
        this.$router.push({name:'Home'}); 
      },
      stringHasTheWhiteSpaceOrNot(value){
        var whiteSpace;
        whiteSpace = value.indexOf(' ') >= 0;
        if(whiteSpace==true){
            if (value.length > 6){
                this.addName()
                this.hidden = false;
            }
            this.error = "Is this species name correct"
        } else {
            this.error = "Is this species name correct"
        }
        },
        addAudio() {
            this.audioAdd = "Audio has Been added to Bird"
            this.tempAudio = {
                    mainImage : "TEMP",
                    audioID: this.audio,
                    sex: this.sex,
                    call: this.call,
                    callURL: this.callURL,
                    location: this.location,
                    region: this.region,
                    fileName: this.fileName,
                    comments: this.comments,
                    sono: this.sono,
            }
        },
        birdAdded(){
            setTimeout(5000)
            if (this.res == null){
                this.res = "Bird Added"
            }
        },
        onFileChange(e) {
        const selectedFile = e.target.files[0]; // accessing file
        this.selectedFile = selectedFile;
        },
        onUploadFile() {
        const formData = new FormData();
        formData.append("file", this.selectedFile);  // appending file

        // sending file to the backend
        axios
            .post("http://localhost:3000/upload", formData)
            .then(res => {
            console.log(res);
            })
            .catch(err => {
            console.log(err);
            });
        }
    },
  };
</script>


<style scoped>

</style>