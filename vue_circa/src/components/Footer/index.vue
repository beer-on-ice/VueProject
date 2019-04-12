<template lang="pug">
.footWrapper
  el-row
    el-col(
      :xs="24"
      :sm="24"
      :md="4"
      :lg="4"
      :xl="4"
    )
      .leftWrapper
        .logo
    el-col(
      :xs="24"
      :sm="24"
      :md="{span:17,offset:3}"
      :lg="{span:17,offset:3}"
      :xl="{span:17,offset:3}"
    ).hidden-sm-and-down
      .rightWrapper
          ul
            el-col(
              :xs="{span:6}"
              :sm="{span:6}"
              :md="{span:6}"
              :lg="{span:6}"
              :xl="{span:6}"
            )
              li
                h4 Personal
                span Wallet
                span Card
            el-col(
              :xs="{span:6}"
              :sm="{span:6}"
              :md="{span:6}"
              :lg="{span:6}"
              :xl="{span:6}"
            )
              li
                h4 Company
                span About
                span Careers
                span Press
                span Blog
            el-col(
              :xs="{span:6}"
              :sm="{span:6}"
              :md="{span:6}"
              :lg="{span:6}"
              :xl="{span:6}"
            )
              li
                h4 Business
                span ATM
                span Question
            el-col(
              :xs="{span:6}"
              :sm="{span:6}"
              :md="{span:6}"
              :lg="{span:6}"
              :xl="{span:6}"
            )
              li
                h4 Social
                span ATM
                span Facebook
                span Twitter
                span Instagtam
                span LinkedIn
    el-col(
      :xs="24"
      :sm="24"
      :md="{span:17,offset:3}"
      :lg="{span:17,offset:3}"
      :xl="{span:17,offset:3}"
    ).hidden-md-and-up
      .collapseWrapper
        el-collapse(accordion)
          el-collapse-item(title="Personal" name="1")
            div Wallet
            div Card
          el-collapse-item(title="Company" name="2")
            div About
            div Careers
            div Press
            div Blog
          el-collapse-item(title="Business" name="3")
            div ATM
            div Question
          el-collapse-item(title="Social" name="4")
            div ATM
            div Facebook
            div Twitter
            div Instagtam
            div LinkedIn
</template>

<script>
export default {
  data () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.footWrapper {
	border-top: 1px solid #000;
	margin: 15px 55px 0;
	padding-top: 50px;
	.leftWrapper {
		.logo {
			width: 155px;
			height: 52px;
			background: url('./../../assets/images/logo.png') no-repeat;
			background-size: contain;
		}
	}
	.rightWrapper {
		ul {
			li {
				h4 {
					font-size: 28px;
					margin-bottom: 0.3rem;
					color: #000;
				}
				span {
					font-size: 18px;
					display: block;
					margin-top: 0.2rem;
					color: #7c7c7c;
				}
			}
		}
		/deep/.collapseWrapper {
			.el-collapse-item__header {
				font-weight: bold;
				font-size: 300px;
			}
		}
	}
}
</style>
