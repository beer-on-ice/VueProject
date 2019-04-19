<template lang="pug">
.businessWrapper
  .sectionOneWrapper
    el-row
      el-col(
        :md="11"
        :lg="11"
        :xl="11"
      )
        .leftWrapper
          .topWrapper
              h3.hidden-sm-and-down Accept cryptocurrency payments
              h3.hidden-md-and-up.long Accept cryptocurrency payments
          .bottomWrapper
            p.hidden-sm-and-down Expand your payment options by accepting instant BTC and BCH payments without risk or price fluctuations.
            p.hidden-md-and-up.long Expand your payment options by accepting instant BTC and BCH payments without risk or price fluctuations.
            el-row
              el-col(
                :md="10"
                :lg="10"
                :xl="10"
              )
                el-button(round).hidden-sm-and-down Get Started
                el-button(round).hidden-md-and-up.longBtn Get Started
              el-col(
                :md="10"
                :lg="10"
                :xl="10"
              )
                el-button(@click="contact" round).hidden-sm-and-down Contact Sales
                el-button(@click="contact" round).hidden-md-and-up.longBtn Contact Sales
      el-col(
        :md="12"
        :lg="12"
        :xl="12"
      ).hidden-sm-and-down
        .rightWrapper
          .logo
  .sectionTwoWrapper
    img(src="./img/bg_home.png")
    .titleWrapper
      h3 ACCEPT BITCOIN PAYMENTS ANYWHERE
      p Learn More
        i.iconfont &#xe60c;
    ul.navWrapper.flex-cc
      el-row
        el-col(
          :xs="8"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="8"
        )
          li.person
            div
            h4 IN PERSON
            span Accept Bitcoin on your smartphone or tablet at your retail store or restaurant.
        el-col(
          :xs="8"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="8"
        )
          li.website
            div
            h4 ON YOUR WEBSITE
            span Accept Bitcoin payments and donations from your online customers.
        el-col(
          :xs="8"
          :sm="8"
          :md="8"
          :lg="8"
          :xl="8"
        )
          li.mail
            div
            h4 BY EMALL
            span Send invoices to vendors as quickly and easily as sending an email.
  .sectionThreeWrapper
    h3 ACCEPT BITCOIN, GET PAID IN
    em BTC
    p Receive funds directly to your bank account with zero price volatility or risk. See how it works
  .sectionFourWrapper
    ul
      el-row
        li.trusted
          el-col(
            :md="{span: 15,offset:1}"
            :lg="{span: 15}"
            :xl="{span: 15}"
          )
            .left
              h3.hidden-sm-and-down Trusted & Transparent
              h3.hidden-md-and-up.long Trusted & Transparent
              p Uphold is fully reserved. Unlike banks, we don’t loan out your money. We publish our holdings and obligations in real time.
              el-button(round).hidden-sm-and-down Learn more
                i.iconfont &#xe60c;
              el-button(round).hidden-md-and-up.longBtn Learn more
                i.iconfont &#xe60c;
          el-col(
            :md="{span: 8,pull:3}"
            :lg="{span: 8}"
            :xl="{span: 8,pull:2}"
          ).hidden-sm-and-down
            .right
              .imgs
      el-row
        li.secure.flex-resverse
          el-col(
            :md="{span: 13,offset:2}"
            :lg="{span: 15,offset:3}"
            :xl="{span: 15}"
          )
            .left.clearfix
              h3.hidden-sm-and-down Trusted & Transparent
              h3.hidden-md-and-up.long Trusted & Transparent
              p Uphold is fully reserved. Unlike banks, we don’t loan out your money. We publish our holdings and obligations in real time.
              el-button(round).hidden-sm-and-down Learn more
                i.iconfont &#xe60c;
              el-button(round).hidden-md-and-up.longBtn Learn more
                i.iconfont &#xe60c;
          el-col(
            :md="{span: 8,offset:1}"
            :lg="{span: 8}"
            :xl="{span: 8}"
          ).hidden-sm-and-down
            .right
              .imgs
      el-row
        li.world
          el-col(
            :md="{span: 15,offset:1}"
            :lg="{span: 15}"
            :xl="{span: 15}"
          )
            .left
              h3.hidden-sm-and-down World Class. Worldwide.
              h3.hidden-md-and-up.long World Class. Worldwide.
              p Send money to your friends and family in more than 150 countries. We allow you to email Bitcoin - and other currencies - to people almost everywhere.
              el-button(round).hidden-sm-and-down Learn more
                i.iconfont &#xe60c;
              el-button(round).hidden-md-and-up.longBtn Learn more
                i.iconfont &#xe60c;
          el-col(
            :md="{span: 8,pull:3}"
            :lg="{span: 8}"
            :xl="{span: 8,pull:2}"
          ).hidden-sm-and-down
            .right
              .imgs
