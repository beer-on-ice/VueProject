<template lang="pug">
  #header_wrapper
    .options
      router-link(tag="span" to='/business' :class="{active1: tagType ===0}") 企业
      router-link(tag="span" to='/personal' :class="{active2: tagType ===1}") 个人
      router-link(tag="span" to='/developer' :class="{active3: tagType ===2}") 开发者
    .uniqueHeadWrapper
      .logoWrapper
        .logo
      ul.loginWrapper
        li
          span 帮助中心
        li
          span 登录
        li.reg
          span 注册
</template>

<script>
export default {
  data () {
    return {
      tagType: 0
    }
  },
  mounted () {
    switch (this.$route.path) {
      case '/business':
        this.tagType = 0
        break
      case '/personal':
        this.tagType = 1
        break
      case '/developer':
        this.tagType = 2
        break
      default:
        this.tagType = 0
        break
    }
  }
}
</script>

<style lang="scss" scoped>
#header_wrapper {
	width: 100%;
	border-bottom: 1px solid #bbbbbb;
	.options {
		font-size: 0.18rem;
		line-height: 0.48rem;
		height: 0.48rem;
		font-weight: bold;
		background-color: rgba(0, 0, 0, 0.6);
		color: #fff;
		padding: 0 0.45rem;
		span {
			padding: 0 0.15rem;
		}
		& .active1 {
			color: #2989ff;
		}
		& .active2 {
			color: red;
		}
		& .active3 {
			color: yellow;
		}
	}
	.uniqueHeadWrapper {
		display: -webkit-flex;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 0.6rem;
		height: 1rem;
		.logoWrapper {
			.logo {
				width: 2.04rem;
				height: 0.53rem;
				background: url('./../../assets/images/logo.png') no-repeat;
				background-size: cover;
			}
		}
		.loginWrapper {
			display: flex;
			li {
				font-size: 0.16rem;
				line-height: 0.38rem;
				padding: 0 0.21rem;
			}
			& .reg {
				background-color: #1f68c1;
				color: #fff;
			}
		}
	}
}
</style>
