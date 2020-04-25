<template>
  <div id="app">
    <router-link to="sendevent" tag="a" class="btn btn-primary">Send event</router-link>
    <div class="elements">
      <Header v-on:selectedVillageChange="onVillageChanged" />
      <Indicateurs :village="village" />
      <MeteoActuelle :village="village" />
    </div>
  </div>
</template>

<script>
import Indicateurs from '../components/Indicateurs.vue';
import Header from '../components/layout/Header.vue';
import MeteoActuelle from '../components/MeteoActuelle.vue';
//import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Header,
    Indicateurs,
    MeteoActuelle
  },
  data() {
    return {
      village: null,
      indicateurs: []
    }
  },
  created() {

  },
  methods: {
    onVillageChanged: function(village) {
      console.info('Le village est', village.nom);
      this.village = village;
    }
  }
}
</script>

<style>
  *{
    box-sizing: border-box;
    margin:0;
    padding:0;
  }

  body{
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.4;
  }

  .elements {
    margin-top: 10px;
  }

  .elements > * {
    border: 2px solid black;
  }
</style>
