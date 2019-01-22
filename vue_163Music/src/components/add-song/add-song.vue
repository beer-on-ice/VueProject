<template lang="pug">
transition(name="slide")
  .add-song(v-show="showFlag" @click.stop)
    .header
      h1.title 添加歌曲到列表
      .close(@click="hide")
        i.icon-close
    .search-box-wrapper
      search-box(placeholder="搜索歌曲" @query="queryChange" ref="searchBox")
    .shortcut(v-show="!query")
      switches(:switches="switches" :currentIndex="currentIndex" @switchItem="switchItem")
      .list-wrapper
        scroll.list-scroll(v-if="currentIndex===0" :data="playHistory" ref="songList" :refreshDelay="refreshDelay")
          .list-inner
            song-list(:songs="playHistory" @select="selectSong")
        scroll.list-scroll(v-else :data="playHistory" ref="searchList" :refreshDelay="refreshDelay")
          .list-inner
            search-list(@delete="deleteSearchHistory" @select="addQuery" :searches="searchHistory")
    .search-result(v-show="query")
      suggest(:query="query" :showSinger="showSinger" @select="selectSuggest" @listScroll="blurInput")
    top-tip(ref="topTip")
      .tip-title
        i.icon-ok
        span.text 1首歌曲已经添加到播放列表
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Switches from 'base/switches/switches'
import Scroll from 'base/scroll/scroll'
import Suggest from 'components/suggest/suggest'
import SongList from 'base/song-list/song-list'
import SearchList from 'base/search-list/search-list'
import TopTip from 'base/top-tip/top-tip'
import {searchMixin} from 'assets/js/mixin'
import {mapGetters, mapActions} from 'vuex'
import Song from 'assets/js/song'
export default {
  mixins: [searchMixin],
  data () {
    return {
      showFlag: false,
      showSinger: false,
      currentIndex: 0,
      switches: [
        {
          name: '最近播放'
        },
        {
          name: '搜索历史'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'playHistory'
    ])
  },
  methods: {
    ...mapActions([
      'insertSong'
    ]),
    show () {
      this.showFlag = true
      setTimeout(() => {
        if (this.currentIndex === 0) {
          this.$refs.songList.refresh()
        } else if (this.currentIndex === 1) {
          this.$refs.searchList.refresh()
        }
      }, 20)
    },
    hide () {
      this.showFlag = false
    },
    selectSong (song, index) {
      if (index !== 0) {
        this.insertSong(new Song(song))
        this.showTip()
      }
    },
    showTip () {
      this.$refs.topTip.show()
    },
    selectSuggest () {
      this.saveSearch()
      this.showTip()
    },
    switchItem (index) {
      this.currentIndex = index
    }
  },
  components: {
    SearchBox,
    Suggest,
    Switches,
    Scroll,
    SongList,
    SearchList,
    TopTip
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.add-song
  position fixed
  top 0
  bottom 0
  width 100%
  z-index 200
  background $color-background
  &.slide-enter-active, &.slide-leave-active
    transition all 0.3s
  &.slide-enter, &.slide-leave-to
    transform translate3d(100%, 0, 0)
  .header
    position relative
    height 44px
    text-align center
    .title
      line-height 44px
      font-size $font-size-large
      color $color-text
    .close
      position absolute
      top 0
      right 8px
      .icon-close
        display block
        padding 12px
        font-size 20px
        color $color-background-self
  .search-box-wrapper
    margin 20px
  .shortcut
    .list-wrapper
      position absolute
      top 165px
      bottom 0
      width 100%
      .list-scroll
        height 100%
        overflow hidden
        .list-inner
          padding 20px 30px
  .search-result
    position fixed
    top 124px
    bottom 0
    width 100%
  .tip-title
    text-align center
    padding 18px 0
    font-size 0
    .icon-ok
      font-size $font-size-medium
      color $color-theme
      margin-right 4px
    .text
      font-size $font-size-medium
      color $color-text
</style>
