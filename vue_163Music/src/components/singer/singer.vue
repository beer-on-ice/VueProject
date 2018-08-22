<template lang='pug'>
  .singer(ref="singer")
    list-view(:data="singers" @select="selectSinger")
    router-view
</template>

<script type="text/ecmascript-6">
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
import getFirstChar from 'assets/js/char'
import ListView from 'components/list-view/list-view'
import {mapMutations} from 'vuex'

export default {
  data () {
    return {
      hotSingers: [],
      singers: []
    }
  },
  created () {
    this._getHotSingerList()
    this._getSingerList()
  },
  methods: {
    ...mapMutations({
      setSinger: 'SET_SINGER'
    }),
    // 点击某个歌手
    selectSinger (singer) {
      this.$router.push(`/singer/${singer.id}`)
      this.setSinger(singer)
    },
    // 获取热门歌手
    async _getHotSingerList () {
      try {
        let res = await vueAxios.get(api.hotSingerList)
        if (res.status !== ERR_OK) return
        let artists = res.data.list.artists.slice(0, 10)
        for (let item of artists) {
          item.nameCode = getFirstChar(item.name)
          this.hotSingers.push({
            id: item.id,
            name: item.name,
            avatar: item.img1v1Url
          })
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 获取歌手列表
    async _getSingerList () {
      try {
        let res = await vueAxios.get(api.singerList, {limit: 100})
        if (res.status !== ERR_OK) return
        for (let item of res.data.artists) {
          item.nameCode = getFirstChar(item.name)
        }
        this.singers = this._normalizeSinger(res.data.artists)
      } catch (e) {
        console.log(e)
      }
    },
    _normalizeSinger (list) {
      let map = {
        hot: {
          title: '热门',
          items: this.hotSingers
        }
      }
      list.forEach((item, index) => {
        const key = item.nameCode
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push({
          id: item.id,
          name: item.name,
          avatar: item.img1v1Url
        })
      })
      // 处理map,得到按字母排序的有序列表
      let hot = []
      let ret = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === '热门') {
          hot.push(val)
        }
      }
      // 字母顺序正序排序
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  components: {
    ListView
  }
}
</script>

<style lang="stylus" scoped>
.singer
  position fixed
  top 88px
  bottom 0
  width 100%
</style>
