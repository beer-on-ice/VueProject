import {playMode} from 'common/js/config'
import {loadSearch} from 'common/js/cache'

const state = {
    singer: {},
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [],
    //播放模式
    mode: playMode.sequence,
    currentIndex: -1,
    disc: {},
    topList: {},
    searchHistory: loadSearch()
}

export default state
