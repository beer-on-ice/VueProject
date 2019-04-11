<template lang="pug">
.loginWrapper
  header
    div.login-header-bg
    div.login-header-mask
    nav.flex-b
      a(href="/")
        img(src="./img/logo2.png")
      a(href="javascript:;") Help
  .formWrapper
    el-form(ref="form" :model="form" label-width="80px" label-position="top" )
      h4 Login to your account
      el-form-item(label="Email address")
        el-input(v-model="form.name")
      el-form-item(label="Password")
        el-input(v-model="form.password" show-password)
      el-button(plain type="primary") Login
      span Forgot your Password?
      span Sign Up
</template>

<script>
export default {
  data () {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.loginWrapper {
	header {
		height: 300px;
		padding: 30px;
		position: relative;
		.login-header-bg {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			z-index: -2;
			background: url(https://bitpay.com/card/assets/images/bp-hero-bg.png) 50%
				19% / cover #0e1c40;
		}
		.login-header-mask {
			position: absolute;
			left: 0;
			right: 0;
			bottom: 0;
			top: 0;
			z-index: -1;
			background-color: #002855;
			opacity: 0.2;
		}
		nav {
			a {
				font-size: 16px;
				color: #fff;
				text-decoration: none;
				display: block;
				img {
					height: 30px;
				}
			}
		}
	}
	.formWrapper {
		max-width: 400px;
		margin: -100px auto 10px;
		display: block;
		box-shadow: 0 3px 50px rgba(0, 0, 60, 0.1), 0 3px 25px rgba(0, 0, 60, 0.3);
		border-radius: 10px;
		overflow: hidden;
		background-color: #fff;
		padding: 10px 50px 30px;
		h4 {
			font-size: 30px;
			color: #616471;
			font-weight: 300;
			margin: 32px 0 50px;
			text-align: center;
		}
		span {
			font-size: 13px;
			line-height: 30px;
			color: #4683e8;
			display: block;
			text-align: center;
		}
	}
}
</style>
