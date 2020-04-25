<template>
  <div>
    <div class="MeteoActuelle">
      <MeteoActuelleItem
        v-bind:key="MeteoActuelle.id"
        v-for="MeteoActuelleItem in MeteoActuelle"
        v-bind:MeteoActuelle="MeteoActuelle" />
    </div>
  </div>
</template>

<script>
import MeteoActuelleItem from "./MeteoActuelleItem.vue";
import RestClient from "../utils/rest-client";

export default {
  name: "Indicateurs",
  components: {
    MeteoActuelleItem
  },
  props: [
    'village'
  ],
  data: function() {
    return {
      MeteoActuelle: []
    };
  },
  created() {

  },
  watch: {
    immediate: true,
    village: function(newVillage, oldVillage) {
      console.info('called');
      if (newVillage != null) {
        RestClient.get(`/meteo/${newVillage.id_village}`).then((response) => this.MeteoActuelle = response.data['Meteo']);
      } else {
        this.MeteoActuelle= null;
      }
    }
  }
};
</script>

<style scoped>
.indicateurs {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.indicateurs > div {
  margin: 10px;
}
</style>