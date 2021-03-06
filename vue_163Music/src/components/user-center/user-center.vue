<template lang="pug">
transition(name="slide")
  .user-center
    .back
      i.icon-back(@click="back")
    .switches-wrapper
      switches(:switches="switches" :currentIndex="currentIndex" @switchItem="switchItem")
    .play-btn(ref='playBtn' @click="random")
      i.icon-play
      span.text 随机播放全部
    .list-wrapper(ref="listWrapper" )
      scroll.list-scroll(v-if="currentIndex===0" :data="favoriteList" ref="favoriteList" )
        .list-inner
          song-list(:songs="favoriteList" @select="selectSong")
      scroll.list-scroll(v-else :data="playHistory" ref="playList")
        .list-inner
          song-list(:songs="playHistory" @select="selectSong")
    .no-result-wrapper(v-show="noResult")
      no-result(:title="noResultDesc")
</template>

<script>
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import SongList from 'base/song-list/song-list'
import NoResult from 'base/no-result/no-result'
import Song from 'assets/js/song'
import {mapGetters, mapActions} from 'vuex'
import {playlistMixin} from 'assets/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      currentIndex: 0,
      switches: [
        {
          name: '我喜欢的'
        },
        {
          name: '最近听过'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'favoriteList',
      'playHistory'
    ]),
    noResult () {
      if (this.currentIndex === 0) {
        return !this.favoriteList.length
      } else {
        return !this.playHistory.length
      }
    },
    noResultDesc () {
      if (this.currentIndex === 0) {
        return '暂无收藏歌曲'
      } else {
        return '你还没有听过歌曲~'
      }
    }
  },
  methods: {
    ...mapActions([
      'insertSong',
      'randomPlay'
    ]),
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.listWrapper.style.bottom = bottom

      this.$refs.favoriteList && this.$refs.favoriteList.refresh()
      this.$refs.playList && this.$refs.playList.refresh()
    },
    back () {
      this.$router.back()
    },
    random () {
      let list = this.currentIndex === 0 ? this.favoriteList : this.playHistory
      if (list.length === 0) return
      list = list.map(song => {
        return new Song(song)
      })
      this.randomPlay(list)
    },
    switchItem (index) {
      this.currentIndex = index
    },
    selectSong (song) {
      this.insertSong(new Song(song))
    }
  },
  components: {
    Switches,
    SongList,
    Scroll,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.user-center
  position fixed
  top 0
  bottom 0
  z-index 100
  width 100%
  background $color-background
  &.slide-enter-active, &.slide-leave-active
    transition all 0.3s
  &.slide-enter, &.slide-leave-to
    transform translate3d(100%, 0, 0)
  .back
    position absolute
    top 0
    left 6px
    z-index 50
    .icon-back
      display block
      padding 10px
      font-size $font-size-large-x
      color $color-theme
  .switches-wrapper
    margin 10px 0 30px 0
  .play-btn
    box-sizing border-box
    width 135px
    padding 7px 0
    margin 0 auto
    text-align center
    border 1px solid $color-text-l
    color $color-text-l
    border-radius 100px
    font-size 0
    .icon-play
      display inline-block
      vertical-align middle
      margin-right 6px
      font-size $font-size-medium-x
    .text
      display inline-block
      vertical-align middle
      font-size $font-size-small
  .list-wrapper
    position absolute
    top 110px
    bottom 0
    width 100%
    .list-scroll
      height 100%
      overflow hidden
      .list-inner
        padding 20px 30px
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
