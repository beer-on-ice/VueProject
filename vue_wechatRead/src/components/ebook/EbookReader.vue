<template lang="pug">
  .ebook-reader
    #reader
</template>
<script>
import { ebookMixin } from '@/utils/mixin'
import Epub from 'epubjs'
import { setTimeout } from 'timers'
global.ePub = Epub

export default {
  mixins: [ebookMixin],
  mounted () {
    this.setFileName(this.$route.params.fileName).then(() => { this.initEpub() })
  },
  methods: {
    initEpub () {
      const url = `http://192.168.0.61:8081/resources/${this.fileName}.epub`
      this.book = new Epub(url)

      this.setCurrentBook(this.book)

      this.rendition = this.book.renderTo('reader', {
        width: innerWidth,
        height: innerHeight,
        methods: 'default'
      })
      this.rendition.display()
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
      }
      this.setIfTitleAndMenuShow(!this.ifTitleAndMenuShow)
    },
    hideTitleAndMenu () {
      this.setIfTitleAndMenuShow(false)
      this.setIfSettingShow(-1)
    }
  }
}
</script>

<style lang="scss" scoped></style>
