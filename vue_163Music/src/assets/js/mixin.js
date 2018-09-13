import {
  mapGetters,
  mapMutations,
  mapActions
} from 'vuex'

import {
  playMode
} from 'assets/js/config'

import {
  shuffle
} from 'assets/js/util'

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

export const playerMixin = {
  computed: {
    ...mapGetters([
      'playlist',
      'currentSong',
      'mode',
      'sequenceList'
    ]),
    iconMode () {
      return this.mode === playMode.sequence ? 'icon-sequence' : this.mode === playMode.loop ? 'icon-loop' : 'icon-random'
    }
  },
  methods: {
    ...mapMutations({
      setPlayingState: 'SET_PLAYING_STATE',
      setCurrentIndex: 'SET_CURRENT_INDEX',
      setPlayMode: 'SET_PLAY_MODE',
      setplaylist: 'SET_PLAYLIST'
    }),
    // 更换播放模式
    changeMode () {
      // 取余
      const mode = (this.mode + 1) % 3
      this.setPlayMode(mode)
      let list = null

      if (mode === playMode.random) {
        list = shuffle(this.sequenceList)
      } else {
        list = this.sequenceList
      }
      this._resetCurrentIndex(list)
      this.setplaylist(list)
    },
    // 使index同步为随机后的当前歌曲的索引值
    _resetCurrentIndex (list) {
      let index = list.findIndex((item) => {
        return item.id === this.currentSong.id
      })
      this.setCurrentIndex(index)
    }
  }
}

export const searchMixin = {
  data () {
    return {
      query: '',
      refreshDelay: 100
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ])
  },
  methods: {
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory'
    ]),
    // 失焦缩回输入框
    blurInput () {
      this.$refs.searchBox.blur()
    },
    // 保存搜索历史
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    // 关键字改变
    queryChange (key) {
      this.query = key
    },
    // 关键字添加搜索
    addQuery (key) {
      this.$refs.searchBox.setQuery(key)
    }
  }
}
