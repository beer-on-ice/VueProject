<template lang="pug">
.navWrapper
  .topWrapper.flex-e
    h3 {{$t('guide.afternoon')}} {{username}}!
  .centerWrapper
    .title
      h2 {{$t('guide.choose')}}
    .btnWrapper.flex-c
      el-button(round @click="handleWithdraw") {{$t('guide.withdraw')}}
      el-button(round @click="handleBuy") {{$t('guide.buy')}}
  .bottomWrapper.flex-e(@click="handleExit")
    i.iconfont &#xe613;
    p {{$t('guide.exit')}}
</template>

<script>
import Header from 'components/Header'
import { getCookie, delCookie } from 'utils/cookie'
export default {
  data () {
    return {
      username: ''
    }
  },
  mounted () {
    const userInfo = JSON.parse(getCookie('userinfo'))
    this.username = userInfo.username
  },
  methods: {
    handleWithdraw () {
      this.$router.push('/guide/withdraw')
    },
    handleBuy () {
      this.$router.push('/guide/buy')
    },
    handleExit () {
      delCookie('userinfo')
      this.$message({
        message: '已退出',
        type: 'success'
      })
      this.$router.push('/')
    }
  },
  components: {
    Header
  }
}
</script>

<style lang="scss" scoped>
.guideWrapper {
	.navWrapper {
		position: fixed;
		top: 150px;
		left: 0;
		right: 0;
		bottom: 0;
		background-color: #343232;
		padding: 0 70px;
		.topWrapper {
			margin-top: 30px;
			h3 {
				font-size: 36px;
				color: #fff;
			}
		}
		.centerWrapper {
			margin-top: 95px;
			h2 {
				text-align: center;
				font-size: 72px;
				color: #fff;
			}
			.btnWrapper {
				margin-top: 130px;
				.el-button {
					font-size: 30px;
					padding: 30px 50px;
					margin: 0 40px;
				}
			}
		}
		.bottomWrapper {
			margin-top: 160px;
			font-size: 30px;
			color: #fff;
			i {
				font-size: 28px;
				margin-right: 20px;
			}
		}
	}
}
</style>
