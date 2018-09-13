<template lang="pug">
ul.switches
  li.switch-item(v-for="(item,index) in switches" :class="{'active': currentIndex===index}" @click="switchIndex(index)")
    span {{item.name}}
</template>

<script>
export default {
  props: {
    switches: {
      type: Array,
      default: new Array()
    },
    currentIndex: {
      type: Number,
      default: 0
    }
  },
  methods: {
    switchIndex (index) {
      this.$emit('switchItem', index)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.switches
  display flex
  align-items center
  width 240px
  margin 0 auto
  border 1px solid $color-highlight-background
  border-radius 5px
  .switch-item
    flex 1
    padding 8px
    text-align center
    font-size $font-size-medium
    color $color-text-d
    &.active
      background $color-highlight-background
      color $color-text
</style>
