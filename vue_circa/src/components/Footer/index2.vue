<template lang="pug">
div
  .footWrapper
    el-row
      el-col(
        :xs="24"
        :sm="24"
        :md="24"
        :lg="{span:4,pull:2}"
        :xl="{span:4,pull:2}"
      )
        .leftWrapper
          .logo
          span All rights reserved
          br
          span © 2019 CberPay
      el-col(
        :xs="24"
        :sm="24"
        :md="24"
        :lg="{span:12}"
        :xl="{span:12}"
      )
        .centerWrapper
          ul
            el-col(
              :xs="20"
              :sm="20"
              :md="22"
              :lg="{span:8}"
              :xl="{span:8}"
            )
              li
                h4 个人
                span 钱包应用
                span 卡式业务
                span 帮助文档
            el-col(
              :xs="20"
              :sm="20"
              :md="22"
              :lg="{span:8}"
              :xl="{span:8}"
            )
              li
                h4 企业
                span 线上支付
                span 快捷支付
                span ATM机
            el-col(
              :xs="20"
              :sm="20"
              :md="22"
              :lg="{span:8}"
              :xl="{span:8}"
            )
              li
                h4 开发者
                span 开发文档
                span ATM地图
                span 社区
      el-col(
        :xs="24"
        :sm="24"
        :md="24"
        :lg="{span:8,push:2}"
        :xl="{span:8,push:2}"
      )
        .rightWrapper
          h4 帮助中心
          .question
            input(type="text" placeholder='您的问题')
            i.iconfont &#xe61d;
          span CberPay是基于Bitcoin Cash构建的加密支付网关，用于协助用户快速加入去中心化网络，并其更安全的使用加密货币。
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.footWrapper {
	margin-top: 0.1rem;
	padding: 0.55rem 1.5rem;
	background-color: #000;
	font-size: 0.16rem;
	.leftWrapper {
		.logo {
			width: 1.15rem;
			height: 0.37rem;
			background: url('./../../assets/images/logo2.png') no-repeat;
			background-size: contain;
			margin-bottom: 0.1rem;
		}
		span {
			font-size: 0.16rem;
			color: rgb(88, 86, 86);
		}
	}
	.centerWrapper {
		ul {
			li {
				font-size: 0.18rem;
				color: #fff;
				h4 {
					margin-bottom: 0.3rem;
				}
				span {
					display: block;
					margin-top: 0.2rem;
				}
			}
		}
	}
	.rightWrapper {
		width: 3rem;
		h4 {
			font-size: 0.18rem;
			color: #fff;
		}
		.question {
			margin-top: 0.3rem;
			position: relative;
			input {
				width: 2.7rem;
				background: rgb(48, 47, 47);
				border: none;
				padding: 0.15rem 0.2rem 0.15rem 0.15rem;
			}
			i {
				position: absolute;
				top: 0.1rem;
				right: 0.05rem;
				font-size: 0.25rem;
				color: rgb(114, 111, 111);
			}
		}
		span {
			margin-top: 0.3rem;
			font-size: 0.16rem;
			color: rgb(71, 71, 71);
			display: inline-block;
		}
	}
}
</style>
