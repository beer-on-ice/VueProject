<template>
  <div>
    <div class="hint" v-if="!badge">这儿一片荒芜,快去关注喜欢的作者吧~</div>
    <div>
      <el-tabs class="fixedTop" v-model="name" v-if="follow[0]" type="card" closable @tab-remove="_remove" @tab-click="_tabClick">
        <el-tab-pane :key="item.name" v-for="(item, index) in follow" :label="item.name" :name="item.itemId.toString()">
        </el-tab-pane>
      </el-tabs>
      <div class="conWrapper" v-scroll="_currentChange">
        <card :datas="lastList"></card>
        <load-more v-show="isLoadMore" @currentChange="_currentChange"></load-more>
      </div>
    </div>
  </div>
</template>

<script>
import { apiFollow, apiAuthorVideoList } from '@/assets/api/getDatas'
import { mapState, mapGetters, mapMutations } from 'vuex'
import card from './card'
import loadMore from './loadMore'
export default {
  name: 'selected',
  components: {
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
      name: '',
      isLoadMore: false
    }
  },
  computed: {
    ...mapState([
      'follow'
    ]),
    ...mapGetters([
      'badge'
    ])
  },
  methods: {
    ...mapMutations([
      'setFeedFollowed',
      'removeFollowed',
      'setLoading'
    ]),
    _into(start, count, id) {
      apiAuthorVideoList(start, count, id).then(res => {
        if (start == 0) {
          this.lastList = res.itemList
        } else {
          this.newList = res.itemList
          this.lastList = this.lastList.concat(this.newList)
        }
        this.isLoadMore = res.nextPageUrl ? true : false
      })
    },
    _tabClick(tab) {
      this.lastList = []
      this.n = this.start = 0
      this.id = parseInt(tab.name)
      this._into(this.start, this.count, this.id)
    },
    _remove(targetName) {
      this.setFeedFollowed({ 'itemId': targetName, "followed": !false })
      this.removeFollowed(targetName)
      if (this.follow[0]) {
        if (targetName == this.id) {
          this._into(this.start, this.count, this.follow[0].itemId)
          this.name = this.follow[0].itemId.toString()
        }
      } else {
        this.lastList = []
        this.isLoadMore = false
      }
    },
    _currentChange() {
      if (this.isLoadMore) {
        this.newList = []
        this.n++
        this.start = this.n * this.count
        this.isLoadMore = false
      }
    },
    _badgeChange() {
      if (this.badge) {
        if (!this.lastList.length) {
          this._into(this.start, this.count, this.follow[0].itemId)
          this.name = this.follow[0].itemId.toString()
        }
        this.id = this.follow[0].itemId
      } else {
        this.lastList = []
        this.isLoadMore = false
      }
    }
  },

  watch: {
    start() {
      this._into(this.start, this.count, this.id)
    },
    badge() {
      this._badgeChange()
    },
  },
  created() {
    this._badgeChange()
  }

}
</script>

<style scoped>

</style>
