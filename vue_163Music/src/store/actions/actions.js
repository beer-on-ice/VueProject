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
  }
}

function findIndex (list, song) {
  return list.findIndex((item) => {
    return item.id === song.id
  })
}
