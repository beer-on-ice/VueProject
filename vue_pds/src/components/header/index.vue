<template lang="pug">
  .headerWrapper
    .backBtnWrapper
      i.iconfont &#xe615;
    .titleWrapper
      h2 {{title}}
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
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
