import {
  mapGetters,
  mapActions
} from 'vuex'
export const ebookMixin = {
  computed: {
    ...mapGetters({
      fileName: 'book/fileName',
      ifTitleAndMenuShow: 'book/ifTitleAndMenuShow',
      ifSettingShow: 'book/ifSettingShow',
      defaultFontSize: 'book/defaultFontSize',
      defaultFontFamily: 'book/defaultFontFamily',
      fontFamilyVisible: 'book/fontFamilyVisible',
      defaultTheme: 'book/defaultTheme',
      currentBook: 'book/currentBook'
    })
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
      setCurrentBook: 'book/setCurrentBook'
    })
  }
}
