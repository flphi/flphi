<template>
  <div>
    <div class="indicateurs">
      <IndicateurItem
        v-bind:key="indicateur.id_indicateur"
        v-for="indicateur in indicateurs"
        v-bind:indicateur="indicateur" />
    </div>
  </div>
</template>

<script>
import IndicateurItem from "./IndicateurItem.vue";
import RestClient from "../utils/rest-client";

export default {
  name: "Indicateurs",
  components: {
    IndicateurItem
  },
  props: [
    'village'
  ],
  data: function() {
    return {
      indicateurs: []
    };
  },
  created() {

  },
  watch: {
    immediate: true,
    village: function(newVillage, oldVillage) {
      console.info('called');
      if (newVillage != null) {
        RestClient.get(`/indicateurs/${newVillage.id_village}`).then((response) => this.indicateurs = response.data['Indicateurs']);
      } else {
        this.indicateurs= null;
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