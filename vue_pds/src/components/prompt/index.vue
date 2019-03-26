<template lang="pug">
  #promptWrapper
    .infoWrapper
      img(src="imgUrl")
      .txt {{txt}}
      .backWrapper
        button(v-if="true") 立即备份
</template>

<script>
export default {
  props: {
    txt: String,
    imgUrl: String
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/global';

#promptWrapper {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 999;
  background: rgba(0, 0, 0, 0.7);
  .infoWrapper {
    width: px2rem(330);
    height: px2rem(234);
    border-radius: px2rem(10);
    background: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    img {
      width: px2rem(80);
      height: px2rem(80);
      background: red;
      margin-top: px2rem(40);
    }
    .txt {
      font-size: px2rem(18);
      margin-top: px2rem(20);
    }
    button {
      font-size: px2rem(18);
      line-height: px2rem(20);
      color: #fff;
      background-color: #6187c6;
      border-radius: px2rem(10);
      padding: px2rem(10) 0;
      width: 90%;
    }
  }
}
</style>
