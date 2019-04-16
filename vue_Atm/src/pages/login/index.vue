<template lang="pug">
.loginWrapper
  .titleWrapper
    h2 Please scan the QR code in CberPay App  for landing
  .codeWrapper
    .code(@click="handleLogin")
  .btnWrapper.flex-b
    el-button(plain @click="handleBack") Back
    .download(@click="maskFlag=true")
      p {{$t('login.download')}}
  .maskWrapper.flex-b(v-show="maskFlag" @click="maskFlag=false")
    .code
</template>

<script>
import { setCookie } from 'utils/cookie'
export default {
  data () {
    return {
      maskFlag: false
    }
  },
  methods: {
    handleBack () {
      this.$router.go(-1)
    },
    handleLogin () {
      this.$fetch('/api/login.json').then(res => {
        if (res.code === 200) {
          setCookie('userinfo', res.data)
          this.$message({
            message: '扫码登录成功',
            type: 'success'
          })
          this.$router.push('/guide')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.loginWrapper {
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: #343232;
	.titleWrapper {
		margin-top: 290px;
		h2 {
			font-size: 36px;
			line-height: 48px;
			color: #fff;
			text-align: center;
		}
	}
	.codeWrapper {
		.code {
			margin: 96px auto 0;
			width: 236px;
			height: 236px;
			background-color: rgb(123, 123, 123);
		}
	}
	.btnWrapper {
		padding: 170px 40px 0;
		.el-button {
			font-size: 28px;
			padding: 20px 70px;
		}
		p {
			font-size: 18px;
			color: #e51c23;
			&.select {
				color: #fff;
			}
		}
	}
	.maskWrapper {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 1001;
		.code {
			width: 70px;
			height: 70px;
			background-color: #fff;
			position: absolute;
			top: 780px;
			right: 100px;
		}
	}
}
</style>
