<template lang="pug">
  .recommend(ref="recommend")
    scroll.recommend-content(:data="discLists" ref="scroll")
      div
        // 此处v-if：接口获取完了，才开始slider.vue的mounted
        .slider-wrapper(v-if="banners.length")
          slider
            div(v-for="item in banners")
              a(:href="item.url")
                img.needsclick(:src="item.picUrl" @load="loadImage")
        .recommend-list
          h1.list-title 热门歌单推荐
          ul
            li.item(v-for="item in discLists" @click="selectItem(item)")
              .icon
                img(width="60" height="60" v-lazy="item.coverImgUrl")
              .text
                .name(v-html="item.name")
                p.desc(v-html="item.description")
    router-view
</template>

<script type="text/ecmascript-6">
import Scroll from 'base/scroll/scroll'
import Slider from 'base/slider/slider'
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
import {playlistMixin} from 'assets/js/mixin'
import {mapMutations} from 'vuex'
export default{
  mixins: [playlistMixin],
  data () {
    return {
      banners: [],
      discLists: []
    }
  },
  created () {
    this._getBanner()
    this._getPlaylist()
  },
  methods: {
    ...mapMutations({
      setDisc: 'SET_DISC'
    }),
    // 获取首页banner
    async _getBanner () {
      try {
        let res = await vueAxios.get(api.banner)
        if (res.status !== ERR_OK) return
        this.banners = res.data.banners
      } catch (e) {
        console.log(e)
      }
    },
    // 获取推荐歌单
    async _getPlaylist () {
      try {
        let res = await vueAxios.get(api.discList, {limit: 50})
        if (res.status !== ERR_OK) return
        this.discLists = res.data.playlists
      } catch (e) {
        console.log(e)
      }
    },
    async selectItem (item) {
      try {
        let res = await vueAxios.get(api.songSheet, {id: item.id})
        if (res.status !== ERR_OK) return
        item.sheet = res.data.privileges

        this.setDisc(item)
        this.$router.push({path: `/recommend/${item.id}`})
      } catch (e) {
        console.log(e)
      }
    },
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : ''
      this.$refs.recommend.style.bottom = bottom
      this.$refs.scroll.refresh()
    },
    // 防止banner未加载时，高度未撑开
    loadImage () {
      if (!this.checkLoaded) {
        this.$refs.scroll.refresh()
        this.checkLoaded = true
      }
    }
  },
  components: {
    Slider,
    Scroll
  }
}

</script>

<style scoped lang="stylus">
@import '~assets/stylus/variable'
.recommend
  position fixed
  width 100%
  top 88px
  bottom 0
  .recommend-content
    height 100%
    overflow hidden
    .slider-wrapper
      position relative
      width 100%
      overflow hidden
    .recommend-list
      .list-title
        height 65px
        line-height 65px
        text-align center
        font-size $font-size-medium
        color $color-theme
      .item
        display flex
        box-sizing border-box
        align-items center
        padding 0 20px 20px 20px
        .icon
          flex 0 0 60px
          width 60px
          padding-right 20px
        .text
          display flex
          flex-direction column
          justify-content center
          flex 1
          line-height 20px
          overflow hidden
          font-size $font-size-medium
          .name
            margin-bottom 10px
            color $color-text
          .desc
            color $color-text-d
            text-overflow ellipsis
            white-space nowrap
            overflow hidden
    .loading-container
      position absolute
      width 100%
      top 50%
      transform translateY(-50%)
</style>
