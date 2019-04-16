<template lang="pug">
.personalWrapper
  .sectionOneWrapper
    el-row
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 10,offset:2}"
        :lg="{span: 10,offset:2}"
        :xl="{span: 10,offset:2}"
      )
        .left
          h2 Do <em>more</em> with your Bitcoin
          p Manage and spend your Bitcoin with the BitPay wallet, and turn Bitcoin into dollars with BitPay's prepaid Visa® card.
          div.flex-s.btnWrapper
            el-button(plain type="primary") Order CyberPay Card
            el-button(plain) Get CyberPay Wallet
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 9,offset:3}"
        :lg="{span: 9,offset:3}"
        :xl="{span: 9,offset:3}"
      ).hidden-sm-and-down
        .right
          .img
  .sectionTwoWrapper
    el-row
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 10,offset:2}"
        :lg="{span: 10,offset:2}"
        :xl="{span: 10,offset:2}"
      )
        .left
          h2
            | <em>Shop</em> with Visa
            | <br/>
            | merchants across
            | <br/>
            | the globe
          div.flex-c
            i.iconfont &#xe601;
            span Manage and spend your Bitcoin with the BitPay wallet
          div.flex-c
            i.iconfont &#xe601;
            span Manage and spend your Bitcoin with the BitPay wallet
          div.btnWrapper.flex-s
            el-button(plain type="primary") Order Now
            span.flex-c Learn more
              i.iconfont &#xe60c;
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 9,offset:3}"
        :lg="{span: 9,offset:3}"
        :xl="{span: 9,offset:3}"
      ).hidden-sm-and-down
        .right
          .img
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.personalWrapper {
	margin-top: 100px;
	h2 {
		font-size: 70px;
		line-height: 80px;
		em {
			color: #214497;
		}
	}
	.sectionOneWrapper {
		.left {
			p {
				margin-top: 50px;
				padding-right: 100px;
				font-size: 20px;
				line-height: 30px;
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
				width: 500px;
				height: 800px;
				background: url('./img/homepage.png') no-repeat;
				background-size: cover;
			}
		}
	}
	.sectionTwoWrapper {
		margin-top: 100px;
		.left {
			font-size: 20px;
			line-height: 30px;
			h2 {
				line-height: 100px;
			}
			div {
				margin-top: 30px;
			}
			i {
				font-size: 30px;
				line-height: 30px;
				margin-right: 20px;
			}
			.btnWrapper {
				.el-button {
					padding: 20px 30px;
					margin-right: 30px;
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
			margin-top: 80px;
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