</template>

<script>
export default {
  methods: {
    contact () {
      this.$router.push('/dashboard/contact')
    }
  }
}
</script>

<style lang="scss" scoped>
.businessWrapper {
	.sectionOneWrapper {
		.leftWrapper {
			margin-top: 50px;
			.topWrapper {
				h3 {
					font-size: 70px;
					line-height: 100px;
					color: #062d64;
					&.long {
						text-align: center;
					}
				}
			}
			.bottomWrapper {
				p {
					font-size: 24px;
					line-height: 43px;
					color: #6f6f6f;
					&.long {
						text-align: center;
					}
				}
				.el-button {
					margin-top: 30px;
					padding: 20px 50px;
					background: #062d64;
					color: #fff;
					&.longBtn {
						width: 100%;
						padding: 30px;
						font-size: 30px;
					}
				}
			}
		}
		.rightWrapper {
			width: 793px;
			height: 653px;
			background: url('./img/map.png') no-repeat;
			background-size: contain;
		}
	}
	.sectionTwoWrapper {
		position: relative;
		width: 100%;
		height: 959px;
		margin-top: 50px;
		img {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: -1;
		}
		.titleWrapper {
			text-align: center;
			padding-top: 50px;
			color: #fff;
			h3 {
				font-size: 50px;
				line-height: 60px;
			}
			p {
				font-size: 20px;
				line-height: 1;
				i {
					font-size: 18px;
					font-weight: bold;
					margin-left: 10px;
				}
			}
		}
		.navWrapper {
			margin-top: 200px;
			padding: 0 40px;
			li {
				text-align: center;
				color: #dddddd;
				h4 {
					font-size: 36px;
					line-height: 1.5;
				}
				span {
					font-size: 18px;
					line-height: 1.5;
					display: block;
				}
				div {
					width: 80px;
					height: 90px;
					margin: 0 auto;
				}
			}
			.person {
				div {
					background: url('./img/person.png') no-repeat;
					background-size: contain;
				}
			}
			.website {
				padding-top: 100px;
				div {
					background: url('./img/website.png') no-repeat;
					background-size: contain;
				}
			}
			.mail {
				div {
					background: url('./img/mail.png') no-repeat;
					background-size: contain;
				}
			}
		}
	}
	.sectionThreeWrapper {
		text-align: center;
		padding: 0 180px;
		margin-top: 100px;
		h3 {
			font-size: 48px;
			line-height: 100px;
			color: #062d64;
			font-weight: bold;
		}
		em {
			display: block;
			font-size: 60px;
			line-height: 100px;
			color: #f5a623;
			font-weight: bold;
		}
		p {
			margin-top: 60px;
			font-size: 41px;
			line-height: 60px;
			color: #7c7c7c;
		}
	}
	.sectionFourWrapper {
		ul {
			li {
				margin-top: 100px;
				.right {
					margin-top: 150px;
					.imgs {
						width: 573px;
						height: 377px;
					}
				}
				.left {
					h3 {
						font-size: 54px;
						line-height: 100px;
						font-weight: bold;
						&.long {
							text-align: center;
						}
					}
					p {
						font-size: 34px;
						line-height: 1.5;
						color: #7c7c7c;
					}
					.el-button {
						margin-top: 80px;
						background: #c4e5f1;
						color: #4366a1;
						font-size: 34px;
						padding: 20px 50px;
						&.longBtn {
							width: 100%;
							padding: 30px;
							font-size: 30px;
						}
						i {
							font-size: 34px;
							line-height: 1;
							margin-left: 20px;
						}
					}
				}
			}
			.trusted {
				.imgs {
					background: url('./img/trusted.png') no-repeat;
					background-size: contain;
				}
			}
			.world {
				.imgs {
					background: url('./img/world.png') no-repeat;
					background-size: contain;
				}
			}
			.secure {
				.left {
					float: right;
					padding-right: 30px;
					h3 {
						text-align: right;
					}
					.el-button {
						float: right;
					}
				}
				.right {
					margin-top: 150px;
				}
				.imgs {
					background: url('./img/secure.png') no-repeat;
					background-size: contain;
				}
			}
		}
	}
}
</style>
