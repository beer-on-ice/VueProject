<template>
  <div class="progress-circle">
    <svg :width="radius" :height="radius" viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <circle class="progress-background" r="50" cx="50" cy="50" fill="transparent"/>
      <circle class="progress-bar" r="50" cx="50" cy="50" fill="transparent" :stroke-dasharray='dashArray' :stroke-dashoffset='dashOffset'/>
    </svg>
    <slot></slot>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          radius: {
              type: Number,
              default: 100
          },
          percent: {
              type:Number,
              default: 0
          }
      },
      data() {
          return {
              //stroke-dasharray 绘制虚线: 一个参数时： 表示一段虚线长度和每段虚线之间的间距 ,两个参数或者多个参数时：一个表示长度，一个表示间距
              dashArray: Math.PI * 100
          }
      },
      computed: {
          dashOffset() {
              return (1-this.percent) * this.dashArray
          }
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"

  .progress-circle
    position: relative
    circle
      stroke-width: 8px
      transform-origin: center
      &.progress-background
        transform: scale(0.9)
        stroke: $color-mini-self
      &.progress-bar
        transform: scale(0.9) rotate(-90deg)
        stroke: $color-mini-color
</style>
