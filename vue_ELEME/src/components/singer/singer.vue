<template>
    <div class="singer" ref="singer">
        <listview @select='selectSinger' :data='singers' ref="list"></listview>
        <router-view></router-view>
    </div>
</template>

<script>
import Listview from 'base/listview/listview'
import {getSingerList} from 'api/singer'
import {ERR_OK} from 'api/config'
import Singer from 'common/js/singer'
import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

const Hot_door = '热门歌手'
const Hot_singers = 10
export default {
    mixins: [playlistMixin],
    data() {
      return {
          singers: []
      }
    },
    created() {
        this._getSingerList()
    },
    components: {
        Listview
    },
    methods: {
        // 底部高度自适应
        handlePlaylist(playlist) {
            const bottom = playlist.length ? '60px' : ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
        selectSinger(singer) {
            this.$router.push({
                path: `/singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        _getSingerList() {
            getSingerList().then((res)=>{
                if (res.code === ERR_OK) {
                //   console.log(res.data.list);
                  this.singers = this._normalizeSinger(res.data.list)
                }
            })
        },
        //规范化singer数据
        _normalizeSinger(list) {
            let map = {
                hot: {
                    title: Hot_door,
                    items: []
                }
            }
            list.forEach((item,index) => {
                if(index < Hot_singers) {
                    map.hot.items.push(new Singer({
                        name: item.Fsinger_name,
                        id: item.Fsinger_mid,
                    }))
                }
                const key = item.Findex
                if(!map[key]) {
                    map[key] = {
                      title: key,
                      items: []
                    }
                }
                map[key].items.push(new Singer({
                    name: item.Fsinger_name,
                    id: item.Fsinger_mid
                }))
            })
            // 处理map,得到按字母排序的有序列表
            let hot = [];
            let ret = [];
            for(let key in map) {
                let val = map[key];
                if(val.title.match(/[a-zA-Z]/)) {
                    ret.push(val)
                } else if(val.title === Hot_door) {
                    hot.push(val)
                }
            }
            //字母顺序排序
            ret.sort((a,b) => {
                return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        //可以使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用
        ...mapMutations({
            //映射 this.setSinger 为 store.mutations.SET_SINGER
            setSinger: 'SET_SINGER'
        })
    }
  }
</script>

<style lang="stylus" >
.singer
  position: fixed
  top: 88px
  bottom: 0
  width: 100%
</style>
