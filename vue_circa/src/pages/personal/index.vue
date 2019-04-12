<template lang="pug">
.personalWrapper
  .sectionOneWrapper
    el-row
      el-col(
        :xs="24"
        :sm="24"
        :md="{span: 18}"
        :lg="{span: 18}"
        :xl="{span: 18}"
      )
        .left
          h2 Do <em>more</em> with your Bitcoin
          p Manage and spend your Bitcoin with the BitPay wallet, and turn Bitcoin into dollars with BitPay's prepaid Visa® card.
          div
            el-button(plain) Order CyberPay Card
            el-button(plain) Get CyberPay Wallet
      .right
        .img
    .sectionTwoWrapper
      .left
      .right
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.personalWrapper {
	h2 {
		font-size: 100px;
		em {
			color: #214497;
		}
	}
}
</style>
