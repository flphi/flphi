<template>
  <div>
    <div class="meteo">
      <div>Ensoleillé</div>
      <div>Température: {{ meteo.temperature }} °C</div>
    </div>
  </div>
</template>

<script>
import IndicateurItem from "./IndicateurItem.vue";
import RestClient from "../utils/rest-client";

export default {
  name: "MeteoActuelle",
  components: {
    IndicateurItem
  },
  props: [
    'village'
  ],
  data: function() {
    return {
      meteo: { temperature: 20 }
    };
  },
  created() {

  },
  watch: {
    immediate: true,
    village: function(newVillage, oldVillage) {
      if (newVillage != null) {
        RestClient.get(`/meteo/${newVillage.id_village}`).then((response) => this.meteo = response.data['Meteo']);
      } else {
        this.meteo = {};
      }
    }
  }
};
</script>

<style scoped>
.Meteo {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>