<template lang="pug">
.registerWrapper.flex-cc
  .login
    .close(@click="closeRegister")
      i.iconfont &#xe643;
    h3 Join Cberpay
    .formWrapper
      div
        p EMAIL
        el-input(v-model="username")
      div
        p PASSWORD
        el-input(v-model="password" show-password)
      div
        p ENROLLING AS
        el-radio(v-model="radio" label="1") Remember me
        el-radio(v-model="radio" label="2") a business
      el-checkbox(v-model="checked") Yes, please email me personalized updates, tips, industry news and offers
      el-button SIGN IN
    .tipWrapper
      p(@click="showLogin") Already a Member?
        span Login here.
</template>

<script>
export default {
  data () {
    return {
      username: '',
      password: '',
      radio: '1',
      checked: false
    }
  },
  methods: {
    closeRegister () {
      this.$emit('closeRegister')
    },
    showLogin () {
      this.$emit('showLogin')
    }
  }
}
</script>

<style lang="scss" scoped>
.registerWrapper {
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
			.el-radio {
				margin-top: 10px;
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
