<template lang="pug">
#homeWrapper
  .headerWrapper.clearfix
    .lanWrapper
      i.iconfont &#xe8cc;
      el-dropdown.eldownmenu
        span 选择语言：
          em {{$t("home.lang")}}
        el-dropdown-menu(slot="dropdown")
          el-dropdown-item(@click.native="toggleLang('cn')") 中文
          el-dropdown-item(@click.native="toggleLang('en')") English
  .logoWrapper
    .logo
    .download
      i.iconfont &#xe669;
      span 下载CberPay App
    .dot
  .navWrapper
    ul
      router-link(tag="li" to="/business")
        i.iconfont &#xe683;
        span 商业用户
      router-link(tag="li" to="/personal")
        i.iconfont &#xe634;
        span 个人用户
      router-link(tag="li" to="/developer")
        i.iconfont &#xe64e;
        span 开发者
  .sloganWrapper
    .slogan IN MATH WE TRUST
</template>

<script>
import { getLocale, saveLocale } from 'utils/localStorage'
export default {
  methods: {
    toggleLang (lang) {
      saveLocale(lang)
      this.$i18n.locale = getLocale()
    }
  }
}
</script>

<style lang="scss" scoped>
#homeWrapper {
	.headerWrapper {
		.lanWrapper {
			font-size: 0.18rem;
			line-height: 1.18rem;
			margin-right: 0.8rem;
			float: right;
			i {
				margin-right: 0.1rem;
				font-size: 0.2rem;
				vertical-align: middle;
			}
		}
	}
	.logoWrapper {
		.logo {
			background: url('./../../assets/images/logo.png');
			width: 6.51rem;
			height: 1.96rem;
			background-size: contain;
			margin: 0.5rem auto 0;
		}
		.download {
			display: -webkit-flex;
			display: flex;
			justify-content: center;
			i {
				font-size: 0.26rem;
				line-height: 1;
				color: #1f7bcf;
				margin-right: 0.1rem;
				vertical-align: middle;
			}
			span {
				font-size: 0.18rem;
				vertical-align: middle;
			}
		}
		.dot {
			width: 2.18rem;
			height: 2.18rem;
			background-color: rgb(123, 123, 123);
			border-radius: 0.3rem;
			margin: 0.1rem auto 0;
		}
	}
	.navWrapper {
		margin-top: 0.3rem;
		ul {
			padding: 0 1.6rem;
			display: -webkit-flex;
			display: flex;
			justify-content: space-around;
			li {
				display: -webkit-flex;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 3.12rem;
				height: 1rem;
				color: rgb(123, 123, 123);
				border: 1px solid rgba(187, 187, 187, 1);
				border-radius: 0.3rem;
				box-shadow: 2px 2px 0px 0px rgba(170, 170, 170, 1);
				box-sizing: border-box;
			}
			i {
				font-size: 0.38rem;
				line-height: 1;
				margin-right: 0.1rem;
			}
			span {
				font-size: 0.3rem;
				line-height: 1rem;
			}
		}
	}
	.sloganWrapper {
		text-align: center;
		margin-top: 1.1rem;
		.slogan {
			font-size: 0.36rem;
			color: rgba(0, 0, 0, 0.6);
		}
	}
}
</style>
