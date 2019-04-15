<template lang="pug">
.calculatorWrapper
  ul
    li 1
    li 2
    li 3
    li 4
    li 5
    li 6
    li 7
    li 8
    li 9
  .btnWrapper
    el-button(type="danger") 取消
    el-button(type="warning") 更正
    el-button(type="primary") 确认
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.calculatorWrapper {
	width: 419px;
	margin-top: 20px;
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-around;
		li {
			padding: 20px 55px;
			font-size: 28px;
			font-weight: bold;
			border-radius: 10px;
			background-color: #fff;
			margin-top: 20px;
		}
	}
	.btnWrapper {
		display: flex;
		justify-content: space-around;
		.el-button {
			font-size: 18px;
			font-weight: bold;
			border-radius: 10px;
			padding: 20px 45px;
			margin-top: 13px;
		}
	}
}
</style>
