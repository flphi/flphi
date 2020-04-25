<template>
  <div class="SendEvent">
    <h1>SendEvent</h1>

    <div class="container">
      <div class="alert alert-danger" role="alert" v-if="invalid">
        All fields are required
      </div>
      <div class="alert alert-danger" role="alert" v-if="serverError">
        Server error
      </div>
      <form>
        <div class="row">
          <div class="col-md-12">
            <div class="form-group">
              <label for="prenom">Prenom</label>
              <input type="text" class="form-control" v-model="prenom" required/>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <label for="nom">Nom</label>
              <input type="text" class="form-control" v-model="nom" required/>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <label for="courriel">Courriel</label>
              <input type="text" class="form-control" v-model="courriel" required/>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <label for="content">Content</label>
              <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" v-model="content"></textarea>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <label for="positionLon">Longitude (WGS84)</label>
              <input type="numeric" class="form-control" v-model="positionLon" required/>
            </div>
          </div>
          <!-- pattern="[-+]?[0-9]*\.?[0-9]*" -->
          <!-- type="numeric" id="Lat" step="0.1" class="form-control" v-model="positionLat" required/> -->

          <div class="col-md-12">
            <div class="form-group">
              <label for="positionLat">Latitude (WGS84)</label>
              <input type="numeric" step="0.1" class="form-control" v-model="positionLat" required/>
            </div>
          </div>

          <div class="col-md-12">
            <div class="form-group">
              <label for="image">Image</label><br/>
              <input type="file" @change="onFileSelected" required/>
            </div>
          </div>

          <div class="col-md-12">
            <input type="submit" class="btn btn-primary" v-on:click="onSendClick($event)">
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import RestClient from "../utils/rest-client";

export default {
  name: "Sendevent",
  props: [],
  data: function() {
    return {
      prenom: '',
      nom: '',
      courriel: '',
      content: '',
      image64: null,
      positionLon: '',
      positionLat: '',
      invalid: false,
      serverError: false
    };
  },
  methods: {
    onSendClick: function(event) {
      if (!this.prenom.length || !this.nom.length || !this.courriel.length || !this.content.length
      || !this.positionLat.match(/^[+-][\d]+(\.[\d]+)$/) || !this.positionLat.match(/^[+-][\d]+(\.[\d]+)$/)
      || this.positionLat < -90 || this.positionLat > 90 || this.positionLon < -90 || this.positionLon > 90) {
            this.invalid = true;
            console.log("invalid!");
            return;
      } else {
        this.invalid = false
      }
      
      RestClient.post('/send/event', { prenom: this.prenom, nom: this.nom, courriel: this.courriel,
        content: this.content, image64: this.image64, positionLon: this.positionLon, positionLat:this.positionLat}, {
        onUploadProgress: uploadEvent =>{
            console.log('Upload progress: ' + Math.round(uploadEvent.loaded / uploadEvent.total *100) + '%')
        }})
        .then((res) => {
          this.serverError = false;
          console.log(res)
          this.$router.push({ path: '/' });
        })
        .catch((err) => {
          this.serverError = true;
          console.log(err);
        });
      event.preventDefault();
    },
    onFileSelected: function(event){
        var reader = new FileReader()
            reader.readAsDataURL(event.target.files[0])
            reader.onload = ()=> { this.image64 = reader.result; };
    }
  }
}
</script>

<style scoped>
  .container {
    text-align: left;
  }
</style>