<template>
    <transition name='slide'>
        <music-list :songs='songs' :title='title' :bg-image="bgImage"></music-list>
    </transition>
</template>

<script>
  import {mapGetters} from 'vuex'
  import {getSingerDetail} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import {createSong} from 'common/js/song'
  import MusicList from 'components/music-list/music-list'

  export default {
      data() {
          return {
              songs: []
          }
      },
    computed: {
        title() {
            return this.singer.name
        },
        bgImage() {
            return this.singer.avatar
        },
      // 映射 this.singer 为 store.getters.singer
      ...mapGetters([
        'singer'
      ])
    },
    created() {
        // console.log(this.singer);
        this._getDetail()
    },
    methods: {
        _getDetail() {
            //用户在歌手详情页刷新了，如果没此歌手，就回到歌手列表
            if(!this.singer.id) {
                this.$router.push('/singer')
                return
            }
            getSingerDetail(this.singer.id).then((res) => {
                if(res.code === ERR_OK) {
                    this.songs = this._normalizeSongs(res.data.list)
                    console.log(this.songs);
                }
            })
        },
        _normalizeSongs(list) {
            let ret = []
            list.forEach((item) => {
                let {musicData} = item
                if(musicData.songid && musicData.albummid) {
                    ret.push(createSong(musicData))
                }
            })
            return ret
        }
    },
    components: {
        MusicList
    }
  }
</script>


<style lang='stylus'>
@import '~common/stylus/variable'

.slide-enter-active,.slide-leave-active
    transition:all .5s
.slide-enter,.slide-leave-to
    transform: translate3d(100%,0,0)
</style>
