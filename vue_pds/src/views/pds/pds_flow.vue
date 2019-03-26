<template lang="pug">
  .backupFlowWrapper
    Prompt(txt="PDS检测中..." imgUrl="" v-if="false")
    Header(title="备份PDS钱包" :styles="headerStyles" @handleBack="back")
    .tipWrapper
      h3 使用PDS备份
      ul
        li · 每一枚PDS硬币只能存持一个钱包，如果再次强行导入将覆盖之前的钱包
        li · 请将崭新的PDS贴近NFC设备
        li · 备份时请勿将PDS硬件离开NFC处
    .nfcWrapper
      img(src='')
    button 开始检测
</template>

<script>
import Header from 'components/header'
import Prompt from 'components/prompt'
export default {
  data () {
    return {
      headerStyles: {
        backgroundColor: '#fff'
      }
    }
  },
  methods: {
    back () {
      this.$router.go(-1)
    }
  },
  components: {
    Header,
    Prompt
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/styles/global';
.backupFlowWrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 101;
  background: #fff;
  .tipWrapper {
    margin-left: px2rem(12);
    h3 {
      font-size: px2rem(12);
      line-height: px2rem(40);
      font-weight: bold;
    }
    li {
      font-size: px2rem(11);
      line-height: px2rem(20);
      font-weight: bold;
    }
  }
  .nfcWrapper {
    text-align: center;
    img {
      width: px2rem(300);
      height: px2rem(300);
      background: gold;
      margin-top: px2rem(120);
    }
  }
  button {
    position: fixed;
    left: 50%;
    bottom: px2rem(15);
    transform: translateX(-50%);
    width: 90%;
    background-color: #29305c;
    color: #fff;
    font-size: px2rem(20);
    line-height: px2rem(20);
    padding: px2rem(16) 0;
    border-radius: px2rem(10);
  }
}
</style>
