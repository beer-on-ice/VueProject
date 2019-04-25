<template lang="pug">
.atmWrapper
  .wrapper
    #atm_header
      .header_nav_wrapper.flex-e
        router-link(to="/about/business" tag="span").header_index 首页
        span.header_info 关于ATM
    .border_wrapper
      span 让你的资产随处可用
    #atm_introduce_wrapper
      h2.atm_introduce_title.common_title Buy Cryptocurrency ATM<span>.</span>
      .atm_introduce_info On this page you can find a list of mostly used Bitcoin ATMs and link to providers website.<br /> Alternatively you can check and buy a used or new Bitcoin ATM from operators, resellers or other Bitcoin ATM owners (see second hand section below).<br /> Want your Bitcoin ATM to be listed here – send a message to support@coinatmradar.com <br /> If you plan to run your own bitcoin ATM the following collection of articles about bitcoin ATM operation might be useful.
    #atm_production_wrapper
      h2.atm_production_title.common_title Cryptocurrency ATM型号<span>.</span>
      div.flex-b
        .atm_production_item
          .atm_production_item_introduce_wrapper
            .flex-s
              .atm_production_item_img
              .atm_production_item_info_wrapper
                h3 Cberpay ATM
                ul.atm_production_item_advantage
                  li <span>&gt;</span>购买和提取加密货币功能
                  li <span>&gt;</span>17寸显示屏
                  li <span>&gt;</span>读卡器
                  li <span>&gt;</span>数字加密键盘
                  li <span>&gt;</span>可选得指纹阅读器
            .atm_production_item_info For sale is the Douro 2 together with the Santo Tirso stand. The Douro 2 on its own currently retails for crica £4,550 and the Santo Tirso (Cash dispenser) on its own for circa £3850 on the official Lamassu website. This machine is therefore currently worth £8,400 if you buy it new! This cryptomat is a 2 way machine, meaning that customers are able to buy and sell Bitcoin and other cryptocurrencies through this machine. The machine is in perfect working order. Local collection or inspection at: 134 Plumstead High Street SE18 1JQ, London, London United Kingdom Manufacturer: Lamassu
            .atm_production_item_price_wrapper
              .atm_production_item_price_title 价格:
              .flex-b
                ul.atm_production_item_price_detail
                  li.atm_production_item_fee <span>&gt;</span> 8500美金
                  li.atm_production_item_price <span>&gt;</span> 运费自理
                button.atm_production_item_buy 购买
      .border
      #atm_footer
        .footer_info Second-hand ads originate from external parties.<br />Please make sure you identify counterparty and take all precautionary measures before transfering any funds.
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
/* 公用 */
.atmWrapper {
	background: #000;
	position: relative;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	padding: 50px 0;
}
.wrapper {
	max-width: 1440px;
	margin: 0 auto;
}

.border_wrapper span {
	position: relative;
	display: block;
	text-align: center;
	font-size: 12px;
	line-height: 24px;
	letter-spacing: 16px;
	color: #fff;
}

.border_wrapper span:before,
.border_wrapper span:after {
	position: absolute;
	top: 50%;
	width: 35%;
	content: '';
	height: 1px;
	background: #fff;
}

.border_wrapper span:before {
	left: 0;
}

.border_wrapper span:after {
	right: 0;
}

.border {
	width: 100%;
	height: 1px;
	background: #fff;
	margin-top: 50px;
}

/* 标题 */
.common_title {
	font-size: 50px;
	line-height: 60px;
	color: #fff;
}

.common_title span {
	color: rgba(248, 156, 59, 1);
}

/* 清浮动 */
.clearfix:after {
	display: block;
	clear: both;
	content: '';
}

/* 头部 */
#atm_header {
	height: 700px;
	font-size: 48px;
	line-height: 160px;
	.header_nav_wrapper {
		padding-right: 70px;
		span {
			display: inline-block;
			padding: 0 38px;
			color: #fff;
		}
	}
}

/* 介绍 */
#atm_introduce_wrapper {
	margin: 80px 0;
	.atm_introduce_info {
		font-size: 20px;
		line-height: 30px;
		color: #fff;
		margin-top: 30px;
	}
	.atm_introduce_img {
		width: 725px;
		height: 139px;
		background: #ccc;
		margin: 60px auto 0;
	}
}

/* ATM型号 */
#atm_production_wrapper {
	margin: 39px 0;
	.atm_production_title {
		padding-bottom: 34px;
	}
	.atm_production_item {
		margin-top: 32px;
	}
	.atm_production_item_img {
		margin: 12px 50px 0 0;
		width: 300px;
		height: 300px;
		background: url('./img/atm.jpg') no-repeat;
		background-size: contain;
		border: none;
		float: left;
	}
	.atm_production_item_info_wrapper {
		h3 {
			font-size: 40px;
			line-height: 50px;
			color: #f89c3b;
		}
	}
	.atm_production_item_advantage {
		li {
			font-size: 20px;
			line-height: 26px;
			color: #fff;
			margin-top: 24px;
		}
		span {
			color: #f89c3b;
			margin-right: 20px;
		}
	}
	.atm_production_item_info {
		font-size: 20px;
		line-height: 26px;
		color: #fff;
		margin: 30px 0;
	}
	.atm_production_item_price_title {
		font-size: 40px;
		line-height: 60px;
		font-weight: bold;
		color: #f89c3b;
	}
	.atm_production_item_price_detail {
		font-size: 20px;
		line-height: 33px;
		color: #fff;
		span {
			color: #f89c3b;
			margin-right: 10px;
		}
		li {
			margin-top: 25px;
		}
	}
	.atm_production_item_buy {
		background: #f89c3b;
		height: 76px;
		border: none;
		float: right;
		padding: 0 30px;
		font-size: 30px;
		line-height: 46px;
	}
	/* 底部 */
	#atm_footer {
		padding: 29px 56px 22px 53px;
		background: #f89c3b;
		text-align: center;
		margin: 0.49rem auto;
		.footer_info {
			font-size: 24px;
			line-height: 26px;
			font-weight: bold;
		}
	}
}
</style>
