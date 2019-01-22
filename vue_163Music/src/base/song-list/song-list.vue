<template lang="pug">
  .song-list
    ul
      li.item(v-for="(song,index) in songs" @click="selectItem(song,index)")
        .rank(v-show="rank")
          span(:class="getRankCls(index)") {{getRankText(index)}}
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
    },
    rank: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    getDesc (song) {
      return `${song.singer} · ${song.alname}`
    },
    selectItem (item, index) {
      this.$emit('select', item, index)
    },
    getRankCls (index) {
      if (index <= 2) {
        return `icon icon${index}`
      } else {
        return `text`
      }
    },
    getRankText (index) {
      if (index > 2) {
        return index + 1
      }
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
    .rank
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
