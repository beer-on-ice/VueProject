<template lang="pug">
.personalWrapper
  el-row
    .sectionOneWrapper.flex-b
      el-col(
        :xs="24"
        :sm="24"
        :md="24"
        :lg="{span: 11,offset:1}"
        :xl="{span: 10,offset:1}"
      ).hidden-md-and-down
        .leftWrapper
          .img
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 14,offset:2}"
        :lg="{span: 11,offset:2,pull:1}"
        :xl="{span: 11,offset:2,pull:1}"
      )
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
    .sectionTwoWrapper.flex-b
      el-col(
        :xs="{span: 10,offset:2}"
        :sm="{span: 10,offset:2}"
        :md="{span: 10,offset:2}"
        :lg="{span: 10,offset:2}"
        :xl="{span: 10,offset:2}"
      )
        .leftWrapper
          h3 7X24保护在线交易安全已被全球数千家企业<em>信赖</em>
      el-col(
        :xs="24"
        :sm="24"
        :md="24"
        :lg="{span: 10,offset:2}"
        :xl="{span: 10,offset:2}"
      ).hidden-md-and-down
        .rightWrapper
          .img
    .sectionThirdWrapper
      h3 让加密资产为您的商业流程助力
      .img
    .contactWrapper.flex-c
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 14,offset:2}"
        :lg="{span: 14,offset:2}"
        :xl="{span: 14,offset:2}"
      )
        .leftWrapper.flex-c
          span 联系我们：
          .inputWrapper
            input(v-model='input' placeholder='您的邮箱地址')
            button 提交
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 8}"
        :lg="{span: 8}"
        :xl="{span: 8}"
      )
        .rightWrapper.flex-c
          span.apple
          span.android
</template>

<script>
export default {
  data () {
    return {
      input: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.personalWrapper {
	.sectionOneWrapper {
		.leftWrapper {
			.img {
				width: 555px;
				height: 450px;
				background: url('./../../assets/images/pc.png') no-repeat;
				background-size: contain;
			}
		}
		.rightWrapper {
			margin-top: 50px;
			h3 {
				font-size: 48px;
				line-height: 60px;
			}
			ul {
				margin-top: 60px;
			}
			li {
				display: flex;
				justify-content: flex-center;
				align-items: center;
				font-size: 20px;
				line-height: 50px;
				i {
					font-size: 24px;
					line-height: 50px;
					color: #1f68c1;
					margin-right: 10px;
				}
			}
			span.way {
				font-size: 16px;
				margin-left: 30px;
				color: #1f68c1;
				text-decoration: underline;
			}
		}
	}
	.sectionTwoWrapper {
		margin-top: 150px;
		.leftWrapper {
			h3 {
				font-size: 48px;
				line-height: 60px;
				em {
					color: #1f68c1;
				}
			}
		}
		.rightWrapper {
			.img {
				width: 440px;
				height: 322px;
				background: url('./../../assets/images/pc2.png') no-repeat;
				background-clip: content-box;
			}
		}
	}
	.sectionThirdWrapper {
		text-align: center;
		margin-top: 180px;
		h3 {
			font-size: 48px;
			line-height: 60px;
		}
		.img {
			width: 555px;
			height: 450px;
			background: url('./../../assets/images/map.png') no-repeat;
			background-size: contain;
			margin: 340px auto 0;
		}
	}
	.contactWrapper {
		background: #000;
		margin-top: 50px;
		height: 120px;
		.leftWrapper {
			font-size: 20px;
			span {
				color: #fff;
			}
			.inputWrapper {
				position: relative;
				input {
					width: 380px;
					padding: 12px;
					background: #333232;
					border: none;
					color: rgb(165, 162, 162);
					vertical-align: middle;
				}
				button {
					position: absolute;
					top: 0;
					right: 0;
					padding: 10px 30px;
					border: none;
					background: rgb(24, 83, 138);
					vertical-align: middle;
					color: #fff;
				}
			}
		}
		.rightWrapper {
			span {
				width: 120px;
				height: 50px;
				background: #1f68c1;
				margin: 0 20px;
				display: inline-block;
			}
		}
	}
}
</style>
