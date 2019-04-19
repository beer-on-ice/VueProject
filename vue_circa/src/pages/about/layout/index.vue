<template lang="pug">
el-container
  el-header(height="57px")
    Header
  el-main
    transition(name="fade" mode="out-in")
      router-view(keep-alive)
  el-footer
    Footer
</template>

<script>
import Header from 'components/Header'
import Footer from 'components/Footer'
export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss" scoped>
.el-main {
	max-width: 1440px;
		margin: 0 auto;
		overflow: hidden;
}
</style>
