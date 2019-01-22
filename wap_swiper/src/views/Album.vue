<template lang="html">
  <div class="albumwrap" :style="pageClass">
    <div id="album">
      <div class="topbanner">
          <img :src="topimg" />
          <span class="back_btn">返回封面</span>
          <div class="title_block">
            <div>拍立享小程序“我是摄影狮”上线，摄影师安卓手机下载照片直播APP</div>
          </div>
      </div>
      <div class="album_info">
        <div class="photoinfo"><span>照片 1035</span><span>访问 75458</span></div>
        <div class="group">
          <span class="se">全部照片</span>
          <span>热门</span>
        </div>
        <div class="imglist">
          <div class="one_row" :style="stylesRow" @click="show">
            <div class="imgsrc"></div>
            <span class="mark">1</span>
            <div class="inter_mark">
              <img src="http://www.pailixiang.com/Themes/mbo/images/like-has.png" />5
            </div>
          </div>
          <div class="one_row" :style="stylesRow">
            <div class="imgsrc"></div>
            <span class="mark">2</span>
            <div class="inter_mark">
              <img src="http://www.pailixiang.com/Themes/mbo/images/like-has.png" />5
            </div>
          </div><div class="one_row" :style="stylesRow">
            <div class="imgsrc"></div>
            <span class="mark">3</span>
            <div class="inter_mark">
              <img src="http://www.pailixiang.com/Themes/mbo/images/like-has.png" />5
            </div>
          </div>
          <div class="third_row">
            <div class="imgdiv" :style="styles">
              <div class="imgsrc"></div>
            </div>
            <div class="imgdiv"  :style="styles">
              <div class="imgsrc"></div>
            </div>
            <div class="imgdiv"  :style="styles">
              <div class="imgsrc"></div>
            </div>
            <div class="imgdiv"  :style="styles">
              <div class="imgsrc"></div>
            </div>
            <div class="imgdiv"  :style="styles">
              <div class="imgsrc"></div>
            </div>
          </div>
        </div>
      </div>
      <show v-if="picShowFlag" @closeShow="close"></show>
    </div>
  </div>
</template>

<script>
import Show from 'views/Show'
export default {
  data () {
    return {
      topimg:
        'https://cache2.vphotos.cn/bkwft01/upload/photoAlbum/paster/4362571b50164948b7659f3e80d5983e.jpeg',
      styles: `width: ${(window.innerWidth - 50) /
        3}px;height:${(window.innerWidth - 50) / 3}px`,
      stylesRow: `width: ${window.innerWidth - 40}px;height:200px`,
      picShowFlag: false,
      test: 'hidden'
    }
  },
  computed: {
    pageClass () {
      return this.picShowFlag ? 'overflow:hidden' : 'overflow: auto'
    }
  },
  methods: {
    show () {
      this.picShowFlag = true
    },
    close () {
      this.picShowFlag = false
    }
  },
  components: {
    Show
  }
}
</script>

<style>
.albumwrap {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.topbanner {
  position: relative;
}
.topbanner img {
  display: block;
  width: 100%;
  height: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  z-index: -1;
  min-height: 160px;
}
.topbanner .back_btn {
  position: absolute;
  right: 10px;
  top: 10px;
  width: 64px;
  height: 30px;
  border-radius: 20px;
  display: flex;
  color: #fff;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.8);
  font-size: 12px;
}
.topbanner .title_block {
  padding: 150px 20px 0;
}
.topbanner .title_block > div {
  background: #fff;
  border-radius: 4px;
  padding: 20px;
  font-weight: bold;
  line-height: 24px;
  font-size: 17px;
  box-shadow: -2px 10px 10px rgba(0, 0, 0, 0.15);
}
.album_info {
  padding: 20px;
  background: #fff;
}
.album_info .photoinfo {
  padding-bottom: 20px;
  border-bottom: 1px solid #eee;
}
.album_info .photoinfo span {
  margin-right: 20px;
  font-size: 12px;
}
.album_info .group {
  padding: 20px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
}
.album_info .group span {
  font-size: 14px;
  color: #666;
  margin-right: 20px;
}
.album_info .group span.se {
  font-size: 16px;
  color: #000;
  font-weight: bold;
}
.album_info .group span:last-child {
  margin-right: 0;
}
.imglist {
  height: auto;
}
.imglist .one_row {
  margin-bottom: 5px;
  position: relative;
}
.imglist .one_row .mark {
  position: absolute;
  left: 0;
  top: 0;
  width: 40px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffc708;
  color: #fff;
  font-size: 17px;
}
.imglist .one_row .inter_mark {
  position: absolute;
  left: 10px;
  bottom: 10px;
  padding: 0 10px;
  height: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.imglist .one_row .inter_mark img {
  width: 12px;
  height: 12px;
  margin-right: 5px;
}
.imglist .third_row .imgdiv {
  display: inline-block;
  margin-right: 5px;
  margin-bottom: 5px;
}
.imglist .imgsrc {
  width: 100%;
  height: 100%;
  background: url(https://cache2.vphotos.cn/bkwft01/upload/photoAlbum/paster/4362571b50164948b7659f3e80d5983e.jpeg)
    no-repeat;
  background-size: cover;
}
.imglist .third_row .imgdiv:nth-of-type(3n) {
  margin-right: 0;
}
</style>
