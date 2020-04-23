<template>
  <div class="indicateur-item">
    <ul>
      <li>Description calcul: {{indicateur.desc_calcul}}</li>
      <li>Description event: {{indicateur.desc_evenement}}</li>
      <li>event: {{indicateur.evenement_meteo}}</li>
      <li>id indicateur: {{indicateur.id_indicateur}}</li>
      <li>Repertoire: {{indicateur.repertoire_script}}</li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "IndicateurItem",
  props: ["indicateur"]
};
</script>

<style scoped>
.indicateur-item {
  background: #f4f4f4;
  padding: 10px;
  border-bottom: 1px #ccc dotted;
}
</style>