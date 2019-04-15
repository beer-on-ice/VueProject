<template lang="pug">
#welcomeWrapper
  .langWrapper.flex-e
    i.iconfont &#xe8fe;
    el-dropdown.eldownmenu
      span {{$t("welcome.selectLang")}}：
        em {{$t("welcome.lang")}}
      el-dropdown-menu(slot="dropdown")
        el-dropdown-item(@click.native="toggleLang('cn')") 中文
        el-dropdown-item(@click.native="toggleLang('en')") English
  .logoWrapper
    .logo
    h2 Welcome To CyberBank
  .downloadWrapper
    .code
    h3.flex-c {{$t('welcome.download')}}
  .btnWrapper.flex-c
    el-button(plain @click="handleEnter") {{$t('welcome.enter')}}
  .iconWrapper
    .small.flex-b
      i.iconfont &#xe62a;
      i.iconfont &#xe629;
      i.iconfont &#xe669;
      i.iconfont &#xe65a;
      i.iconfont &#xe8e6;
    .big.flex-b
      i.iconfont &#xea34;
      i.iconfont &#xf176;
      i.iconfont &#xea32;
      i.iconfont &#xe8e0;
</template>

<script>
import { getLocale, saveLocale } from 'utils/localStorage'
export default {
  methods: {
    toggleLang (lang) {
      saveLocale(lang)
      this.$i18n.locale = getLocale()
    },
    handleEnter () {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss" scoped>
#welcomeWrapper {
	padding: 50px 100px;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: #343232;
	.langWrapper {
		font-size: 20px;
		line-height: 1;
		color: #fff;
		i {
			margin-right: 10px;
			font-size: 26px;
		}
		.el-dropdown {
			color: #fff;
		}
	}
	.logoWrapper {
		margin-top: 50px;
		.logo {
			margin: 0 auto;
			width: 450px;
			height: 150px;
			background: url('./img/logo.png') no-repeat;
			background-size: contain;
		}
		h2 {
			font-size: 28px;
			color: #fff;
			text-align: center;
		}
	}
	.downloadWrapper {
		margin-top: 100px;
		.code {
			margin: 0 auto;
			width: 100px;
			height: 100px;
			background-color: rgb(123, 123, 123);
		}
		h3 {
			margin-top: 10px;
			font-size: 24px;
			color: #fff;
		}
	}
	.btnWrapper {
		margin-top: 70px;
		.el-button {
			padding: 28px 150px;
			font-size: 28px;
		}
	}
	.iconWrapper {
		margin-top: 70px;
		.small {
			padding: 0 200px;
			i {
				font-size: 30px;
				color: #d7d8dd;
			}
		}
		.big {
			padding: 14px 350px 0;
			i {
				font-size: 50px;
				color: #d7d8dd;
			}
		}
	}
}
</style>
