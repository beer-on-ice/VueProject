<template>
  <div id="app">
    <m-header></m-header>
    <tab-bar></tab-bar>
    <router-view></router-view>
  </div>
</template>
<script>
import MHeader from 'components/m-header/m-header'
import TabBar from 'components/tab/tab'

export default {
  components: {
    MHeader,
    TabBar
  }
}
</script>
<style lang="stylus" scoped>
</style>
