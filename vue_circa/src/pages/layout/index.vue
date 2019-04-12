<template lang="pug">
el-container
  el-header
    Header
  el-main
    transition(name="fade" mode="out-in")
      router-view
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
	margin: 30px auto 0;
	overflow: hidden;
}
</style>
