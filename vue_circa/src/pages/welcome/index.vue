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
      router-link(tag="li" to="about/business")
        i.iconfont &#xe683;
        span 商业用户
      router-link(tag="li" to="about/personal")
        i.iconfont &#xe634;
        span 个人用户
      router-link(tag="li" to="about/developer")
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
			font-size: 18px;
			line-height: 110px;
			margin-right: 100px;
			float: right;
			i {
				margin-right: 10px;
				font-size: 26px;
				vertical-align: middle;
			}
		}
	}
	.logoWrapper {
		.logo {
			background: url('./../../assets/images/logo.png');
			width: 651px;
			height: 196px;
			background-size: contain;
			margin: 50px auto 0;
		}
		.download {
			display: -webkit-flex;
			display: flex;
			justify-content: center;
			i {
				font-size: 26px;
				line-height: 1;
				color: #1f7bcf;
				margin-right: 10px;
				vertical-align: middle;
			}
			span {
				font-size: 18px;
				vertical-align: middle;
			}
		}
		.dot {
			width: 218px;
			height: 218px;
			background-color: rgb(123, 123, 123);
			border-radius: 30px;
			margin: 10px auto 0;
		}
	}
	.navWrapper {
		margin-top: 30px;
		ul {
			padding: 0 160px;
			display: -webkit-flex;
			display: flex;
			justify-content: space-around;
			li {
				display: -webkit-flex;
				display: flex;
				justify-content: center;
				align-items: center;
				width: 312px;
				height: 100px;
				color: rgb(123, 123, 123);
				border: 1px solid rgba(187, 187, 187, 1); /*no*/
				border-radius: 30px;
				box-shadow: 2px 2px 0px 0px rgba(170, 170, 170, 1); /*no*/
				box-sizing: border-box;
			}
			i {
				font-size: 38px;
				line-height: 1;
				margin-right: 10px;
			}
			span {
				font-size: 30px;
				line-height: 1rem;
			}
		}
	}
	.sloganWrapper {
		text-align: center;
		margin-top: 110px;
		.slogan {
			font-size: 36px;
			color: rgba(0, 0, 0, 0.6);
		}
	}
}
</style>
