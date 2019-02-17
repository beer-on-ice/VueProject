import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  themeList,
  addCss,
  removeAllCss
} from './book'
import {
  saveLocation
} from './localStorage'

export const ebookMixin = {
  computed: {
    ...mapGetters({
      fileName: 'book/fileName',
      ifTitleAndMenuShow: 'book/ifTitleAndMenuShow',
      ifSettingFontShow: 'book/ifSettingFontShow',
      defaultFontSize: 'book/defaultFontSize',
      defaultFontFamily: 'book/defaultFontFamily',
      fontFamilyVisible: 'book/fontFamilyVisible',
      defaultTheme: 'book/defaultTheme',
      currentBook: 'book/currentBook',
      progress: 'book/progress',
      bookAvailable: 'book/bookAvailable',
      section: 'book/section'
    }),
    themeList () {
      return themeList(this)
    }
  },
  methods: {
    ...mapActions({
      setFileName: 'book/setFileName',
      setIfTitleAndMenuShow: 'book/setIfTitleAndMenuShow',
      setIfSettingShow: 'book/setIfSettingShow',
      setDefaultFontSize: 'book/setDefaultFontSize',
      setDefaultFontFamily: 'book/setDefaultFontFamily',
      setFontFamilyVisible: 'book/setFontFamilyVisible',
      setDefaultTheme: 'book/setDefaultTheme',
      setCurrentBook: 'book/setCurrentBook',
      setProgress: 'book/setProgress',
      setBookAvailable: 'book/setBookAvailable',
      setSection: 'book/setSection'
    }),
    initGlobalStyle () {
      removeAllCss()
      switch (this.defaultTheme) {
        case 'Default':
          addCss(`${process.env.VUE_APP_RES_URL}/resources/theme/theme_default.css`)
          break
        case 'Eye':
          addCss(`${process.env.VUE_APP_RES_URL}/resources/theme/theme_eye.css`)
          break
        case 'Gold':
          addCss(`${process.env.VUE_APP_RES_URL}/resources/theme/theme_gold.css`)
          break
        case 'Night':
          addCss(`${process.env.VUE_APP_RES_URL}/resources/theme/theme_night.css`)
      }
    },
    refreshLocation () {
      const currentLocation = this.currentBook.rendition.currentLocation()
      const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
      this.setProgress(Math.floor(progress * 100))
      this.setSection()
      saveLocation(this.fileName, startCfi)
    },
    display (target, cb) {
      if (target) {
        this.currentBook.rendition.display(target).then(() => {
          this.refreshLocation()
          cb && cb()
        })
      } else {
        this.rendition.display().then(() => {
          this.refreshLocation()
          cb && cb()
        })
      }
    }
  }
}
