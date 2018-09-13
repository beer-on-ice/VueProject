<template lang="pug">
  .m-header
    .icon
    .text 雲遊四海
    router-link.mine(tag="div" to="/user")
      i.icon-mine
</template>

<script>
export default {}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.m-header
  position relative
  height 44px
  color $color-theme-self
  background $color-background-self
  text-align center
  .icon
    display inline-block
    vertical-align top
    width 30px
    height 32px
    margin 6px 10px 0
    bg-image('logo')
    background-size 30px 32px
  .text
    display inline-block
    vertical-align top
    line-height 44px
    font-size $font-size-large
    font-family 'KaiTi'
  .mine
    position absolute
    top 0
    right 0
    .icon-mine
      display block
      padding 12px
      font-size 20px
      color $color-self
</style>
