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
export default {
  components: {
    EbookReader,
    EbookTitle,
    EbookMenu
  }
}
</script>

<style lang="scss" scoped>
@import "../../assets/styles/global.scss";
</style>
