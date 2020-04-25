<template>
	<header class="header">
    <div class="text-center">
      <img alt="CEN logo" src="../../assets/CENLogo.png">
		  <h1>Alerte météo au Nunavik</h1>
    </div>
    <select v-on:change="onSelectedVillageChange($event)">
      <option v-for="village in villages" v-bind:key="village.id_village" :value="village.id_village">
        {{ village.nom }}
      </option>
    </select>
	</header>
</template>

<script>
import RestClient from '../../utils/rest-client';
export default{
  name: "Header",
  data: function() {
    return {
      villages: [],
      selectedVillage: null,
    };
  },
  created: function() {
    RestClient.get('/villages').then((response) => {
      this.villages = response.data['Villages'];
      this.onSelectedVillageChange({ target: { value: this.villages[0].id_village }});
    });
  },
  methods: {
    onSelectedVillageChange: function(event) {
      this.selectedVillage = this.villages.find((v) => v.id_village == event.target.value);
      this.$emit('selectedVillageChange', this.selectedVillage);
    }
  }
}
</script>

<style scoped>
.header {
  padding: 20px;
  min-height: 200px;
  background: white;
  text-align: center;
}

.header img {
  display: block;
  margin: 0 auto;
  width: 250px;
  height: 100px;
}

.header h1 {
  margin: 10px;
  text-align: center;
  color: #F63F18;
}
</style>