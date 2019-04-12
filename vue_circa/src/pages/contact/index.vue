<template lang="pug">
.ContactWrapper
  el-header
    Header
  el-main
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
            .logo
        el-col(
          :xs="24"
          :sm="24"
          :md="{span: 10}"
          :lg="{span: 10}"
          :xl="{span: 10}"
        )
          .rightWrapper
            el-form(ref="form" :model="form" label-width="80px" label-position="top")
              el-form-item(label="Mail")
                el-input(v-model="mail")
              el-form-item(label="Contact Sales")
                el-input(v-model="phone")
              el-form-item(label="Wechat")
                el-input(v-model="wechat")
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
	max-width: 1440px;
	h2 {
		font-size: 40px;
		font-weight: bold;
		line-height: 50px;
		padding: 0 30px;
	}
	.mainWrapper {
		margin-top: 80px;
		.logo {
			width: 331px;
			height: 331px;
			background: url('./../../assets/images/business/pic_help.png') no-repeat;
			background-size: contain;
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
