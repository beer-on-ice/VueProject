<template lang="pug">
.buyWrapper
  .operateWrapper.flex-b
    .leftWrapper
      el-button(v-for="item in leftList" :key="item" @click="handleClick(item)") {{item}}
    .centerWrapper
      .top
        h2 请输入购买数量:
        .leftcash.flex-b
          p 当前余额: 888888888
            em BCH
          p.all 全部取现
      .center
        .inputWrapper
          el-input(placeholder="请输入金额" type="number" v-model="inputVal" disabled)
            template(slot="prepend") CNY
          i.iconfont &#xe63b;
        p.flex-e ≈ 3.111111
          em BCH
      .bottom
        Calcular(@calClick="calClick")
    .rightWrapper
      el-button(v-for="item in rightList" :key="item" @click="handleClick(item)") {{item}}
  .backWrapper.flex-e
    el-button(round @click="handleBack") Back
</template>

<script>
import Header from 'components/Header'
import Calcular from 'components/Calculator'
export default {
  data () {
    return {
      inputVal: '',
      leftList: [100, 500, 1000],
      rightList: [3000, 5000, 10000]
    }
  },
  methods: {
    handleBack () {
      this.$router.push('/guide/nav')
    },
    handleClick (el) {
      this.inputVal = String(el)
    },
    calClick (el) {
      this.inputVal += String(el)
    }
  },
  components: {
    Header,
    Calcular
  }
}
</script>

<style lang="scss">
.buyWrapper {
	position: fixed;
	top: 150px;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #343232;
	.cid {
		font-size: 48px;
		color: #fff;
	}
	.leftWrapper,
	.rightWrapper {
		display: flex;
		display: -webkit-flex;
		margin-top: 200px;
		.el-button {
			margin: 30px 0;
			width: 280px;
			font-size: 36px;
			color: #e51c23;
			background-color: #fff;
			border-radius: 0;
			padding: 20px 0;
		}
	}
	.leftWrapper {
		flex-direction: column;
		.el-button {
			border-left: none;
			border-top-right-radius: 20px;
			border-bottom-right-radius: 20px;
		}
	}
	.rightWrapper {
		flex-direction: column;
		.el-button {
			border-right: none;
			border-top-left-radius: 20px;
			border-bottom-left-radius: 20px;
		}
	}
	.centerWrapper {
		.top {
			text-align: center;
			h2 {
				font-size: 48px;
				line-height: 80px;
				color: #fff;
			}
			.leftcash {
				p {
					font-size: 20px;
					color: #fff;
					line-height: 50px;
				}
				em {
					margin-left: 20px;
				}
				.all {
					color: #0078d7;
				}
			}
		}
		.center {
			.inputWrapper {
				position: relative;
				.el-input {
					font-size: 26px;
					.el-input__inner {
						width: 320px;
						padding: 30px 50px 30px 10px;
						color: #000;
					}
				}
				i {
					position: absolute;
					top: 15px;
					right: 15px;
					font-size: 26px;
					color: #259b24;
				}
			}
			p {
				font-size: 20px;
				line-height: 50px;
				color: #259b24;
				em {
					margin-left: 20px;
				}
			}
		}
	}
	.backWrapper {
		padding: 0 80px;
		margin-top: 20px;
		.el-button {
			font-size: 38px;
			padding: 20px 80px;
		}
	}
}
</style>
