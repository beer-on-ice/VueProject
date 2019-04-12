<template lang="pug">
.header_wrapper
  el-menu(:default-active="$route.path" mode="horizontal" @select="handleSelect" router)
    el-row
      el-col(
        :xs="{span: 3}"
        :sm="{span: 3}"
        :md="{span: 3}"
        :lg="{span: 3}"
        :xl="{span: 3}"
      )
        el-menu-item(index="/about/business").flex-cc
          .logoWrapper
              .logo
      el-col(
        :xs="{span: 2}"
        :sm="{span: 2}"
        :md="{span: 2}"
        :lg="{span: 2}"
        :xl="{span: 2}"
      )
        el-menu-item(index="/about/business").flex-cc Business
      el-col(
        :xs="{span: 2}"
        :sm="{span: 2}"
        :md="{span: 2}"
        :lg="{span: 2}"
        :xl="{span: 2}"
      )
        el-menu-item(index="/about/personal").flex-cc Personal
      el-col(
        :xs="{span: 2,offset:7}"
        :sm="{span: 2,offset:7}"
        :md="{span: 2,offset:7}"
        :lg="{span: 2,offset:7}"
        :xl="{span: 2,offset:7}"
      ).hidden-md-and-down
        el-submenu(index="3")
          template(slot="title") Products
          el-menu-item(index="3-1") 1
          el-menu-item(index="3-2") 2
      el-col(
        :xs="{span: 2}"
        :sm="{span: 2}"
        :md="{span: 2}"
        :lg="{span: 2}"
        :xl="{span: 2}"
      ).hidden-md-and-down
        el-submenu(index="4")
          template(slot="title") Company
          el-menu-item(index="4-1") 1
          el-menu-item(index="4-2") 2
      el-col(
        :xs="{span: 1,offset:1}"
        :sm="{span: 1,offset:1}"
        :md="{span: 1,offset:1}"
        :lg="{span: 1,offset:1}"
        :xl="{span: 1,offset:1}"
      ).hidden-md-and-down
        router-link(tag="el-menu-item" to="/login").flex-cc Log In
      el-col(
        :xs="{span: 1}"
        :sm="{span: 1}"
        :md="{span: 1}"
        :lg="{span: 1}"
        :xl="{span: 1}"
      ).hidden-md-and-down.flex-cc
        span |
      el-col(
        :xs="{span: 2}"
        :sm="{span: 2}"
        :md="{span: 2}"
        :lg="{span: 2}"
        :xl="{span: 2}"
      ).hidden-md-and-down
        el-menu-item.flex-cc
          el-button(type="primary" @click="showRegister") Sign Up
      el-col(
        :xs="{span: 2,offset:15}"
        :sm="{span: 2,offset:15}"
        :md="{span: 2,offset:15}"
        :lg="{span: 2,offset:15}"
        :xl="{span: 2,offset:15}"
      ).hidden-lg-and-up
        el-menu-item.flex-c
          .dropdownWrapper.flex-c(@click="showPanel = !showPanel")
            i.iconfont &#xe684;
  el-collapse-transition
    .panelTabWrapper.hidden-lg-and-up(v-show="showPanel")
      .tabNavWrapper
        el-tabs.elTab(v-model="tabActiveName")
          el-tab-pane(label="为个人提供" name="1")
            p 在线支付
            p 开票
            p 有存货
          el-tab-pane(label="商务" name="2")
            p 卡
            p 钱包
      .panelNavWrapper
        el-collapse(v-model="panelActiveNames" accordion)
          el-collapse-item(title="公司")
            p
              i.iconfont &#xe6f1;
              | 关于
            p
              i.iconfont &#xe6f1;
              | 职业
            p
              i.iconfont &#xe6f1;
              | 博客
        div.single 求助
        router-link(tag="div" to="/login").single 登录
      .regWrapper
        el-button(type="primary" @click="showRegister") 注册
</template>

<script>
export default {
  data () {
    return {
      tabActiveName: '1',
      panelActiveNames: ['1'],
      showPanel: false,
      activeIndex: '1',
      activeIndex2: '1'
    }
  },
  methods: {
    showRegister () {
      this.$router.push('/register')
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    }
  }
}
</script>

<style lang="scss" scoped>
.header_wrapper {
	width: 100%;
	position: fixed;
	top: 0;
	left: 0;
	background: #fff;
	z-index: 1000;
	.logoWrapper {
		.logo {
			width: 130px;
			height: 40px;
			background: url('./../../assets/images/logo.png') no-repeat;
			background-size: cover;
		}
	}
	.dropdownWrapper {
		i {
			font-size: 30px;
		}
	}
	span {
		font-size: 18px;
		display: block;
		margin-top: 18px;
	}
	/* 下拉面板 */
	.panelTabWrapper {
		width: 100%;
		position: absolute;
		top: 56px;
		left: 0;
		box-sizing: border-box;
		padding: 0 40px 30px;
		background: #fff;
		box-shadow: 0 10px 30px 0 rgba(0, 0, 0, 0.035);
		p {
			border-bottom: 1px solid #f2f2f2; /* no */
			font-size: 20px;
			padding: 20px 20px 10px;
			i {
				margin-right: 10px;
			}
		}
		.single {
			font-size: 13px;
			line-height: 50px;
			border-bottom: 1px solid #ebeef5;
		}
		.tabNavWrapper {
			div {
				font-size: 0px;
				line-height: 0;
			}
			p {
				font-size: 16px;
			}
		}
		.panelNavWrapper {
			.el-collapse {
				border-top: none;
			}
		}
		.regWrapper {
			margin-top: 30px;
			.el-button {
				padding: 10px 25 px;
				font-size: 18px;
			}
		}
	}
}
</style>
