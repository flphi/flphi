<template>
	<header class="header">
		<h1>Alerte météo au Nunavik <img alt="CEN logo" src="../../assets/CENLogo.png"></h1>
	</header>
</template>

<script>
export default{
	name: "Header"
}
</script>

<style scoped>
.header {
  height: 200px;
  background: #999;
  text-align: center;
}

.header img {
  float: right;
  width: 250px;
  height: 100px;
}

.header h1 {
  position: relative;
  top: 18px;
  left: 10px;
  text-align: center;
  color: #F63F18;
}
</style>