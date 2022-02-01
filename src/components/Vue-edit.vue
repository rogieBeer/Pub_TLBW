<template>
<br>
<br>
    <div id="App container">
        <div class="container">
            <h1>Edit Species</h1>
            <br>
        </div>
        <div class="input container">
            <form method="patch" >
              <div class="col-12">
                <label for="inputAddress" class="form-label">Common Name</label>
                <input v-model="commonName" type="text" class="form-control" id="inputAddress"  v-bind:placeholder= data.commonName>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Order</label>
                <input v-model="order" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.order>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Genus</label>
                <input v-model="genus" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.genus>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Species</label>
                <input v-model="species" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.species>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Binomial Name</label>
                <input v-model="binomialName" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.binomialName>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Maori Name</label>
                <input v-model="maoriNames" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.maoriNames>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Summary</label>
                <textarea v-model="summary" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.summary @click="getSelectValue(data.summary)"></textarea>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Conservation Status: <span class='text-success'>{{data.conservationStatus}}</span></label>
                <select class="form-control" id="callLevel"  v-model="conservationStatus">
                        <option disabled value="">Please select one</option>
                        <option  value="Extinct">Extinct</option>  
                        <option  value="Critically Endangered">Critically Endangered</option>  
                        <option  value="Endangered">Endangered</option>
                        <option  value="Vulnerable">Vulnerable</option>  
                        <option  value="Near Threatened">Near Threatened</option>  
                        <option  value="Least Concern">Least Concern</option>            
                </select>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Habitat</label>
                <input v-model="habitat" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.habitat>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Module Links</label>
                <input v-model="modules" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.modules>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Confusiable Species</label>
                <input v-model="confusiable" type="text" class="form-control" id="inputAddress" v-bind:placeholder= data.confusiable>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Call Level: <span class='text-success'>{{data.callLevel}}</span></label>
                <select class="form-control" id="callLevel"  v-model="callLevel">
                        <option disabled value="">Please select one</option>
                        <option  value="Easy">Easy</option>  
                        <option  value="Moderate">Moderate</option>  
                        <option  value="Hard">Hard</option>                
                </select>
              </div>
              <div class="col-12">
                <label for="inputAddress" class="form-label">Status: <span class='text-success'>{{data.statusEndemic}}</span></label>
                <select class="form-control" id="statusEndemic"  v-model="statusEndemic">
                        <option disabled value="">Please select one</option>
                        <option value="Native">Native</option>  
                        <option value="Endemic">Endemic</option>  
                        <option value="Introduced">Introduced</option>                
                </select>
              </div>
              <br>
              <div class="container">
                  <button  @click="patchName(), goToEdit()" class="btn btn-primary">Submit</button>
              </div>
              <br>
              <div class="container">
                  <button  @click="deleteName(), goToEdit()" class="btn btn-danger">Delete</button>
              </div>
        </form>
        </div>
    </div>
    {{callLevel}}{{conservationStatus}}{{statusEndemic}}
</template>

<script>
export default {
  name: "App",
    components: {

    },
  data() {
    return {
        data: {},
        birdID: this.$route.query.name,
        commonName: null,
        order: null,
        genus: null,
        species: null,
        binomialName: null,
        maoriNames: null,
        summary: null,
        conservationStatus: null,
        statusEndemic: null,
        habitat: null,
        modules: null,
        confusiable: null,
        callLevel: null,
        mainImage: null,
        selected: null,    
    }
  },
  beforeMount(){
    this.getName();
  },
  methods: {
    async getName(){    
        const res = await fetch('https://heroku-birdv2-api.herokuapp.com/birds/'+ this.$route.query.name);
        const data = await res.json();
        this.data = data;
    },
    async patchName(){

        fetch('https://heroku-birdv2-api.herokuapp.com/birds/'+ this.$route.query.name, {
                method: 'PATCH',
                body: JSON.stringify({
                    commonName: this.inputCommonName,
                    order: this.order,
                    genus: this.genus,
                    species: this.species,
                    binomialName: this.binomialName,
                    maoriNames: this.maoriNames,
                    summary: this.summary,
                    conservationStatus: this.conservationStatus,
                    statusEndemic: this.statusEndemic,
                    habitat: this.habitat,
                    modules: this.modules,
                    confusiable: this.confusiable,
                    callLevel: this.callLevel,
                    mainImage: this.mainImage
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => console.log(json))
        
      },
      goToEdit(){
        this.$router.push({name:'Home'}); 
      },
      async deleteName(){

        fetch('https://heroku-birdv2-api.herokuapp.com/birds/'+ this.$route.query.name, {
                method: 'DELETE',
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
            .then(response => response.json())
            .then(json => console.log(json))
        
      },
      getSelectValue(value) {
        this.summary = value
      }
    },
  };

</script>


<style scoped>

</style>
