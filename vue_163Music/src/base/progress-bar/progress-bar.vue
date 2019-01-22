<template lang="pug">
.progress-bar(ref="progressBar" @click="progressClick")
  .bar-inner
    .progress(ref="progress")
    .progress-btn-wrapper(ref="progressBtn" @touchstart.prevent="progressTouchStart" @touchmove.prevent="progressTouchMove" @touchend="progressTouchEnd")
      .progress-btn
</template>

<script>
import {prefixStyle} from 'assets/js/dom'
const ProgressBtnWidth = 16
const transform = prefixStyle('transform')
export default {
  props: {
    percent: {
      type: Number,
      default: 0
    }
  },
  created () {
    this.touch = {}
  },
  methods: {
    // 进度条点击跳转
    progressClick (e) {
      const rect = this.$refs.progressBar.getBoundingClientRect()
      const offsetWidth = e.pageX - rect.left
      this._offset(offsetWidth)
      this._triggerPercent()
    },
    // 进度条拖拽开始
    progressTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.left = this.$refs.progress.clientWidth // 进步条已经走了多少
    },
    // 进度条拖拽
    progressTouchMove (e) {
      if (!this.touch.initiated) return
      const deltaX = e.touches[0].pageX - this.touch.startX
      // 最多为进度条宽度
      const offsetWidth = Math.min(this.$refs.progressBar.clientWidth, Math.max(0, this.touch.left + deltaX))
      this._offset(offsetWidth)
    },
    // 进度条拖拽结束
    progressTouchEnd (e) {
      this.touch.initiated = false
      this._triggerPercent()
    },
    // 通信-进度条进度
    _triggerPercent () {
      const barWidth = this.$refs.progressBar.clientWidth - ProgressBtnWidth
      const percent = this.$refs.progress.clientWidth / barWidth
      this.$emit('percentChange', percent)
    },
    // 改变位置
    _offset (offsetWidth) {
      this.$refs.progress.style.width = `${offsetWidth}px`
      this.$refs.progressBtn.style[transform] = `translate3d(${offsetWidth}px,0,0)`
    }
  },
  watch: {
    percent (newPer) {
      if (newPer >= 0 && !this.touch.initiated) {
        const barWidth = this.$refs.progressBar.clientWidth - ProgressBtnWidth
        const offsetWidth = newPer * barWidth
        this._offset(offsetWidth)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.progress-bar
  height 30px
  .bar-inner
    position relative
    top 13px
    height 4px
    background rgba(0, 0, 0, 0.3)
    .progress
      position absolute
      height 100%
      background $color-theme-self
    .progress-btn-wrapper
      position absolute
      left -8px
      top -13px
      width 30px
      height 30px
      .progress-btn
        position relative
        top 7px
        left 7px
        box-sizing border-box
        width 16px
        height 16px
        border 3px solid $color-text
        border-radius 50%
        background $color-self-h
</style>
