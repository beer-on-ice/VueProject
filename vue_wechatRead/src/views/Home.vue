<template lang="pug">
  .home
    #read
      span.icon-bookmark
</template>

<script>
import Epub from 'epubjs'
global.epub = Epub

export default {
  name: 'home',
  mounted () {
    // this.book = new Epub('/游戏.epub')
    // console.log(this.book)
    // this.book.renderTo('read', {
    //   width: window.innerWidth,
    //   height: window.innerHeight
    // }).display()
  },
  components: {}
}
</script>

<style  lang="less" scoped>
@sizes: 20px;
@colors: red;
.icon-bookmark {
  font-size: @sizes;
  color: @colors;
}
</style>
