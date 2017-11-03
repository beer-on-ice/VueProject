<template>
  <div class="vdeoDetail clearfix">
    <transition-group tag="div" name="list" mode="out-in" class="recom">
      <div v-if='tempId.length' key="listTempId">
        <div @click="_play(item.data)" class="detail" v-for="(item,index) in list" :key="index">
          <div class="cover">
            <img v-lazy='item.data.cover.detail'>
          </div>
          <div class="intro">
            <img v-if="item.data.author" class="icon" v-lazy="item.data.author.icon">
            <p v-if="item.data.author" class="author ellipsis">{{item.data.author.name}}</p>
            <p class="title ellipsis" v-html="item.data.title"></p>
          </div>
        </div>
      </div>
    </transition-group>
    <div class="title clearfix" v-if="tempId.length">
      <h3 class="text" v-if="headerText" v-html="headerText"></h3>
      <span class="random" @click="_random">
        <i class="el-icon-my-copy"></i>
        更多
      </span>
    </div>
  </div>
</template>

<script>
import { apiVdeoDetail } from '@/assets/api/getDatas'
import { mapState, mapMutations } from 'vuex'
export default {
  name: 'vdeoDetail',
  data() {
    return {
      tap: false,
      timer: null,
      list: [],
      headerText: null,
      tempId: []
    }
  },
  computed: {
    ...mapState(['videoId'])
  },
  methods: {
    ...mapMutations(['setVideoInfo']),
    _show(id) {
      this.tempId = []
      apiVdeoDetail(id).then(res => {
        res.itemList = res.itemList.splice(0, 6)
        res.itemList.forEach(el => {
          if (el.type == 'textCard') {
            this.headerText = el.data.text
          } else {
            this.tempId.push(el.data.id)
          }
        })
        this.list = res.itemList.filter(el => {
          return el.type == 'videoSmallCard'
        })
      })
    },
    _play(item) {
      let id = item.id
      let title = item.title
      let src = item.playUrl
      let cover = item.cover.detail
      this.setVideoInfo({ id, title, src, cover })
    },
    _random() {
      let n = this.tempId[parseInt(Math.random() * 5)]
      this._show(n)
    }
  },
  created() {
    if (this.videoId) {
      this._show(this.videoId)
    }
  }
}
</script>

<style scoped>
.vdeoDetail > .title {
  position: absolute;
  right: 0;
  top: 0;
  width: 130px;
  color: #f1f1f1;
  overflow: hidden;
  vertical-align: top;
}

.recom {
  display: inline-block;
}

.text {
  font-size: 16px;
  line-height: 30px;
  margin: 10px 0;
}

.random {
  display: inline-block;
  font-size: 14px;
  line-height: 26px;
  cursor: pointer;
  border-radius: 4px;
}

.random:hover {
  color: #ff920b;
}

.detail:hover {
  transition: ease-out 0.2s;
  transform: scale3d(1.05, 1.05, 1.05) translateY(-10px);
}

.detail {
  position: relative;
  width: 180px;
  height: 70px;
  margin: 0 8px;
  display: inline-block;
  vertical-align: top;
  text-align: left;
}

.cover {
  display: block;
  width: 180px;
  height: 70px;
  overflow: hidden;
  border-radius: 4px;
}

.cover > img {
  display: block;
  width: 100%;
}

.intro {
  position: absolute;
  left: 0;
  top: 0;
  width: 180px;
  height: 70px;
  font-size: 14px;
  background: rgba(0, 0, 0, 0.4);
  padding: 8px 10px;
  box-sizing: border-box;
  border-radius: 4px;
}

.icon {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.author {
  width: 120px;
  line-height: 30px;
  padding-left: 5px;
  display: inline-block;
  color: #f1f1f1;
}

.intro > .title {
  font-size: 16px;
  width: 100%;
  height: 20px;
  color: #fff;
}
</style>
