<template lang='pug'>
  .search
    .search-box-wrapper
      search-box(ref="searchBox" @query="queryChange")
    .shortcut-wrapper( v-show='!query' ref='shortcutWrapper')
      scroll.shortcut(:data="shortcut" ref="shortcut")
        div
          .hot-key
            h1.title 热门搜索
            ul
              li.item(v-for="item in hotKeys" @click="addQuery(item.first)")
                span {{item.first}}
          .search-history(v-show="searchHistory.length")
            h1.title
              span.text 搜索历史
              span.clear(@click="showConfirm")
                i.icon-clear
            search-list(:searches="searchHistory" @select="addQuery" @delete="deleteQuery")
    .search-result(v-show='query' ref='searchResult')
      suggest(
        :query="query"
        @listScroll="blurInput"
        @select="saveSearch"
        ref="suggest"
      )
    confirm(ref="confirm" text="是否清空搜索记录？" confirmBtnText="清空" @confirm="clearSearchHistory")
</template>

<script>
import SearchBox from 'base/search-box/search-box'
import Confirm from 'base/confirm/confirm'
import Scroll from 'base/scroll/scroll'
import Suggest from 'components/suggest/suggest'
import {mapActions, mapGetters} from 'vuex'
import SearchList from 'base/search-list/search-list'
import {vueAxios, api} from 'api/http'
import {ERR_OK} from 'utils/config'
import {playlistMixin} from 'assets/js/mixin'
export default {
  mixins: [playlistMixin],
  data () {
    return {
      hotKeys: [],
      query: ''
    }
  },
  computed: {
    ...mapGetters([
      'searchHistory'
    ]),
    // 有两个数组，都需要刷新
    shortcut () {
      return this.hotKeys.concat(this.searchHistory)
    }
  },
  created () {
    this._getHotSearch()
  },
  methods: {
    ...mapActions([
      'saveSearchHistory',
      'deleteSearchHistory',
      'clearSearchHistory'
    ]),
    handlePlaylist (playlist) {
      const bottom = playlist.length > 0 ? '60px' : 0
      this.$refs.shortcutWrapper.style.bottom = bottom
      this.$refs.shortcut.refresh()
      this.$refs.searchResult.style.bottom = bottom
      this.$refs.suggest.refresh()
    },
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
    showConfirm () {
      this.$refs.confirm.show()
    },
    // 保存搜索历史
    saveSearch () {
      this.saveSearchHistory(this.query)
    },
    // 删除指定搜索历史
    deleteQuery (item) {
      this.deleteSearchHistory(item)
    },
    // 关键字添加搜索
    addQuery (key) {
      this.$refs.searchBox.setQuery(key)
    },
    // 关键字改变
    queryChange (key) {
      this.query = key
    },
    blurInput () {
      this.$refs.searchBox.blur()
    }
  },
  watch: {
    query (newQuery) {
      if (!newQuery) {
        setTimeout(() => {
          this.$refs.shortcut.refresh()
        }, 20)
      }
    }
  },
  components: {
    SearchBox,
    Suggest,
    SearchList,
    Confirm,
    Scroll
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
