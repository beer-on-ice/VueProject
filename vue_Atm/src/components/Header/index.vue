<template lang="pug">
  .headerWrapper.flex-b
    .logo
    slot
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.headerWrapper {
	width: calc(100%-80);
	height: 150px;
	padding: 0 40px;
	background-color: #000;
	position: relative;
	z-index: 1001;
	.logo {
		width: 200px;
		height: 120px;
		background: url('./img/logo.png') no-repeat;
		background-size: contain;
	}
}
</style>
