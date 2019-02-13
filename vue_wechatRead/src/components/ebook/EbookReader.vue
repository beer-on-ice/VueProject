<template lang="pug">
  .ebook-reader
    #reader
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
import { getFontFamily, saveFontFamily, saveFontSize, getFontSize } from '@/utils/localStorage'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  mounted () {
    this.setFileName(this.$route.params.fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    initEpub () {
      const url = `http://localhost:8081/resources/${this.fileName}.epub`
      this.book = new Epub(url)

      this.setCurrentBook(this.book)

      this.rendition = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      this.rendition.display().then(() => {
        this.initFontSize()
        this.initFontFamily()
      })
      this.rendition.on('touchstart', event => {
        this.touchStartX = event.changedTouches[0].clientX
        this.touchStartTime = event.timeStamp
      })
      this.rendition.on('touchend', event => {
        const offsetX = event.changedTouches[0].clientX - this.touchStartX
        const time = event.timeStamp - this.touchStartTime
        if (time < 500 && offsetX > 40) {
          this.prevPage()
        } else if (time < 500 && offsetX < -40) {
          this.nextPage()
        } else {
          this.toggleTitleAndMenu()
        }
        event.stopPropagation()
        event.preventDefault()
      })
      this.rendition.hooks.content.register(contents => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resources/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resources/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resources/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resources/fonts/tangerine.css`
          )
        ]).then(() => {
          console.log('字体加载完毕')
        })
      })
    },
    prevPage () {
      if (this.rendition) {
        this.rendition.prev()
        this.hideTitleAndMenu()
      }
    },
    nextPage () {
      if (this.rendition) {
        this.rendition.next()
        this.hideTitleAndMenu()
      }
    },
    toggleTitleAndMenu () {
      if (this.setIfTitleAndMenuShow) {
        this.setIfSettingShow(-1)
        this.setFontFamilyVisible(false)
      }
      this.setIfTitleAndMenuShow(!this.ifTitleAndMenuShow)
    },
    hideTitleAndMenu () {
      this.setIfTitleAndMenuShow(false)
      this.setFontFamilyVisible(false)
      this.setIfSettingShow(-1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
