<template lang="pug">
  transition(name="slide-up")
    .setting-wrapper(v-show="ifTitleAndMenuShow&&ifSettingFontShow===1")
      .setting-theme
        .setting-theme-item(v-for="(item,index) in themeList" :key="index" @click="setTheme(index)")
          .preview(:class="{'selected': item.name === defaultTheme}" :style="{background:  item.style.body.background}")
          .text(:class="{'selected': item.name === defaultTheme}") {{item.alias}}
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import { saveTheme } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  methods: {
    setTheme (index) {
      const theme = this.themeList[index]
      saveTheme(this.fileName, theme.name)
      this.setDefaultTheme(theme.name).then(() => {
        this.currentBook.rendition.themes.select(this.defaultTheme)
        this.initGlobalStyle()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global";
.setting-wrapper {
  position: absolute;
  bottom: px2rem(48);
  left: 0;
  z-index: 190;
  width: 100%;
  height: px2rem(90);
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  background: #fff;
  .setting-theme {
    height: 100%;
    display: flex;
    .setting-theme-item {
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: px2rem(5);
      box-sizing: border-box;
      .preview {
        flex: 1;
        border: px2rem(1) solid #ccc;
        box-sizing: border-box;
        border: none;
        &.selected {
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.1);
          border: px2rem(2) solid #5e6369;
        }
      }
      .text {
        flex: 0 0 px2rem(20);
        font-size: px2rem(14);
        @include center;
      }
    }
  }
}
</style>
