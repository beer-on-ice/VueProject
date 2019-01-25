<template lang="pug">
  .ebook-reader
    #reader
</template>
<script>
import Epub from 'epubjs'
import { mapGetters, mapActions } from 'vuex'
global.ePub = Epub

export default {
  computed: {
    ...mapGetters({
      fileName: 'book/fileName'
    })
  },
  mounted () {
    this.setFileName(this.$route.params.fileName).then(() => {
      this.initEpub()
    })
  },
  methods: {
    ...mapActions({
      setFileName: 'book/setFileName'
    }),
    initEpub () {
      const url = `http://192.168.0.61:8081/resources/${this.fileName}.epub`
      this.book = new Epub(url)
      this.rendition = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      this.rendition.display()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
