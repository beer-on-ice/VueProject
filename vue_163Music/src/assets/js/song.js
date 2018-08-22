import {
  ERR_OK
} from 'utils/config'
import {
  vueAxios,
  api
} from 'api/http.js'
export default class Song {
  constructor ({
    id,
    alid,
    singer,
    name,
    alname,
    duration,
    cover
  }) {
    this.id = id
    this.alid = alid
    this.singer = singer
    this.name = name
    this.alname = alname
    this.duration = duration
    this.cover = cover
  }
  // 获取歌曲播放地址
  getSongUrl () {
    if (this.url) {
      return Promise.resolve(this.url)
    }
    return new Promise((resolve, reject) => {
      vueAxios.get(api.songUrl, {
        id: this.id
      }).then(res => {
        if (res.status === ERR_OK) {
          this.url = res.data.data[0].url
          resolve(this.url)
        } else { // eslint-disable-next-line
          reject('no url')
        }
      })
    })
  }
  // 获取歌曲播放地址
  getSongLyric () {
    if (this.lyric) {
      return Promise.resolve(this.lyric)
    }
    return new Promise((resolve, reject) => {
      vueAxios.get(api.songLyric, {
        id: this.id
      }).then(res => {
        if (res.status === ERR_OK) {
          this.lyric = res.data.lrc.lyric
          resolve(this.lyric)
        } else { // eslint-disable-next-line
          reject('no lyric')
        }
      })
    })
  }
}

export function createSong (musicData) {
  return new Song({
    id: musicData.id,
    alid: musicData.al.id,
    singer: filterSinger(musicData.ar),
    name: musicData.name,
    alname: musicData.al.name,
    duration: musicData.dt,
    cover: musicData.al.picUrl
  })
}

// 组装这首歌的歌手名
export function filterSinger (singers) {
  let ret = []
  if (!singers) {
    return ''
  }
  singers.forEach((singer) => {
    ret.push(singer.name)
  })
  return ret.join('/')
}
