<template lang="pug">
  .song-list
    ul
      li.item(v-for="song in songs")
        .content
          .name {{song.name}}
          p.desc {{getDesc(song)}}
</template>

<script>
export default {
  props: {
    songs: {
      type: Array,
      default: new Array()
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer} · ${song.alname}`
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.song-list
  .item
    display flex
    align-items center
    box-sizing border-box
    height 64px
    font-size $font-size-medium
    .newRank
      flex 0 0 25px
      width 25px
      margin-right 30px
      text-align center
      .icon
        display inline-block
        width 25px
        height 24px
        background-size 25px 24px
        &.icon0
          bg-image('first')
        &.icon1
          bg-image('second')
        &.icon2
          bg-image('third')
      .text
        color $color-self-h
        font-size $font-size-large
    .content
      flex 1
      line-height 20px
      overflow hidden
      .name
        no-wrap()
        color $color-text
      .desc
        no-wrap()
        margin-top 4px
        color $color-text-d
</style>
