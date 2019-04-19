<template lang="pug">
.personalWrapper
  .sectionOneWrapper
    el-row(type="flex" justify="space-between" align="middle")
      el-col(
        :md="10"
        :lg="10"
        :xl="10"
      )
        .left
          h2.hidden-sm-and-down Do <em>more</em> with your Bitcoin
          h2.hidden-md-and-up.long Do <em>more</em> with your Bitcoin
          p.hidden-sm-and-down Manage and spend your Bitcoin with the BitPay wallet, and turn Bitcoin into dollars with BitPay's prepaid Visa® card.
          p.hidden-md-and-up.long Manage and spend your Bitcoin with the BitPay wallet, and turn Bitcoin into dollars with BitPay's prepaid Visa® card.
          div.flex-cc.btnWrapper
            el-button(plain type="primary") Order CyberPay Card
            el-button(plain @click="getWallet") Get CyberPay Wallet
      el-col(
        :md="{span: 9,offset:1}"
        :lg="{span: 9,offset:3}"
        :xl="{span: 9}"
      ).hidden-sm-and-down
        .right
          .img
  .sectionTwoWrapper
    el-row(type="flex" justify="space-between" align="middle")
      el-col(
        :md="11"
        :lg="11"
        :xl="11"
      )
        .left
          h2.hidden-sm-and-down <em>Shop</em> with Visa merchants across the globe
          h2.hidden-md-and-up.long <em>Shop</em> with Visa merchants across the globe
          .tip
            .flex-s
              i.iconfont &#xe601;
              span Manage and spend your Bitcoin with the BitPay wallet
            .flex-s
              i.iconfont &#xe601;
              span Manage and spend your Bitcoin with the BitPay wallet
          .btnWrapper.flex-s
            el-button.hidden-sm-and-down(plain type="primary") Order Now
            el-button.hidden-md-and-up.longBtn(plain type="primary") Order Now
            span.hidden-sm-and-down.flex-c Learn more
              i.iconfont &#xe60c;
      el-col(
        :md="{span: 9,offset:1}"
        :lg="{span: 9,offset:1}"
        :xl="{span: 9,offset:1}"
      ).hidden-sm-and-down
        .right
          .img
</template>

<script>
export default {
  methods: {
    getWallet () {
      this.$router.push('/wallet')
    }
  }
}
</script>

<style lang="scss" scoped>
.personalWrapper {
	h2 {
		font-size: 70px;
		line-height: 80px;
		&.long {
			text-align: center;
		}
		em {
			color: #214497;
		}
	}
	.sectionOneWrapper {
		.left {
			p {
				margin-top: 50px;
				font-size: 20px;
				line-height: 30px;
				&.long {
					text-align: center;
				}
			}
			.btnWrapper {
				margin-top: 50px;
				.el-button {
					padding: 20px 30px;
					margin-right: 40px;
				}
			}
		}
		.right {
			.img {
				width: 400px;
				height: 600px;
				background: url('./img/homepage.png') no-repeat;
				background-size: cover;
			}
		}
	}
	.sectionTwoWrapper {
		margin-top: 100px;
		.left {
			h2 {
				line-height: 100px;
			}
			.tip {
				font-size: 20px;
				line-height: 30px;
				div {
					margin-top: 30px;
				}
				i {
					font-size: 30px;
					line-height: 30px;
					margin-right: 20px;
				}
			}
			.btnWrapper {
				margin-top: 30px;
				.el-button {
					padding: 20px 30px;
					margin-right: 30px;
					&.longBtn {
						width: 100%;
						padding: 30px;
						font-size: 30px;
					}
				}
				span {
					font-size: 20px;
					color: #4f6ef7;
					i {
						font-size: 18px;
						margin-left: 10px;
					}
				}
			}
		}
		.right {
			.img {
				width: 500px;
				height: 300px;
				background: url('./img/CARD.png') no-repeat;
				background-size: contain;
			}
		}
	}
}
</style>
