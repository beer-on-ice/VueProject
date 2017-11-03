<template>
  <div class="container" v-loading='!titleDate1'>
    <searchBar :tap="true"></searchBar>
    <selected key="indexlist" :newList="newList" :lastList="lastList" :titleDate1="titleDate1" :titleDate2="titleDate2"></selected>
    <div class="btn">
      <span v-show="pagesCount" @click="_getNextList">
        <i class="el-icon-my-next">
        </i>
      </span>
      <span @click="_getPrevList">
        <i class="el-icon-my-prev">
        </i>
      </span>
    </div>
  </div>
</template>

<script>
import { apiSelected, apiPrevPage } from '@/assets/api/getDatas'
import { add2Zero, getTitleDate } from '@/assets/js/calc'
import { mapGetters, mapState, mapMutations } from 'vuex'
import searchBar from './searchBar'
import selected from './selected'
export default {
  name: 'index',
  components: {
    searchBar,
    selected
  },
  data() {
    return {
      newList: [],
      lastList: [],
      titleDate1: "",
      titleDate2: '',
      toDate: null,
      oneDay: 172800000,
      nextPageUrlID: null,
      pages: [],
      pagesCount: 0,
    }
  },
  computed: {
    ...mapGetters([
      'badge'
    ]),
  },
  methods: {
    ...mapMutations([
      'setBgSrc'
    ]),
    getdatelist(res) {
      this.toDate = res.date
      this.nextPageUrlID = this.toDate - this.oneDay
      this.titleDate1 = getTitleDate(this.toDate)
      this.newList = res.itemList.filter(obj => {
        return obj.type == 'video' && obj.tag == '0'
      })
      this.lastList = res.itemList.filter(obj => {
        return obj.type == 'video' && obj.tag == '1'
      })
      if (this.newList.length > 6 || this.lastList.length > 6) {
        this.newList = this.newList.splice(0, 6)
        this.lastList = this.lastList.splice(0, 6)
      }
      res.itemList.forEach(el => {
        if (el.type == "textHeader") {
          this.titleDate2 = el.data.text.split('-').join('').split(',')[0]
        }
      })
      this.setBgSrc(this.newList[0].data.cover.blurred)
    },
    _getList() {
      apiSelected().then(res => {
        this.getdatelist(res)
        this.pages.push(this.toDate)
      })
    },
    _getPrevList() {
      this.active = 0
      this.lastList = []
      apiPrevPage(this.nextPageUrlID).then(res => {
        this.getdatelist(res)
        this.pages.push(this.toDate)
        this.pagesCount++
      })
    },
    _getNextList() {
      if (this.pagesCount > 0) {
        this.active = 0
        this.lastList = []
        this.pagesCount--
        apiPrevPage(this.pages[this.pagesCount]).then(res => {
          this.getdatelist(res)
        })
      }
    },
  },
  created() {
    this._getList();
  }
}
</script>

<style scoped>
.btn {
  position: absolute;
  bottom: 0px;
  left: 10px;
  width: 995px;
  height: 50px;
}

.btn>span {
  display: inline-block;
  width: 40px;
  height: 40px;
  line-height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, .9);
  text-align: center;
  margin-left: 10px;
}

.btn>span:hover {
  color: #FF920B;
}
</style>
