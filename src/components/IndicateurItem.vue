<template>
  <div class="indicateur-item" :style="'background-color:' + backgroundColor">
    <h3>{{ indicateur.nom }}</h3>
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
  props: ["indicateur"],
  computed: {
    backgroundColor: function() {
      switch(this.indicateur.probabilite) {
        case 'faible':
          return 'green';
        case 'moyen':
          return 'yellow';
        case 'fort':
          return 'red';
      }
      return 'black';
    }
  }
};
</script>

<style scoped>
ul {
  list-style: none;
}
.indicateur-item {
  background: #f4f4f4;
  padding: 10px;
  border: 1px solid gray;
  min-width: 200;
  min-height: 200px;
}
</style>