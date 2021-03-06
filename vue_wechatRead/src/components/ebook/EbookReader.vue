<template lang="pug">
  .ebook-reader
    #reader
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
import { getFontFamily, saveFontFamily, saveFontSize, getFontSize, saveTheme, getTheme, getLocation } from '@/utils/localStorage'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  mounted () {
    this.setFileName(this.$route.params.fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    // 初始化文字大小
    initFontSize () {
      let fontSize = getFontSize(this.fileName)
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontSize)
      } else {
        this.rendition.themes.fontSize(fontSize)
        this.setDefaultFontSize(fontSize)
      }
    },
    // 初始化字体
    initFontFamily () {
      let font = getFontFamily(this.fileName)
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFamily)
      } else {
        this.rendition.themes.font(font)
        this.setDefaultFontFamily(font)
      }
    },
    // 初始化主题
    initTheme () {
      let defaultTheme = getTheme(this.fileName)
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name
        saveTheme(this.fileName, defaultTheme)
      }
      this.setDefaultTheme(defaultTheme)
      this.themeList.forEach(item => {
        this.rendition.themes.register(item.name, item.style)
      })
      this.rendition.themes.select(defaultTheme)
    },
    // 初始化渲染展示
    initRendition () {
      this.rendition = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      // 获取存储位置
      const location = getLocation(this.fileName)
      this.display(location, () => {
        this.initFontSize()
        this.initFontFamily()
        this.initTheme()
        this.initGlobalStyle()
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
    // 初始化手势操作
    initGesture () {
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
    },
    // 初始化电子书
    initEpub () {
      const url = `${process.env.VUE_APP_RES_URL}/resources/${this.fileName}.epub`
      this.book = new Epub(url)

      this.setCurrentBook(this.book)
      this.initRendition()
      this.initGesture()
      // 分页
      this.book.ready.then(() => {
        return this.book.locations.generate(750 * (window.innerWidth / 375) * (getFontSize(this.fileName) / 16))
      }).then(locations => {
        this.setBookAvailable(true)
        this.refreshLocation()
      })
    },
    // 上一页
    prevPage () {
      if (this.rendition) {
        this.rendition.prev().then(() => {
          this.refreshLocation()
        })
        this.hideTitleAndMenu()
      }
    },
    // 下一页
    nextPage () {
      if (this.rendition) {
        this.rendition.next().then(() => {
          this.refreshLocation()
        })
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
