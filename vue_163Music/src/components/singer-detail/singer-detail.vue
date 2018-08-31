<template lang="pug">
  transition(name="slide")
    music-list(:songs="songs" :title="title" :bg-image="bgImage")
</template>

<script>
import {mapGetters} from 'vuex'
import {ERR_OK} from 'utils/config'
import {vueAxios, api} from 'api/http.js'
import {createSong} from 'assets/js/song'
import MusicList from 'components/music-list/music-list'
export default {
  data () {
    return {
      songs: []
    }
  },
  created () {
    this._getSingerDetail()
  },
  computed: {
    ...mapGetters([
      'singer'
    ]),
    title () {
      return this.singer.name
    },
    bgImage () {
      return this.singer.avatar
    }
  },
  methods: {
    // 获取歌手详情
    async _getSingerDetail () {
      if (!this.singer.id) {
        this.$router.push('/singer')
        return
      }
      try {
        let res = await vueAxios.get(api.singerDetail, {id: this.singer.id})
        if (res.status !== ERR_OK) return
        this.songs = this._normalizeSongs(res.data.hotSongs)
      } catch (e) {
        console.log(e)
      }
    },
    // 生成对应歌曲的类
    _normalizeSongs (list) {
      let ret = []
      list.forEach(item => {
        console.log(item)
        if (item.id && item.al.id) ret.push(createSong(item))
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
.slide-enter-active, .slide-leave-active
  transition all 0.3s
.slide-enter, .slide-leave-to
  transform translate3d(100%, 0, 0)
</style>
