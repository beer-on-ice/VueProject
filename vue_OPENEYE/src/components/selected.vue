<template>
  <div>
    <div class="slide clearfix">
      <transition-group tag="div" class="carouselWrap" ref="carouselWrap" name='image' @click="_change">
        <div class="carousel" :class="{active:index==active}" v-show='index==active' v-for="(item,index) in newList" :key="item">
          <div class="cover" @click='_play(item.data)'>
            <h3 class="title" v-html="titleDate1"></h3>
            <img :src='item.data.cover.feed'>
            <h4>{{item.data.title}}</h4>
            <p>{{item.data.slogan}}</p>
          </div>
        </div>
      </transition-group>
      <div class="indicator">
        <div class="mask" v-for="(item,index) in newList" :key="item">
          <img class="blur" v-show="index == active" :src="item.data.cover.blurred">
          <div v-if="index == active" class="upside"></div>
        </div>
        <div class="txtList" :class="{five:newList.length==5}">
          <div v-for="(item,index) in newList" @click="_change(index)" :key="item">
            <p :class="{active:index == active}" class="text ellipsis">{{item.data.title}} </p>
            <span class="ellipsis">{{item.data.slogan}}</span>
          </div>
        </div>
      </div>
    </div>
    <transition-group tag="div" name="list">
      <div class="list" v-if="lastList.length" key="indexlist">
        <h3 class="title" v-html="titleDate2"></h3>
        <el-card class="card" :class="{six:lastList.length==6}" :body-style="{ padding: '0px'}" v-for="(item,index) in lastList" :key="item">
          <div @click='_play(item.data)' @mouseenter="_mouseEnter(item,index)" @mouseleave="_mouseOut">
            <div :class="{six:lastList.length==6}" class="image">
              <video v-if="index===num" :class="{six:lastList.length==6}" class="video" autoplay muted="muted" :src="src"></video>
              <img v-else :src="item.data.cover.detail">
            </div>
            <div style="padding: 8px;">
              <p :class="{six:lastList.length==6}" class="txt ellipsis">{{item.data.title}}</p>
              <div class="bottom clearfix">
                <span class="time">{{_duration(item.data.duration)}}</span>
                <span class="button">{{item.data.category}}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>
    </transition-group>
  </div>
</template>
<script>
import { apiSelected, apiPrevPage } from '@/assets/api/getDatas'
import { add2Zero, getDate } from '@/assets/js/calc'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'index',
  props: {
    newList: {
      type: Array,
      default: []
    },
    lastList: {
      type: Array,
      default: []
    },
    titleDate1: {
      type: String,
      default: ""
    },
    titleDate2: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      active: 0,
      num: -1,
      src: '',
      timer: null,
      autoTimer: null,
      interval: 4000,
      newListLength: 0,
    }
  },
  methods: {
    ...mapMutations([
      'setVideoInfo',
      'setTap',
    ]),
    _change(n) {
      this.active = n
      clearInterval(this.autoTimer)
    },
    _autoPlay() {
      clearInterval(this.autoTimer)
      this.autoTimer = setInterval(() => {
        this.active++
        this.active = this.active % this.newList.length
      }, this.interval)
    },
    _play(item) {
      let id = item.id
      let title = item.title
      let src = item.playUrl
      let cover = item.cover.detail
      this.setVideoInfo({ id, title, src, cover })
      this.setTap(true)
      clearTimeout(this.timer)
    },
    _mouseEnter(item, index) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.num = index
        this.src = item.data.playUrl
      }, 1000)
    },
    _mouseOut() {
      clearTimeout(this.timer)
      this.num = -1
    },
    _duration(v) {
      return add2Zero(v)
    },
  },
  watch: {
    newList() {
      this.active = 0
    }
  },
  mounted() {
    this.$nextTick(() => {
      this._autoPlay()
    })

  }
}
</script>

<style scoped>
.image-enter-active,
.image-leave-active {
  transition: opacity .5s
}

.image-enter,
.image-leave-to {
  opacity: 0
}

.slide {
  height: 370px;
  overflow: hidden;
}


.carouselWrap {
  position: relative;
  float: left;
  width: 780px;
  height: 370px;
  z-index: 0;
}

.carousel {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: inline-block;
  overflow: hidden;
  z-index: 0;
}

.active {
  z-index: 1;
}

.carousel .cover {
  position: relative;
  color: #fff;
  text-align: center;
  width: 780px;
  height: 370px;
  overflow: hidden;
}

.cover>.title {
  position: absolute;
  left: 0px;
  top: 0px
}

.carousel .cover img {
  width: 100%;
}

.carousel .cover h4,
.carousel .cover p {
  position: absolute;
  bottom: 18%;
  left: calc( 50% - 200px);
  width: 400px;
  font-size: 16px;
  text-shadow: 1px 1px 1px rgba(0, 0, 0, .6)
}

.carousel .cover p {
  bottom: 10%;
  font-size: 12px;
}

.indicator {
  position: relative;
  float: right;
  width: 215px;
  height: 370px;
  overflow: hidden;
  z-index: 2;
}

.mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 185px;
  height: 60px;
}

.mask .upside {
  position: absolute;
  top: 0;
  left: 0;
  width: 215px;
  height: 370px;
  background: rgba(0, 0, 0, 0.4);
}

.mask .blur {
  position: absolute;
  left: -50px;
  top: -50px;
  height: 500px;
}

.five {
  margin-top: 29px;
}

.txtList {
  position: absolute;
  top: 0;
  left: 0;
  width: 180px;
  height: auto;
  padding: 20px 0 20px 20px;
  cursor: pointer;
  text-shadow: 1px 1px rgba(0, 0, 0, .2)
}

.txtList>div:nth-child(1)>p:nth-child(1) {
  margin-top: 1px;
}

.txtList .text {
  margin-top: 15px;
  font-size: 14px;
  color: #f1f1f1;
}

.txtList span {
  padding-top: 1px;
  font-size: 12px;
  line-height: 20px;
  display: block;
  color: #eeeeee;
}

.txtList .active {
  color: #FF920B;
  font-size: 20px;
}

.list {
  width: 100%;
  height: 220px;
  overflow: hidden;
}

.title {
  padding-left: 20px;
  line-height: 50px;
  height: 50px;
  color: #fff;
  font-family: 'Lobster'
}

.card:hover {
  transition: ease-out .2s;
  transform: scale3d(1.05, 1.05, 1.05) translateY(-10px)
}

.card {
  position: relative;
  width: 175px;
  height: 170px;
  margin-left: 20px;
  overflow: hidden;
  float: left;
}

.card.six {
  width: 151px;
  margin-left: 12px;
}

.image {
  height: 100px;
  overflow: hidden;
}

.image.six {
  height: 87px;
}

.image img {
  width: 100%;
  display: block;
}

.icon {
  width: 30px;
  border-radius: 50%;
  vertical-align: top;
}

.txt {
  font-size: 14px;
  height: 30px;
  width: 160px;
}

.txt.six {
  width: 130px;
}

.button,
.time {
  line-height: 24px;
  font-size: 13px;
  color: #999;
}

.button {
  float: right;
}

.video {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 175px;
  height: 100px;
}

.video.six {
  width: 151px;
  height: 87px;
}

.desc {
  line-height: 16px;
  padding-left: 10px;
  display: inline-block;
}

.desc .author {
  font-size: 14px
}
</style>
