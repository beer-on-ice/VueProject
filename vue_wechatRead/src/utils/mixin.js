import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  themeList,
  addCss,
  removeAllCss
} from '@/utils/book'

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
      bookAvailable: 'book/bookAvailable'
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
      setBookAvailable: 'book/setBookAvailable'
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
    }
  }
}
