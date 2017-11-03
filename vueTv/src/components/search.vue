<template>
  <div>
    <searchBar @search='_search' :total="total"></searchBar>
    <div v-loading='loading&&!lastList.length' class="conWrapper clearfix" v-scroll="_currentChange">
      <div>
        <div class="clearfix" v-for="(item,index) in collection" :key="index">
          <card @go='_go' :datas="item.itemList" :id="item.header.id" :titles="item.header.title"></card>
        </div>
        <card :datas='lastList'></card>
        <div class="hint" v-if="hint">
          没有找到相关内容,试试别的关键词
        </div>
      </div>
      <load-more v-show="isLoadMore" @currentChange="_currentChange"></load-more>
    </div>
  </div>
</template>

<script>
import { apiSearch } from '@/assets/api/getDatas'
import { mapState, mapGetters, mapMutations } from 'vuex'
import card from './card'
import loadMore from './loadMore'
import searchBar from './searchBar'
export default {
  name: 'search',
  components: {
    searchBar,
    card,
    loadMore
  },
  data() {
    return {
      newList: [],
      lastList: [],
      start: 0,
      count: 20,
      n: 0,
      id: null,
      collection: [], //优先显示
      isLoadMore: false,
      hint: false,
      total: 0,
    }
  },
  computed: {
    ...mapState(
      ['loading', 'input', 'stateNum'])
  },
  methods: {
    ...mapMutations([
      'setLoading',
      'setInput'
    ]),
    _getList(start, count, q) {
      this.setLoading(true)
      apiSearch(start, count, q).then(res => {
        res.itemList.filter(el => {
          if (el.type == "videoCollectionWithBrief") {
            this.collection.push(el.data)
          }
        })
        this.newList = res.itemList.filter(el => {
          return el.type == 'video'
        })
        this.lastList = this.lastList.concat(this.newList)
        this.isLoadMore = res.nextPageUrl ? true : false
        this.total = res.total
        this.hint = !this.total ? true : false
        this.setLoading(false)
        if (!this.isLoadMore) {
          this.setInput('')
        }
      })

    },
    _search() {
      this.lastList = this.collection = []
      this.start = 0
      this.n = 0
      this._getList(this.start, this.count, this.input)
    },
    _currentChange() {
      if (this.isLoadMore) {
        this.newList = []
        this.n++
        this.start = this.n * this.count
        this.isLoadMore = false
      }
    },
    _go(id) {
      console.log(id)
      // this.id = id
      // this._into(this.start, this.count, this.id)
    }
  },

  watch: {
    start() {
      if (this.start) {
        this._getList(this.start, this.count, this.input)
      }
    },
    stateNum() {
      this._search()
    }
  },
  created() {
    if (this.input) {
      this._getList(this.start, this.count, this.input)
      this.isLoadMore = true
    } else {
      this.isLoadMore = false
    }
  }
}
</script>

<style scoped>

</style>
