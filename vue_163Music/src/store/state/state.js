import {
  playMode
} from 'assets/js/config'
import {
  loadSearch,
  loadPlay,
  loadFavorite
} from 'assets/js/cache'
export default {
  singer: {},
  playing: false,
  fullScreen: false,
  playlist: [],
  sequenceList: [],
  mode: playMode.sequence,
  currentIndex: -1, // 当前播放
  disc: {},
  topList: {},
  searchHistory: loadSearch(),
  playHistory: loadPlay(),
  favoriteList: loadFavorite()
}
