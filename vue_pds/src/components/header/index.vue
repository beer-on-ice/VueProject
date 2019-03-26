<template lang="pug">
  .headerWrapper(:style='styles')
    .backBtnWrapper(@click="handleBack")
      i.iconfont &#xe615;
    .titleWrapper(v-if='title!==""')
      h2 {{title}}
</template>

<script>
export default {
  props: {
    title: String,
    styles: Object
  },
  methods: {
    handleBack () {
      this.$emit('handleBack')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/global';
.headerWrapper {
  width: 100%;
  height: px2rem(42.24);
  background: white;
  text-align: center;
  position: relative;
  .backBtnWrapper {
    width: px2rem(58.88);
    height: px2rem(42.24);
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .titleWrapper {
    h2 {
      font-size: px2rem(16);
      line-height: px2rem(42.24);
      font-weight: bold;
    }
  }
}
</style>
