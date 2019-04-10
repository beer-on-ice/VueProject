<template lang="pug">
.loginWrapper.flex-cc
  .login
    .close(@click="closeLogin")
      i.iconfont &#xe643;
    h3 Sign in to Cberpay
    .formWrapper
      div
        p USERNAME OR EMAIL
        el-input(v-model="username")
      div
        p PASSWORD
        el-input(v-model="password" show-password)
      el-checkbox(v-model="checked") Remember me
      el-button SIGN IN
    .tipWrapper
      p(@click="showRegister") Don't have an account yet?
        span Create an account.
      p Forgot your password?
        span Recover it.
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      checked: false
    }
  },
  methods: {
    closeLogin () {
      this.$emit('closeLogin')
    },
    showRegister () {
      this.$emit('showRegister')
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
	z-index: 9999;
	background: rgba(0, 0, 0, 0.3);
	.login {
		position: relative;
		width: 706px;
		height: 686px;
		background: rgba(255, 255, 255, 0.9);
		.close {
			position: absolute;
			right: 40px;
			top: 20px;
			i {
				font-size: 28px;
				line-height: 30px;
			}
		}
		h3 {
			text-align: center;
			font-size: 28px;
			font-weight: bold;
			margin-top: 66px;
		}
		.formWrapper {
			margin-top: 20px;
			padding: 0 100px;
			div {
				margin-top: 10px;
			}
			p {
				font-size: 14px;
				line-height: 20px;
			}
			.el-checkbox {
				margin-top: 30px;
				font-size: 14px;
				font-weight: bold;
				line-height: 20px;
			}
			.el-button {
				display: block;
				margin: 20px auto 0;
				background: #062d64;
				color: #fff;
				padding: 15px 40px;
				border-radius: 18px;
			}
		}
		.tipWrapper {
			text-align: center;
			margin-top: 20px;
			p {
				font-size: 14px;
				line-height: 25px;
				span {
					color: #062d64;
					text-decoration: underline;
				}
			}
		}
	}
}
</style>
