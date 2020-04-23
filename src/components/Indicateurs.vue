<template>
  <div>
    <div v-bind:key="indicateur.id_indicateur" v-for="indicateur in indicateurs">
      <IndicateurItem v-bind:indicateur="indicateur" />
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
  props: [],
  data: function() {
    return {
      indicateurs: []
    };
  },
  created() {
    RestClient.get("indicateurs")
      .then(res => (this.indicateurs = [res.data["Indicateurs"][0]]))
      .catch(err => console.log(err));
  }
};
</script>

<style scoped>
</style>