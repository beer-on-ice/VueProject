<template lang='pug'>
  #app
    m-header
    tab-bar
    keep-alive
      router-view
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
