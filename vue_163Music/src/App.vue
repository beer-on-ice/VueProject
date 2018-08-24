<template lang='pug'>
  #app
    m-header
    tab-bar
    keep-alive
      router-view
    player
</template>
<script>
import MHeader from 'components/m-header/m-header'
import TabBar from 'components/tab/tab'
import Player from 'components/player/player'

export default {
  components: {
    MHeader,
    TabBar,
    Player
  }
}
</script>
<style lang="stylus" scoped>
</style>
