<template lang="pug">
transition(name="slide-up")
  .setting-wrapper(v-show="ifTitleAndMenuShow&&ifSettingFontShow===2")
    .setting-progress
      .read-time-wrapper
        span.read-time-text {{getReadTimeText()}}
        span.icon-forward
      .progress-wrapper
        .progress-icon-wrapper(@click="prevSection()")
          span.icon-back
        input.progress(type="range" max="100" min="0" step="1" :value="progress" ref="progress"  :disable="!bookAvailable" @input="onProgressInput($event.target.value)" @change="onProgressChange($event.target.value)")
        .progress-icon-wrapper(@click="nextSection()")
          span.icon-forward
      .text-wrapper
        span.progress-section-text {{getSectionName}}
        span.progress-text ({{bookAvailable ? progress + '%' : $t('book.loading')}})
</template>

<script>
import { ebookMixin } from '@/utils/mixin'
import { getReadTime } from '@/utils/localStorage'
export default {
  mixins: [ebookMixin],
  computed: {
    getSectionName () {
      if (this.section) {
        const sectionInfo = this.currentBook.section(this.section)

        if (sectionInfo && sectionInfo.href) {
          return this.currentBook.navigation.get(sectionInfo.href).label
        }
      }
      return ''
    }
  },
  methods: {
    getReadTimeText () {
      return this.$t('book.haveRead').replace('$1', this.getReadTimeByMinute())
    },
    getReadTimeByMinute () {
      const readTime = getReadTime(this.fileName)
      if (!readTime) {
        return 0
      } else {
        return Math.ceil(readTime / 60)
      }
    },
    prevSection () {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    nextSection () {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    displaySection () {
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href)
      }
    },
    onProgressInput (progress) {
      this.setProgress(progress)
      this.updateProgressBg()
    },
    onProgressChange (progress) {
      this.setProgress(progress).then(() => {
        this.disPlayProgress()
        this.updateProgressBg()
      })
    },
    disPlayProgress () {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      this.display(cfi)
    },
    updateProgressBg () {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    updated () {
      this.updateProgressBg()
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
  .setting-progress {
    position: relative;
    width: 100%;
    height: 100%;
    .read-time-wrapper {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: px2rem(40);
      @include center;
      font-size: px2rem(12);
    }
    .progress-wrapper {
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      .progress {
        flex: 1;
        width: 100%;
        -webkit-appearance: none;
        height: px2rem(2);
        background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
        background-size: 0 100%;
        margin: 0 px2rem(10);
        &:focus {
          outline: none;
        }
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #ceced0;
          box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, 0.15);
          border: none;
        }
      }
      .progress-icon-wrapper {
        flex: 0 0 px2rem(22);
        font-size: px2rem(22);
        @include center;
      }
    }
    .text-wrapper {
      position: absolute;
      left: 0;
      bottom: px2rem(5);
      width: 100%;
      font-size: px2rem(12);
      text-align: center;
      padding: 0 px2rem(15);
      box-sizing: border-box;
      @include center;
      .progress-section-text {
        line-height: px2rem(15);
        @include ellipsis;
      }
      .progress-text {
      }
    }
  }
}
</style>
