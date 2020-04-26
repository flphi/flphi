<template>
  <div class="indicateur-item" :style="'background-color:' + backgroundColor">
    <h3>{{ indicateur.probabilite }}</h3>
    <ul>
      <li>{{indicateur.nom}}</li>
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
  min-height: 50px;
}
</style>