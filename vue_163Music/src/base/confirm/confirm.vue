<template lang="pug">
transition(name="confirm-fade")
  .confirm(v-show='showFlag' @click.stop)
    .confirm-wrapper
      .confirm-content
        p.text {{text}}
        .operate
          .operate-btn(@click='cancel') {{cancelBtnText}}
          .operate-btn.left(@click='confirm') {{confirmBtnText}}
</template>

<script>
export default {
  data () {
    return {
      showFlag: false
    }
  },
  props: {
    text: {
      type: String,
      default: ''
    },
    confirmBtnText: {
      type: String,
      default: '确定'
    },
    cancelBtnText: {
      type: String,
      default: '取消'
    }
  },
  methods: {
    show () {
      this.showFlag = true
    },
    hide () {
      this.showFlag = false
    },
    cancel () {
      this.hide()
      this.$emit('cancel')
    },
    confirm () {
      this.hide()
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.confirm
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 998
  background-color $color-background-d
  &.confirm-fade-enter-active
    animation confirm-fadein 0.3s
    .confirm-content
      animation confirm-zoom 0.3s
  .confirm-wrapper
    position absolute
    top 50%
    left 50%
    transform translate(-50%, -50%)
    z-index 999
    .confirm-content
      width 270px
      border-radius 13px
      background $color-highlight-background
      .text
        padding 19px 15px
        line-height 22px
        text-align center
        font-size $font-size-large
        color $color-text-l
      .operate
        display flex
        align-items center
        text-align center
        font-size $font-size-large
        .operate-btn
          flex 1
          line-height 22px
          padding 10px 0
          border-top 1px solid $color-background-d
          color $color-text-d
          &.left
            border-right 1px solid $color-background-d
@keyframes confirm-fadein
  0%
    opacity 0
  100%
    opacity 1
@keyframes confirm-zoom
  0%
    transform scale(0)
  50%
    transform scale(1.1)
  100%
    transform scale(1)
</style>
