<template lang="pug">
  .swiper-container
    ul.swiper-wrapper
      li.swiper-slide(v-for="item in list")
        slot(:item="item")
    .swiper-pagination.dotWrapper
</template>

<script>
import Swiper from 'swiper'
export default {
  props: {
    list: Array
  },
  mounted () {
    let _this = this
    new Swiper('.swiper-container', {
      pagination: {
        el: '.swiper-pagination'
      },
      on: {
        slideChangeTransitionStart () {
          _this.$emit('slideStart', this.activeIndex)
        }
      }
    })
  }
}
</script>

<style lang="scss" scoped></style>
