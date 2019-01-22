<template lang="pug">
  transition(name="slide")
    music-list(:title="title" :bg-image="bgImage" :songs="songs" :rank="rank")
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
import {mapGetters} from 'vuex'
import {createSong} from 'assets/js/song'

export default {
  data () {
    return {
      songs: [],
      rank: true
    }
  },
  created () {
    this._getSongList()
  },
  methods: {
    // 排行榜歌曲详情
    async _getSongList () {
      if (!this.topList.id) {
        this.$router.push('/rank')
        return
      }
      let songUrls = []
      let songIdList = this.topList.privileges.slice(0, 50)
      for (let item of songIdList) {
        songUrls.push({
          url: api.songDetail,
          id: {ids: item.id}
        })
      }
      let songRequests = songUrls.map(this._requestUrl)
      Promise.all(songRequests).then(res => {
        res.map(item => { this.songs.push(createSong(item.data.songs[0])) })
      })
    },
    _requestUrl (param) { return vueAxios.get(param.url, param.id) }
  },
  computed: {
    ...mapGetters([
      'topList'
    ]),
    title () {
      return this.topList.name
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].cover
      }
      return ''
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s ease
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
