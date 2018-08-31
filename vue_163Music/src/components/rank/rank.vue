<template lang='pug'>
  .rank(ref="rank")
    scroll.toplist(:data="rankList" ref="rankList")
      ul
        li.item(v-for='item in rankList' @click="selectItem(item)")
          .icon
            img(width="100" height="100" v-lazy='item.coverImgUrl')
          ul.songlist
            li.song(v-for='(song,index) in item.songList')
              span {{index+1}}
              span {{getSingerName(song)}}
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
import {mapMutations} from 'vuex'
import {filterSinger} from 'assets/js/song'
import Vue from 'vue'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      rankIdx: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
      rankList: []
    }
  },
  created () {
    this._getRank()
  },
  methods: {
    ...mapMutations({
      setTopList: 'SET_TOPLIST'
    }),
    // 选择排行榜
    selectItem (item) {
      this.$router.push({
        path: `/rank/${item.id}`
      })
      this.setTopList(item)
    },
    getSingerName (item) {
      return `${item.data.songs[0].name} - ${filterSinger(item.data.songs[0].ar)}`
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length ? '60px' : ''
      this.$refs.rank.style.bottom = bottom
      this.$refs.rankList.refresh()
    },
    // 获取排行榜
    async _getRank () {
      let rankUrls = []
      for (let rankId of this.rankIdx) {
        rankUrls.push({
          url: api.rank,
          id: {idx: rankId}
        })
      }
      let requests = rankUrls.map(this._requestUrl)
      Promise.all(requests)
        .then((res) => {
          for (let item of res) {
            item.data.playlist.playlist = []
            item.data.playlist.privileges = item.data.privileges
            this.rankList.push(item.data.playlist)
          }
          return this.rankList
        })
        .then((res) => {
          res.forEach((rank, index) => {
            this._getSongs(rank).then(resp => {
              Vue.set(this.rankList[index], 'songList', resp)
            })
          })
        })
    },
    // 获取排行榜里歌曲信息
    async _getSongs (rank) {
      let songUrls = []
      let songList = rank.privileges.slice(0, 3)
      for (let item of songList) {
        songUrls.push({
          url: api.songDetail,
          id: {ids: item.id}
        })
      }
      let songRequests = songUrls.map(this._requestUrl)
      return Promise.all(songRequests)
    },
    _requestUrl (param) { return vueAxios.get(param.url, param.id) }
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
