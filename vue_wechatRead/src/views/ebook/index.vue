<template lang="pug">
  .ebook
    ebook-title
    ebook-reader
    ebook-menu
</template>

<script>
import EbookReader from '@/components/ebook/EbookReader.vue'
import EbookMenu from '@/components/ebook/EbookMenu.vue'
import EbookTitle from '@/components/ebook/EbookTitle.vue'
import { getReadTime, saveReadTime } from '@/utils/localStorage'
import { ebookMixin } from '@/utils/mixin'
export default {
  mixins: [ebookMixin],
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  },
  mounted () {
    this.startLoopReadTime()
  },
  beforeDestroy () {
    if (this.task) {
      clearInterval(this.task)
    }
  },
  methods: {
    startLoopReadTime () {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }

      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
