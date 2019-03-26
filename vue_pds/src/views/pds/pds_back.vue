<template lang="pug">
  transition(name="slide")
    .backupWrapper
      Header(title="备份你的数字身份" :styles="headerStyles" @handleBack="back")
      .tipWrapper
        h3 请抄下您的身份助记词
        ul
          li · 我知道如果忘记密码并且未备份钱包助记词
          li · 我牢记钱包密码并将安全备份下方的钱包
          li · 我明白泄露钱包助记词等同于完全放弃钱
      .remberWordWrapper
        .remberWord adasdad asdasdadadadadasdasasdafs vzxcvzxcvzxvzxvasdfasdfaf asfasdfasdf
      .ensureWrapper
        el-radio(v-model="radio" label="") 我已仔细阅读并抄写下助记词
      router-link(tag="button" to="/pds/flow") 备份到pds设备
</template>

<script>
// eslint-disable-next-line
import Header from 'components/header'
export default {
  data () {
    return {
      radio: '0',
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
    Header
  }
}
</script>

<style lang="scss" scoped>
@import '~assets/styles/global';
.backupWrapper {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
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
  .remberWordWrapper {
    margin-top: px2rem(15);
    .remberWord {
      width: 90%;
      border-radius: px2rem(10);
      font-size: px2rem(13);
      border: 1px solid #ccc;
      word-break: break-all;
      padding: px2rem(10);
      margin: 0 auto;
    }
  }
  .ensureWrapper {
    margin-left: px2rem(12);
  }
  button {
    position: fixed;
    width: 90%;
    bottom: px2rem(15);
    left: 50%;
    transform: translateX(-50%);
    background-color: #29305c;
    color: #fff;
    font-size: px2rem(20);
    line-height: px2rem(20);
    padding: px2rem(16) 0;
    border-radius: px2rem(10);
  }
}
</style>
