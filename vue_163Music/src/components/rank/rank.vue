<template lang='pug'>
  .rank(ref="rank")
    scroll.toplist(:data="rankList" ref="rankList")
      ul
        li.item(v-for='item in rankList')
          .icon
            img(width="100" height="100" v-lazy='item.coverImgUrl')
          ul.songlist
            li.song(v-for='(song,index) in item.songList')
              span {{index+1}}
              span {{getInfo(song)}}
      .loading-container(v-show="!rankList.length")
        loading
    router-view
</template>

<script>
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import {playlistMixin} from 'assets/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      rankIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
      rankList: []
    }
  },
  created () {
    this._getRank()
  },
  methods: {
    handlePlaylist (playlist) {
      const bottom = playlist.length ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.rankList.refresh()
    },
    getInfo (song) {
      const info = song.data.songs[0]
      let x = ''
      for (let item of info.ar) {
        x += `/${item.name}`
      }
      return `${info.name} - ${x.substr(1)}`
    },
    async _getRank () {
      let rankUrls = []
      for (let id of this.rankIdx) {
        rankUrls.push(`${api.rank}?idx=${id}`)
      }
      let requests = rankUrls.map(this._requestUrl)
      Promise.all(requests)
        .then((res) => {
          for (let item of res) {
            this._getSongs(item)
          }
        })
    },
    async _getSongs (item) {
      let songUrls = []
      let songList = item.data.privileges.slice(0, 3)
      for (let song of songList) {
        songUrls.push(`${api.songDetail}?ids=${song.id}`)
      }
      let songRequests = songUrls.map(this._requestUrl)
      Promise.all(songRequests).then((song) => {
        item.data.playlist.songList = song
        this.rankList.push(item.data.playlist)
      })
    },
    _requestUrl (url) {
      return vueAxios.get(url)
    }
  },
  components: {
    Scroll,
    Loading
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.rank
  position fixed
  width 100%
  top 88px
  bottom 0
  .toplist
    height 100%
    overflow hidden
    .item
      display flex
      margin 0 20px
      padding-top 20px
      height 100px
      &:last-child
        padding-bottom 20px
      .icon
        flex 0 0 100px
        width 100px
        height 100px
      .songlist
        flex 1
        display flex
        flex-direction column
        justify-content center
        padding 0 20px
        height 100px
        overflow hidden
        background $color-highlight-background
        color $color-text-d
        font-size $font-size-small
        .song
          no-wrap()
          line-height 26px
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
