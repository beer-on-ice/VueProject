import axios from 'axios'
import qs from 'qs'

export const api = {
  /**
   * 首页banner
   */
  banner: '/api/banner',
  /** 推荐歌单
   * cat：歌单分类
   * limit: 取出歌单数量 , 默认为 20
   */
  discList: '/api/top/playlist/highquality',
  /** 热门歌手 */
  hotSingerList: '/api/toplist/artist',
  /** 歌手列表
   *  limit: 取出数量, 默认为 50
   *  offset： 用于分页
   */
  singerList: '/api/top/artists',
  /**
   * 歌手信息
   */
  singerDetail: '/api/artists',
  /**
   * 歌曲播放url
   */
  songUrl: '/api/music/url',
  /**
   * 歌词
   */
  songLyric: '/api/lyric',
  /**
   * 歌单歌曲列表
   */
  songSheet: '/api/playlist/detail',
  /**
   * 歌曲详情
   * ids
   */
  songDetail: '/api/song/detail',
  /**
   * 排行
   * idx
   */
  rank: '/api/top/list',
  /**
   * 搜索
   * 必选参数：keywords
   * 可选参数： limit/offset/type
   */
  search: '/api/search',
  /**
   * 搜索建议
   * 必选参数： keywords
   * 可选参数： limit / offset / type
   */
  searchSuggest: '/api/search/suggest',
  /**
   * 热搜
   */
  hotSearch: '/api/search/hot'
}

export const vueAxios = {
  post (url, data) {
    return axios({
      method: 'post',
      url,
      data: qs.stringify(data),
      timeout: 5000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        xhrFields: {
          withCredentials: true
        }
      }
    })
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      timeout: 50000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        xhrFields: {
          withCredentials: true
        }
      }
    })
  }
}
