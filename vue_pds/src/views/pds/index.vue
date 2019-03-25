<template lang="pug">
  #pdsWrapper
    .pdsTopWrapper
      Header(:styles="headerStyles")
      .sliderWrapper
        Slide.slideItemWrapper(:list="list" @slideStart="changeTxt")
          template(v-slot:default="slotProps")
            .itemWrapper
              img(src="slotProps.item.src")
              h3 {{slotProps.item.title}}
              span.tip ({{slotProps.item.tip}})
              span.question {{slotProps.item.question}}
    .pdsBottomWrapper
      p {{info.defition}}
      ul
        li(v-for="item in info.ps") {{item}}
      button 备份
</template>

<script>
import Header from 'components/header'
import Slide from 'components/slide'
export default {
  data () {
    return {
      list: [
        {
          src: '',
          title: '普通存储',
          tip: '无需硬件设备',
          info: {
            defition:
              '助记词可用于恢复、导入钱包或重置钱包的密码，将它准确的抄写到纸上，并存放在只有你知道的安全的地方。',
            ps: [
              '· 请注册普通钱包用户自行保存助记词',
              '· 泄露或遗忘助记词等同于放弃钱包资产'
            ]
          }
        },
        {
          src: '',
          title: 'PDS存储',
          tip: '已有PDS设备',
          question: '什么是pds设备?',
          info: {
            defition:
              'PDS作为CIRCA可信的加密助记词设备，可将助记词导入您的设备中，加以存储，PDS可在您恢复、导入钱包或重置钱包密码时与NFC呼应自动解锁助记词，亦可通过NFC唤醒钱包。',
            ps: ['· PDS设备需谨慎保存，一旦遗失概不负责']
          }
        }
      ],
      info: {},
      headerStyles: {
        backgroundColor: '#29305c',
        color: '#f1f2f6'
      }
    }
  },
  created () {
    this.info = this.list[0].info
  },
  methods: {
    changeTxt (index) {
      this.info = this.list[index].info
    }
  },
  components: {
    Slide,
    Header
  }
}
</script>

<style lang='scss' scoped>
@import "../../assets/styles/global";
#pdsWrapper {
  position: relative;
  height: 100%;
  .pdsTopWrapper {
    background: #29305c;
    height: px2rem(340);
    .slideItemWrapper {
      width: px2rem(328);
      height: px2rem(382);
      background: #fff;
      border-radius: px2rem(10);
      margin: px2rem(20) auto 0;
      text-align: center;
      box-shadow: px2rem(3) px2rem(3) px2rem(2) px2rem(3) #69686834;
      .itemWrapper {
        margin-top: px2rem(51);
        img {
          width: px2rem(130);
          height: px2rem(124);
          background: greenyellow;
        }
        h3 {
          font-size: px2rem(22);
          line-height: px2rem(54);
          font-weight: bold;
          color: #000;
        }
        span.tip {
          font-size: px2rem(18);
          line-height: 1;
          color: #8b8b8b;
          display: block;
        }
        span.question {
          font-size: px2rem(14);
          line-height: px2rem(70);
          color: #8b8b8b;
          display: block;
        }
      }
    }
  }
  .pdsBottomWrapper {
    line-height: px2rem(20);
    margin-top: px2rem(120);
    padding: px2rem(20);
    p {
      font-size: px2rem(12);
      font-weight: bold;
      line-height: px2rem(20);
    }
    li {
      font-size: px2rem(12);
      line-height: px2rem(20);
      font-weight: bold;
    }
    button {
      position: absolute;
      bottom: px2rem(15);
      width: 90%;
      background-color: #29305c;
      color: #fff;
      font-size: px2rem(20);
      line-height: px2rem(20);
      padding: px2rem(16) 0;
      border-radius: px2rem(10);
      margin: 0 auto;
    }
  }
}
</style>
