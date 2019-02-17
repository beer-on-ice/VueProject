<template lang="pug">
  .ebook-menu
    transition(name="slide-up")
      .menu-wrapper(v-show="ifTitleAndMenuShow" :class="{'hide-box-shadow': !ifTitleAndMenuShow||ifSettingFontShow>=0}")
        .icon-wrapper
          span.icon-menu(@click="showSetting(3)")
        .icon-wrapper
          span.icon-progress(@click="showSetting(2)")
        .icon-wrapper
          span.icon-bright(@click="showSetting(1)")
        .icon-wrapper
          span.icon-A(@click="showSetting(0)")
    ebook-setting-font
    ebook-setting-font-pop-up
    ebook-setting-theme
    ebook-setting-progress
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import EbookSettingFont from './EbookSettingFont'
import EbookSettingFontPopUp from './EbookSettingFontPopUp'
import EbookSettingTheme from './EbookSettingTheme'
import EbookSettingProgress from './EbookSettingProgress'

export default {
  mixins: [ebookMixin],
  components: {
    EbookSettingFont,
    EbookSettingFontPopUp,
    EbookSettingTheme,
    EbookSettingProgress
  },
  methods: {
    showSetting (key) {
      this.setIfSettingShow(key)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.menu-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 102;
  display: flex;
  width: 100%;
  height: px2rem(48);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  font-size: px2rem(20);
  background: #fff;
  &.hide-box-shadow {
    box-shadow: none;
  }
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon-progress {
      font-size: px2rem(28);
    }
    .icon-bright {
      font-size: px2rem(24);
    }
  }
}
</style>
