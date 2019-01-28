import {
  mapGetters,
  mapActions
} from 'vuex'
export const ebookMixin = {
  computed: {
    ...mapGetters({
      fileName: 'book/fileName',
      ifTitleAndMenuShow: 'book/ifTitleAndMenuShow',
      ifSettingShow: 'book/ifSettingShow'
    })
  },
  methods: {
    ...mapActions({
      setFileName: 'book/setFileName',
      setIfTitleAndMenuShow: 'book/setIfTitleAndMenuShow',
      setIfSettingShow: 'book/setIfSettingShow'
    })
  }
}
