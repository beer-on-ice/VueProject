<template lang="pug">
  .recommend
    .recommend-content
      // 此处v-if：接口获取完了，才开始slider.vue的mounted
      .slider-wrapper(v-if="banners.length")
        slider
          div(v-for="item in banners")
            a(:href="item.url")
              img(:src="item.picUrl")
      .recommend-list
        h1.list-title 热门歌单推荐
        ul
</template>

<script type="text/ecmascript-6">
import Slider from 'base/slider/slider'
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
export default{
  data () {
    return {
      banners: []
    }
  },
  created () {
    this._getBanner()
  },
  methods: {
    // 获取首页banner
    async _getBanner () {
      await vueAxios.get(api.banner).then(res => {
        if (res.status === ERR_OK) {
          this.banners = res.data.banners
        }
      })
    }
  },
  components: {
    Slider
  }
}

</script>

<style scoped lang="stylus">
@import "~assets/stylus/variable"

.recommend
  position: fixed
  width: 100%
  top: 88px
  bottom: 0
  .recommend-content
    height: 100%
    overflow: hidden
    .slider-wrapper
      position: relative
      width: 100%
      overflow: hidden
    .recommend-list
      .list-title
        height: 65px
        line-height: 65px
        text-align: center
        font-size: $font-size-medium
        color: $color-theme
      .item
        display: flex
        box-sizing: border-box
        align-items: center
        padding: 0 20px 20px 20px
        .icon
          flex: 0 0 60px
          width: 60px
          padding-right: 20px
        .text
          display: flex
          flex-direction: column
          justify-content: center
          flex: 1
          line-height: 20px
          overflow: hidden
          font-size: $font-size-medium
          .name
            margin-bottom: 10px
            color: $color-text
          .desc
            color: $color-text-d
    .loading-container
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
</style>
