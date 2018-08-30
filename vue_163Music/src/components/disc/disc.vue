<template lang="pug">
  transition(name="slide")
    music-list(:bgImage="bgImage" :title="title" :songs="songs")
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
import {createSong} from 'assets/js/song'

export default {
  created () {
    this.getSongInfo()
  },
  data () {
    return {
      songs: []
    }
  },
  computed: {
    ...mapGetters([
      'disc'
    ]),
    title () {
      return this.disc.name
    },
    bgImage () {
      return this.disc.coverImgUrl
    }
  },
  methods: {
    async getSongInfo () {
      if (!this.disc.id) {
        this.$router.push('/recommend')
        return
      }
      let urls = []
      for (let song of this.disc.sheet) {
        urls.push({
          url: api.songDetail,
          id: song.id
        })
      }
      let requests = urls.map(this._requestUrl)

      Promise.all(requests)
        .then((res) => {
          res.map(item => { this.songs.push(createSong(item.data.songs[0])) })
        })
    },
    _requestUrl (param) {
      return vueAxios.get(param.url, {ids: param.id})
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
