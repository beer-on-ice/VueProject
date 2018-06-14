<template>
  <div class="slide clearfix">
    <transition-group tag="div" class="carouselWrap" ref="carouselWrap" name='image' @click="_change">
      <div class="carousel" :class="{active:index==active}" v-show='index==active' v-for="(item,index) in newList" :key="index">
        <div class="cover" @click='_play(item.data.playUrl,item.data.id)'>
          <h3 class="title" v-html="titleDate1"></h3>
          <img :src='item.data.cover.feed'>
          <h4>{{item.data.title}}</h4>
          <p>{{item.data.slogan}}</p>
        </div>
      </div>
    </transition-group>
    <div class="indicator">
      <div class="mask" v-for="(item,index) in newList" :key="index">
        <img class="blur" v-show="index == active" :src="item.data.cover.blurred">
        <div v-if="index == active" class="upside"></div>
      </div>
      <div class="txtList" :class="{five:newList.length==5}">
        <div v-for="(item,index) in newList" @click="_change(index)" :key="index">
          <p :class="{active:index == active}" class="text ellipsis">{{item.data.title}} </p>
          <span class="ellipsis">{{item.data.slogan}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { apiSelected, apiPrevPage } from '@/assets/api/getDatas'
import { add2Zero, getDate } from '@/assets/js/calc'
import { mapGetters, mapState, mapMutations } from 'vuex'
export default {
  name: 'index',
  data() {
    return {
      newList: [],
      lastList: [],
      titleDate1: "",
      titleDate2: '',
      toDate: null,
      oneDay: 172800000,
      nextPageUrlID: null,
      num: -1,
      src: '',
      timer: null,
      active: 0,
      autoTimer: null,
      interval: 4000,
      newListLength: null,
      pages: [],
      pagesCount: 0,
    }
  },
  methods: {
    ...mapMutations([
      'setVideoSrc',
      'setTap',
      'setVideoId'
    ]),

    _change(n) {
      this.active = n
      clearTimeout(this.autoTimer)
    },
    _autoPlay() {
      this.autoTimer = setTimeout(() => {
        this.active++
        this.active = this.active % this.newListLength
      }, this.interval)
    },
    _play(url, id) {
      this.setVideoSrc(url)
      this.setVideoId(id)
      this.setTap(true)
      clearTimeout(this.timer)
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
    active() {
      this._autoPlay()
    },
  },
  mounted() {
    this._autoPlay()
  },

  created() {
    this._getList();
  }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transform: translateY(0);
  transition: all .5s ease;
}

.list-enter {
  transition: .1s;
  transform: translateY(-100%);
}

.list-leave {
  transform: translateY(100%);
}

.image-enter-active,
.image-leave-active {
  transition: opacity .5s
}

.image-enter,
.image-leave-to {
  opacity: 0
}

.wrap {
  position: absolute;
  top: 55px;
  left: 0;
}

.container {
  padding: 0;
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
  width: 172px;
}

.video.six {
  width: 150px;
}

.desc {
  line-height: 16px;
  padding-left: 10px;
  display: inline-block;
}

.desc .author {
  font-size: 14px
}

.btn {
  position: absolute;
  bottom: 10px;
  left: 10px;
}

.el-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
</style>
