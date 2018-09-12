<template lang="pug">
transition(name="list-fade")
  .playlist(v-show="showFlag" @click="hide")
    .list-wrapper(@click.stop)
      .list-header
        h1.title
          i.icon(:class="iconMode" @click="changeMode")
          span.text {{modeText}}
          span.clear(@click="showConfirm")
            i.icon-clear
      scroll.list-content(:data="sequenceList" ref="listContent")
        transition-group(name="list" tag="ul")
          li.item(v-for="(item,index) in sequenceList" @click="selectItem(item,index)" ref="listItem" :key="item.id")
            i.current(:class="getCurrentIcon(item)")
            span.text {{item.name}}
            span.like
              i.icon-not-favorite
            span.delete(@click.stop="deleteOne(item)")
              i.icon-delete
      .list-operate
        .add
          i.icon-add
          span.text 添加歌曲到队列
      .list-close
        span(@click="hide") 关闭
    confirm(text="是否清空播放列表" confirmBtnText="清空" @confirm="confirmClear" ref="confirm")
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playerMixin} from 'assets/js/mixin'
import {playMode} from 'assets/js/config'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
export default{
  mixins: [playerMixin],
  data () {
    return {
      showFlag: false
    }
  },
  computed: {
    modeText () {
      return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
    }
  },
  methods: {
    show () {
      this.showFlag = true
      setTimeout(() => {
        this.$refs.listContent.refresh()
        this.scrollToCurrent(this.currentSong)
      }, 20)
    },
    hide () { this.showFlag = false },
    deleteOne (item) {
      this.deleteSong(item)
      if (!this.playlist.length) this.hide()
    },
    getCurrentIcon (item) {
      if (this.currentSong.id === item.id) {
        return 'icon-play'
      }
      return ''
    },
    selectItem (item, index) {
      if (this.mode === playMode.random) {
        index = this.playlist.findIndex((song) => {
          return song.id === item.id
        })
      }
      this.setCurrentIndex(index)
      this.setPlayingState(true)
    },
    scrollToCurrent (current) {
      const index = this.sequenceList.findIndex((song) => {
        return current.id === song.id
      })
      this.$refs.listContent.scrollToElement(this.$refs.listItem[index], 300)
    },
    showConfirm () {
      this.$refs.confirm.show()
    },
    confirmClear () {
      this.clearSongList()
      this.$refs.confirm.hide()
    },
    ...mapActions([
      'deleteSong',
      'clearSongList'
    ])
  },
  watch: {
    currentSong (newSong, oldSong) {
      if (!this.showFlag || newSong.id === oldSong.id) return
      this.scrollToCurrent(newSong)
    }
  },
  components: {
    Scroll,
    Confirm
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.playlist
  position fixed
  left 0
  right 0
  top 0
  bottom 0
  z-index 200
  background-color $color-background-d
  &.list-fade-enter-active, &.list-fade-leave-active
    transition opacity 0.3s
    .list-wrapper
      transition all 0.3s
  &.list-fade-enter, &.list-fade-leave-to
    opacity 0
    .list-wrapper
      transform translate3d(0, 100%, 0)
  &.list-fade-enter, .list-wrapper
    position absolute
    left 0
    bottom 0
    width 100%
    background-color $color-highlight-background
    .list-header
      position relative
      padding 20px 30px 10px 20px
      .title
        display flex
        align-items center
        .icon
          margin-right 10px
          font-size 30px
          color $color-theme-d
        .text
          flex 1
          font-size $font-size-medium
          color $color-text-l
        .clear
          extend-click()
          .icon-clear
            font-size $font-size-medium
            color $color-text-d
    .list-content
      max-height 240px
      overflow hidden
      .item
        display flex
        align-items center
        height 40px
        padding 0 30px 0 20px
        overflow hidden
        &.list-enter-active, &.list-leave-active
          transition all 0.1s
        &.list-enter, &.list-leave-to
          height 0
        .current
          flex 0 0 20px
          width 20px
          font-size $font-size-small
          color $color-theme-self
        .text
          flex 1
          no-wrap()
          font-size $font-size-medium
          color $color-text-d
        .like
          extend-click()
          margin-right 15px
          font-size $font-size-small
          color $color-self-h
          .icon-favorite
            color $color-sub-theme
        .delete
          extend-click()
          font-size $font-size-small
          color $color-self-h
    .list-operate
      width 140px
      margin 20px auto 30px auto
      .add
        display flex
        align-items center
        padding 8px 16px
        border 1px solid $color-text-l
        border-radius 100px
        color $color-text-l
        .icon-add
          margin-right 5px
          font-size $font-size-small-s
        .text
          font-size $font-size-small
    .list-close
      text-align center
      line-height 50px
      background $color-background
      font-size $font-size-medium-x
      color $color-text-l
</style>
