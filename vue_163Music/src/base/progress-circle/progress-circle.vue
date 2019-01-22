<template lang="pug">
.progress-circle
  svg(:width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg")
    circle.progress-background(r="50",cx="50",cy="50" fill="transparent")
    circle.progress-bar(r="50",cx="50",cy="50" :stroke-dasharray="dashArray" :stroke-dashoffset="dashoffset")
  slot
</template>

<script>
export default {
  props: {
    radius: {
      type: Number,
      default: 100
    },
    percent: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      // 周长
      dashArray: Math.PI * 100
    }
  },
  computed: {
    // 偏移，即进度条
    dashoffset () {
      return (1 - this.percent) * this.dashArray
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.progress-circle
  position relative
  circle
    stroke-width 8px
    transform-origin center
    &.progress-background
      transform scale(0.9)
      stroke $color-mini-self
    &.progress-bar
      transform scale(0.9) rotate(-90deg)
      stroke $color-mini-color
</style>
