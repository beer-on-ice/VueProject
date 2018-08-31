<template lang='pug'>
  .search
    .search-box-wrapper
      search-box(ref="searchBox" @query="queryChange")
    .shortcut-wrapper( v-show='!query')
      .shortcut
        .hot-key
          h1.title 热门搜索
          ul
            li.item(v-for="item in hotKeys" @click="addQuery(item.first)")
              span {{item.first}}
    .search-result(v-show='query' ref='searchResult')
      suggest(:query="query")
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Suggest from 'components/suggest/suggest'

import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
export default {
  data () {
    return {
      hotKeys: [],
      query: ''
    }
  },
  created () {
    this._getHotSearch()
  },
  methods: {
    // 获取热门搜索
    async _getHotSearch () {
      try {
        let res = await vueAxios.get(api.hotSearch)
        if (res.status !== ERR_OK) return
        this.hotKeys = res.data.result.hots
      } catch (e) {
        console.log(e)
      }
    },
    // 关键字添加搜索
    addQuery (key) {
      this.$refs.searchBox.setQuery(key)
    },
    // 关键字改变
    queryChange (key) {
      this.query = key
    }
  },
  components: {
    SearchBox,
    Suggest
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.search
  .search-box-wrapper
    margin 20px
  .shortcut-wrapper
    position fixed
    top 178px
    bottom 0
    width 100%
    .shortcut
      height 100%
      overflow hidden
      .hot-key
        margin 0 20px 20px 20px
        .title
          margin-bottom 20px
          font-size $font-size-medium
          color $color-text-l
        .item
          display inline-block
          padding 5px 10px
          margin 0 20px 10px 0
          border-radius 6px
          background $color-highlight-background
          font-size $font-size-medium
          color $color-text-d
      .search-history
        position relative
        margin 0 20px
        .title
          display flex
          align-items center
          height 40px
          font-size $font-size-medium
          color $color-text-l
          .text
            flex 1
          .clear
            extend-click()
            .icon-clear
              font-size $font-size-medium
              color $color-text-d
  .search-result
    position fixed
    width 100%
    top 178px
    bottom 0
</style>
