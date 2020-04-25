<template>
  <div class="meteoactuelleitem-item">
    <h3>{{ meteoactuelleitem.nom }} : {{meteoactuelleitem.value}} {{meteoactuelleitem.units}}</h3>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "MeteoActuelleItem",
  props: ["meteoactuelleitem"],
};
</script>

<style scoped>
/*ul {
  list-style: none;
}
.indicateur-item {
  background: #f4f4f4;
  padding: 10px;
  border: 1px solid gray;
  min-width: 200;
  min-height: 50px;
}*/
</style>