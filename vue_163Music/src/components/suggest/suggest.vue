<template lang="pug">
scroll.suggest(:data="result" :pullup="pullup" @scrollToEnd="searchMore" ref="suggest")
  ul.suggest-list
    li.suggest-item(v-for="item in result")
      .icon
        i(:class="getIconCls(item)")
      .name
        p.text(v-html="getDisplayName(item)")
    loading(v-show="hasMore" title="")
  .no-result-wrapper(v-show="!hasMore && !result.length")
    no-result(title="暂无搜索结果，换个词试试？")
</template>

<script>
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
import {createSong} from 'assets/js/song'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import NoResult from 'base/no-result/no-result'
const TYPE_SINGER = 'singer'
const TYPE_SONG = 'song'
export default {
  data () {
    return {
      page: 1,
      limit: 30,
      result: [],
      pullup: true, // 是否能上拉刷新
      hasMore: true, // 是否有更多
      searchSinger: true // 是否能再次搜索歌手
    }
  },
  props: {
    query: {
      type: String,
      default: ''
    }, // 搜索关键字
    showSinger: {
      type: Boolean,
      default: true
    } // 是否展示从而搜索歌手
  },
  methods: {
    // 搜索歌手
    async _searchSinger () {
      try {
        let artist = await vueAxios.get(api.search, {keywords: this.query, offset: 0, limit: 1, type: 100})
        if (artist.status !== ERR_OK) return
        if (artist.data.result && artist.data.result.artistCount !== 0) {
          this.result = [({
            ...artist.data.result.artists[0],
            ...{type: TYPE_SINGER}
          })]
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 搜索歌曲
    async _searchSong () {
      this.hasMore = true
      this.page = 1
      this.$refs.suggest.scrollTo(0, 0)
      try {
        let song = await vueAxios.get(api.search, {keywords: this.query, offset: (this.page - 1) * this.limit, limit: this.limit, type: 1})
        if (song.status !== ERR_OK) return
        if (song.data.result && song.data.result.songCount !== 0) {
          song.data.result.songs.forEach(item => {
            item.type = TYPE_SONG
            let beingSong = {
              id: item.id,
              al: {id: item.album.id, name: item.album.name, picUrl: item.album.picUrl},
              ar: item.artists,
              name: item.name,
              dt: item.duration
            }
            this.result.push(createSong(beingSong))
          })
        }
        this._checkMore(song.data)
      } catch (e) {
        console.log(e)
      }
    },
    // 加载更多
    async searchMore () {
      if (!this.hasMore) return
      this.page++
      try {
        let becomeSong = []
        let song = await vueAxios.get(api.search, {keywords: this.query, offset: (this.page - 1) * this.limit, limit: this.limit, type: 1})
        if (song.status !== ERR_OK) return
        if (song.data.result.songCount !== 0) {
          song.data.result.songs.forEach(item => {
            item.type = TYPE_SONG
            let beingSong = {
              id: item.id,
              al: {id: item.album.id, name: item.album.name, picUrl: item.album.picUrl},
              ar: item.artists,
              name: item.name,
              dt: item.duration
            }
            becomeSong.push(createSong(beingSong))
          })
          this.result = this.result.concat(becomeSong)
        }
        this._checkMore(song.data)
      } catch (e) {
        console.log(e)
      }
    },
    // 检查能否还有未加载的
    _checkMore (data) {
      data = data.result
      if (!data.songCount || (data.songs.length + this.page * this.limit) >= data.songCount) this.hasMore = false
    },
    // 显示文本
    getDisplayName (item) {
      if (item.type === TYPE_SINGER) {
        return item.name
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    // 图标class
    getIconCls (item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    }
  },
  watch: {
    query () {
      // 如果搜索时展示歌手
      if (this.showSinger) {
        this._searchSinger()
      }
      this._searchSong()
    }
  },
  components: {
    Scroll,
    Loading,
    NoResult
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.suggest
  height 100%
  overflow hidden
  .suggest-list
    padding 0 30px
    .suggest-item
      display flex
      align-items center
      padding-bottom 20px
    .icon
      flex 0 0 30px
      width 30px
      [class^='icon-']
        font-size 14px
        color $color-text-d
    .name
      flex 1
      font-size $font-size-medium
      color $color-text-d
      overflow hidden
      .text
        no-wrap()
  .no-result-wrapper
    position absolute
    width 100%
    top 50%
    transform translateY(-50%)
</style>
