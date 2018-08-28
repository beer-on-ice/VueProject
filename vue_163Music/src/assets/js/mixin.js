import {
  mapGetters
} from 'vuex'
// 底部高度自适应
export const playlistMixin = {
  computed: {
    ...mapGetters([
      'playlist'
    ])
  },
  mounted () {
    this.handlePlaylist(this.playlist)
  },
  activated () {
    this.handlePlaylist(this.playlist)
  },
  watch: {
    playlist (newVal) {
      this.handlePlaylist(newVal)
    }
  },
  methods: {
    handlePlaylist () {
      // eslint-disable-next-line
      throw new console.error('component must implement handlePlaylist method')
    }
  }

}
