<template lang="pug">
.walletWrapper
  Header
  .bg-wrapper
  .wrapper
    .sectionOneWrapper
      el-row(type="flex" justify="space-between" align="middle").flex-wrap
        el-col(
          :md="11"
          :lg="11"
          :xl="11"
        )
          .left
            p 与企业支付结合，快速结算
            p 独有 ATM提现存币功能，服务你的生活
            p 站内收发 0 费用，秒到账
        el-col(
          :md="8"
          :lg="8"
          :xl="8"
        )
          .right
            .img
    .sectionTwoWrapper
      el-row(type="flex" justify="space-between" align="middle").flex-wrap-re
        el-col(
          :md="8"
          :lg="8"
          :xl="8"
        )
          .right
            .img
        el-col(
          :md="12"
          :lg="12"
          :xl="12"
        )
          .left
            h2 使用比特币和比特币现金做更多事情。
            p 获得比特币和比特币现金以及买卖比特币的强大选择。
            p 直接在支持CberPay结算的商家进行消费付款。加载和管理您的CberPay卡，在所有支持CberPay的自动取款机取现购买比特币和比特币现金。
    .sectionThreeWrapper
      el-row(type="flex" justify="space-between" align="middle").flex-wrap
        el-col(
          :md="11"
          :lg="11"
          :xl="11"
        )
          .left
            h2 使用安全的区块链存储快速启动并运行。
            p 以正确的方式开始使用比特币和比特币现金。
            p 谈到数字货币，细节很重要。让您的钱包引导您了解比特币和比特币现金的基本安全性。
            p 我们为新用户精心设计了这款应用程序，无需隐藏重要信息或删除强大功能。
        el-col(
          :md="{span: 11,offset:2}"
          :lg="11"
          :xl="11"
        )
          .right
            .img.img_1
            .img.img_2
            .img.img_3
  Footer

</template>

<script>
import Header from 'components/Header'
import Footer from 'components/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.walletWrapper {
	position: relative;
	.bg-wrapper {
		background: url('./img/bg.jpg') no-repeat;
		background-size: cover;
		background-position: center center;
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		height: 790px;
	}
	.wrapper {
		max-width: 1440px;
		margin: 0 auto;
		.flex-wrap {
			flex-wrap: wrap;
		}
		.flex-wrap-re {
			flex-wrap: wrap-reverse;
		}
		.sectionOneWrapper {
			height: 733px;
			overflow: hidden;
			.left {
				text-align: center;
				p {
					font-size: 36px;
					line-height: 56px;
					color: #fff;
				}
			}
			.right {
				.img {
					margin: 0 auto;
					width: 400px;
					height: 700px;
					background: url('./img/wallet.png') no-repeat;
					background-size: contain;
				}
			}
		}
		.sectionTwoWrapper {
			margin-top: 100px;
			.left {
				h2 {
					font-size: 48px;
					line-height: 60px;
				}
				p {
					margin-top: 30px;
					font-size: 24px;
					line-height: 30px;
					color: #6b757d;
				}
			}
			.right {
				.img {
					margin: 0 auto;
					width: 500px;
					height: 700px;
					background: url('./img/wallet.png') no-repeat;
					background-size: contain;
				}
			}
		}
		.sectionThreeWrapper {
			margin: 100px 0;
			.left {
				h2 {
					font-size: 48px;
					line-height: 60px;
				}
				p {
					margin-top: 30px;
					font-size: 24px;
					line-height: 30px;
					color: #6b757d;
				}
			}
			.right {
				position: relative;
				width: 600px;
				height: 800px;
				margin: 0 auto;
				.img {
					width: 400px;
					height: 600px;
					position: absolute;
				}
				.img_1 {
					background: url('./img/code_1.png') no-repeat;
					background-size: contain;
					top: 0;
					right: 200px;
					z-index: 1003;
				}
				.img_2 {
					background: url('./img/code_2.png') no-repeat;
					background-size: contain;
					top: 100px;
					right: 100px;
					z-index: 1002;
				}
				.img_3 {
					background: url('./img/code_3.png') no-repeat;
					background-size: contain;
					top: 200px;
					right: 0;
					z-index: 1001;
				}
			}
		}
	}
}
</style>
