<template lang="pug">
.ContactWrapper
  Header
  h2 What can we help with today?
  .mainWrapper
    el-row
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 10,offset:2}"
        :lg="{span: 10,offset:2}"
        :xl="{span: 10,offset:2}"
      )
        .leftWrapper
          .imgs
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 11}"
        :lg="{span: 11}"
        :xl="{span: 11}"
      )
        .rightWrapper
          div
            p Mail
            el-input(v-model="mail")
          div
            p Contact Sales
            el-input(v-model="phone" )
          div
            p Wechat
            el-input(v-model="wechat" )
        .codeWrapper
          .left
            span Scan QR Code
            span Follow Circa
            span Wechat
          .right
            .code
</template>

<script>
import Header from 'components/Header'
export default {
  data () {
    return {
      mail: '',
      phone: '',
      wechat: ''
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" >
.ContactWrapper {
	margin-top: 70px;
	h2 {
		font-size: 40px;
		line-height: 50px;
		padding: 0 30px;
	}
	.mainWrapper {
		margin-top: 80px;
		div {
			line-height: 0;
		}
		.imgs {
			width: 331px;
			height: 331px;
			background: url('./../../assets/images/business/pic_help.png') no-repeat;
			background-size: contain;
		}
		.rightWrapper {
			div {
				margin-top: 10px;
				p {
					font-size: 20px;
					font-weight: bold;
					line-height: 30px;
				}
				.el-input__inner {
					height: 60px;
				}
			}
		}
		.codeWrapper {
			float: right;
			margin-top: 20px;
			position: relative;
			width: 90px;
			height: 62px;
			padding: 10px 62px 0 0;
			background: #f2f2f2;
			text-align: right;
			span {
				display: block;
				font-size: 10px;
				line-height: 16px;
				margin-right: 5px;
			}
			.code {
				position: absolute;
				top: 5px;
				right: 0;
				width: 62px;
				height: 62px;
				background: red;
			}
		}
	}
}
</style>
