<template lang="pug">
div
  Header(tagType="business")
  .sectionOneWrapper
    .leftWrapper
      .img
    .rightWrapper
      h3 接入全球最安全的价值网络让您的商业疆域更加的广袤
      ul
        li
          i.iconfont &#xe6d5;
          span 让全球各地的客户更便捷支付
        li
          i.iconfont &#xe7d6;
          span 极速确认账单，并且安全可靠
        li
          i.iconfont &#xe6f1;
          span 商户自定义交易手续费
      el-button(type="primary") 了解更多
      span.way 获得CberPay Wallet或CberPay Card
  .sectionTwoWrapper
    .leftWrapper
      h3 7X24保护在线交易安全已被全球数千家企业<em>信赖</em>
    .rightWrapper
      .img
  .sectionThirdWrapper
    h3 让加密资产为您的商业流程助力
    .img
  .contactWrapper
    .leftWrapper
      span 联系我们：
      .inputWrapper
        input(v-model='input' placeholder='您的邮箱地址')
        button 提交
    .rightWrapper
      span.apple
      span.android
  Footer.footerConp
</template>

<script>
import Header from 'components/Header'
import Footer from 'components/Footer'
export default {
  data () {
    return {
      input: ''
    }
  },
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.sectionOneWrapper {
	display: -webkit-flex;
	display: flex;
	justify-content: space-between;
	padding: 0 1rem;
	margin-top: 1rem;
	.leftWrapper {
		margin-right: 0.9rem;
		.img {
			width: 5.55rem;
			height: 4.5rem;
			background: url('./../../assets/images/pc.png') no-repeat;
			background-size: contain;
		}
	}
	.rightWrapper {
		margin-top: 0.5rem;
		h3 {
			font-size: 0.48rem;
			line-height: 0.6rem;
		}
		ul {
			margin-top: 0.6rem;
		}
		li {
			display: flex;
			justify-content: flex-center;
			align-items: center;
			font-size: 0.2rem;
			line-height: 0.5rem;
			i {
				font-size: 0.24rem;
				line-height: 0.5rem;
				color: #1f68c1;
				margin-right: 0.1rem;
			}
		}
		span.way {
			font-size: 0.16rem;
			margin-left: 0.3rem;
			color: #1f68c1;
			text-decoration: underline;
		}
	}
}
.sectionTwoWrapper {
	display: -webkit-flex;
	display: flex;
	justify-content: space-between;
	padding: 0 0 0 1rem;
	margin-top: 1.5rem;
	.leftWrapper {
		margin-top: 0.5rem;
		margin-right: 3.7rem;
		h3 {
			font-size: 0.48rem;
			line-height: 0.6rem;
			em {
				color: #1f68c1;
			}
		}
	}
	.rightWrapper {
		.img {
			width: 4.4rem;
			height: 3.22rem;
			background: url('./../../assets/images/pc2.png') no-repeat;
			background-clip: content-box;
		}
	}
}
.sectionThirdWrapper {
	text-align: center;
	margin-top: 1.8rem;
	h3 {
		font-size: 0.48rem;
		line-height: 0.6rem;
	}
	.img {
		width: 5.55rem;
		height: 4.5rem;
		background: url('./../../assets/images/map.png') no-repeat;
		background-size: contain;
		margin: 3.4rem auto 0;
	}
}
.contactWrapper {
	background: #000;
	margin-top: 0.5rem;
	height: 1.2rem;
	display: -webkit-flex;
	display: flex;
	justify-content: space-around;
	.leftWrapper {
		display: -webkit-flex;
		display: flex;
		align-items: center;
		font-size: 0.2rem;
		span {
			color: #fff;
		}
		.inputWrapper {
			input {
				width: 3.8rem;
				padding: 0.12rem;
				background: #333232;
				border: none;
				color: rgb(165, 162, 162);
				vertical-align: middle;
			}
			button {
				padding: 0.1rem 0.3rem;
				border: none;
				background: rgb(24, 83, 138);
				vertical-align: middle;
				color: #fff;
			}
		}
	}
	.rightWrapper {
		display: -webkit-flex;
		display: flex;
		align-items: center;
		span {
			width: 1.2rem;
			height: 0.5rem;
			background: #1f68c1;
			margin: 0 0.2rem;
			display: inline-block;
		}
	}
	.footerConp {
		margin-top: 0.15rem;
	}
}
</style>
