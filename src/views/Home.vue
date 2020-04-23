<template>
  <div id="app">
    <Header />
    <Indicateurs />
  </div>
</template>

<script>
import Indicateurs from '../components/Indicateurs.vue';
import Header from '../components/layout/Header.vue';
import axios from 'axios';

export default {
  name: 'Home',
  components: {
    Header,
    Indicateurs,
  },
  data() {
    return {
      indicateurs: []
    }
  },
  created() {
  },
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
</style>
