<template lang="pug">
.certainWrapper
  Header
    .cid CID：Satoshi Nakamoto
  .payWrapper
    .timeWrapper.flex-s
      div
      p 剩余操作时间：
        span {{leftTime}}s
    .centerWrapper
      h2 请扫码确认付款
      .code
      p 交易金额：
        span 3.50366009 BCH≈CNY ¥ 6,000.00
    .cancelWapper.flex-e
      el-button(round) Quit
</template>

<script>
import Header from 'components/Header'
import { setInterval, clearInterval } from 'timers'
let timer = null
export default {
  data () {
    return {
      leftTime: 3
    }
  },
  mounted () {
    clearInterval(timer)
    timer = setInterval(() => {
      this.leftTime -= 1
      if (this.leftTime <= 0) {
        this.$message({
          message: '超时，请重试！',
          type: 'warning'
        })
        this.$router.push('/withdraw')
      }
    }, 1000)
  },
  beforeDestroy () {
    clearInterval(timer)
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.certainWrapper {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #343232;
	.cid {
		font-size: 48px;
		color: #fff;
	}
	.payWrapper {
		padding: 50px;
		.timeWrapper {
			font-size: 18px;
			color: #fff;
		}
		.centerWrapper {
			margin-top: 53px;
			font-size: 36px;
			color: #fff;
			text-align: center;
			.code {
				width: 392px;
				height: 392px;
				background-color: #fff;
				margin: 10px auto 30px;
			}
		}
	}
	.cancelWapper {
		padding: 0 30px;
		margin-top: 50px;
		.el-button {
			font-size: 38px;
			padding: 20px 80px;
		}
	}
}
</style>
