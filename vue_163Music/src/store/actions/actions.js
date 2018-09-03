import {
  saveHistory,
  deleteSearch,
  clearSearch
} from 'assets/js/cache'
import * as types from '../mutations/mutations-types'
import {
  playMode
} from 'assets/js/config'
import {
  shuffle
} from 'assets/js/util'
export default {
  selectPlay ({
    commit,
    state
  }, {
    list,
    index
  }) {
    commit(types.SET_SEQUENCE_LIST, list)
    // 如果是随机，直接点击歌曲播放时，把点击的歌曲索引对应到随机的数据里的位置
    if (state.mode === playMode.random) {
      let randomList = shuffle(list)
      commit(types.SET_PLAYLIST, randomList)
      index = findIndex(randomList, list[index])
    } else {
      commit(types.SET_PLAYLIST, list)
    }
    commit(types.SET_CURRENT_INDEX, index)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  randomPlay ({
    commit
  }, {
    list
  }) {
    commit(types.SET_PLAY_MODE, playMode.random)
    commit(types.SET_SEQUENCE_LIST, list)
    let randomList = shuffle(list)
    commit(types.SET_PLAYLIST, randomList)
    commit(types.SET_CURRENT_INDEX, 0)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  insertSong ({
    commit,
    state
  }, song) {
    // .slice返回副本，不会触发在外部修改state问题
    let playlist = state.playlist.slice()
    let sequenceList = state.sequenceList.slice()
    let currentIndex = state.currentIndex
    // 记录当前歌曲
    let currentSong = playlist[currentIndex]
    // 查找当前列表中是否有待插入的歌曲
    let fpIndex = findIndex(playlist, song)
    // 要插入的位置(索引+1)
    currentIndex++
    // 插入歌曲到索引位置
    playlist.splice(currentIndex, 0, song)
    // 如果已经由此音乐
    if (fpIndex > -1) {
      // 插入位置在 列表已存在的 之后
      if (currentIndex > fpIndex) {
        playlist.splice(fpIndex, 1)
        currentIndex--
      } else {
        playlist.splice(fpIndex + 1, 1)
      }
    }
    // 顺序列表
    let currentSIndex = findIndex(sequenceList, song) + 1
    let fsIndex = findIndex(sequenceList, song)
    sequenceList.splice(currentSIndex, 0, song)
    if (fsIndex > -1) {
      // 插入位置在 列表已存在的 之后
      if (currentSIndex > fsIndex) {
        sequenceList.splice(fsIndex, 1)
        currentSIndex--
      } else {
        playlist.splice(fsIndex + 1, 1)
      }
    }
    commit(types.SET_PLAYLIST, playlist)
    commit(types.SET_SEQUENCE_LIST, sequenceList)
    commit(types.SET_CURRENT_INDEX, currentIndex)
    commit(types.SET_FULL_SCREEN, true)
    commit(types.SET_PLAYING_STATE, true)
  },
  saveSearchHistory ({
    commit
  }, query) {
    commit(types.SET_SEARCH_HISTORY, saveHistory(query))
  },
  deleteSearchHistory ({
    commit
  }, query) {
    commit(types.SET_SEARCH_HISTORY, deleteSearch(query))
  },
  clearSearchHistory ({
    commit
  }) {
    commit(types.SET_SEARCH_HISTORY, clearSearch())
  }

}

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
