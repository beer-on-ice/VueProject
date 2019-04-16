<template lang="pug">
.calculatorWrapper
  ul
    li(v-for="item in list" :key="item" @click="handleClick(item)") {{item}}
  .btnWrapper
    el-button(type="danger") 取消
    el-button(type="warning") 更正
    el-button(type="primary") 确认
</template>

<script>
export default {
  data () {
    return {
      list: [7, 8, 9, 4, 5, 6, 1, 2, 3]
    }
  },
  methods: {
    handleClick (el) {
      this.$emit('calClick', el)
    }
  }
}
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
