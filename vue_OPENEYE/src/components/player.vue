<template>
  <div class="play" v-if="closed">
    <div class="playVideo" @mousemove="_show" @mouseleave="_hidden" ref="playVideo" :style="styleObject">
      <video :src="videoSrc" ref="video" @canplay='_play' @dblclick="_fullscreen" @click="_play" @timeupdate='_timeupdate' :style="styleObject"></video>
      <transition tag="div" name="slide" class="clearfix">
        <div v-if="tap" class="playerMenu" key="a">
          <span @click='_collect'>
            <i class="el-icon-my-sand"></i> {{collectState}}</span>
          <span @click='_closed'>
            <i class="el-icon-my-leave"></i>
            关闭</span>
        </div>
      </transition>
      <transition tag="div" name="controlsWrap" class="clearfix">
        <div v-show="tap" class="controls" key="b">
          <div class="progressWarp" ref="progressWarp" @mousedown="_progress">
            <div class="progressBar" ref="progressBar" :style="{width: currentTimePWitdh }">
              <span class="circle" v-drag="_drag"></span>
            </div>
            <div class="bufferBar" :style="{width: bufferedPWitdh }"></div>
          </div>
          <div class="controlsMenu clearfix">
            <span :class="playIcon" @click="_play"></span>
            <div class="time">
              <span v-html="_currentTime"></span> /
              <span v-html="_duration"></span>
            </div>
            <div class="adjust">
              <span :class="volumeIcon" @click="_volumeShow"></span>
              <span v-html="selectedPlaybackRate" @click="_playbackRateShow"></span>
              <span class="el-icon-my-stop" @click="_fullscreen"></span>
            </div>
          </div>
          <div class="volume" v-show="volumeShow">
            <div class="volumeProgress" @mousedown.stop="_volume">
              <div class="volumeProgressbar" ref="volumeProgressbar">
                <span class="circle" v-drag='_volume'></span>
              </div>
            </div>
            <span :class="volumeIcon"></span>
          </div>
          <div class="playbackRate" v-show="playbackRateShow">
            <span v-for="el in playbackRate" :key="el" @click="_playbackRate(el)">{{el}}</span>
          </div>
        </div>
      </transition>
    </div>
    <vdeoDetail></vdeoDetail>
  </div>
</template>

<script>
import Vue from 'vue'
Vue.directive('drag', {
  inserted: function(el, binding) {
    el.onmousedown = function() {
      document.onmousemove = function(event) {
        binding.value()
      }
      document.onmouseup = function() {
        document.onmousemove = null
        document.onmouseup = null
      }
      return false
    }
  }
})
import { mapGetters, mapState, mapMutations } from 'vuex'
import { add2Zero } from '@/assets/js/calc'
import vdeoDetail from './vdeoDetail'
export default {
  name: 'play',
  components: {
    vdeoDetail
  },
  data() {
    return {
      tap: false,
      musicPlaying: true,
      muted: false,
      timer: null,
      duration: 0,
      buffered: 0,
      currentTime: 0,
      fullscreen: true,
      volume: 0.9, //真实音量为0.1
      playbackRate: ['0.5', '1.0', '1.5', '2.0'],
      selectedPlaybackRate: '1.0',
      volumeShow: false,
      playbackRateShow: false,
      defualtHeight: 630,
      defualtWeight: 1120,
      defualMargin: 0,
      collected: false
    }
  },
  mounted() {
    ;(document.onkeyup = () => {
      if (this.closed && event.keyCode == 32) {
        this._play()
      }
    }),
      (document.onwebkitfullscreenchange = e => {
        if (!e.currentTarget.webkitIsFullScreen) {
          this.defualtHeight = 630
          this.defualtWeight = 1120
          this.defualMargin = 0
          this.fullscreen = true
        }
      })
  },
  computed: {
    ...mapState([
      'closed',
      'videoSrc',
      'videoId',
      'videoTitle',
      'videoCover',
      'collect'
    ]),
    bufferedPWitdh() {
      return 100 * this.buffered / this.duration + '%'
    },
    currentTimePWitdh() {
      return 100 * this.currentTime / this.duration + '%'
    },
    _duration() {
      return add2Zero(Math.floor(this.duration))
    },
    _currentTime() {
      return add2Zero(Math.floor(this.currentTime))
    },
    playIcon() {
      return this.musicPlaying ? 'el-icon-my-play' : 'el-icon-my-pause'
    },
    volumeIcon() {
      return this.muted ? 'el-icon-my-soundminus' : 'el-icon-my-soundplus'
    },
    collectState() {
      return this.collected ? '已收藏' : '收藏'
    },
    styleObject() {
      return {
        width: this.defualtWeight + 'px',
        height: this.defualtHeight + 'px',
        'margin-top': this.defualMargin + 'px'
      }
    }
  },
  watch: {
    videoSrc() {
      if (this.closed) {
        setTimeout(() => {
          this._setVolume()
        }, 20)
      }
      this.selectedPlaybackRate = '1.0'
      this._getCollectState()
    }
  },
  methods: {
    ...mapMutations(['setTap', 'setCollect', 'removeCollect']),
    _collect() {
      let time = new Date().toLocaleString()
      let id = this.videoId
      let title = this.videoTitle
      let src = this.videoSrc
      let cover = this.videoCover
      if (!this.collected) {
        this.setCollect({ id, title, src, cover, time })
        this.collected = true
      } else {
        this.removeCollect(id)
        this.collected = false
      }
    },
    _getCollectState() {
      this.collect.forEach(el => {
        if (this.videoId == el.id) {
          this.collected = true
          console.log(this.videoId)
          return
        } else {
          this.collected = false
        }
      })
    },
    _closed() {
      this.setTap(false)
    },
    _show() {
      clearTimeout(this.timer)
      this.tap = true
      this.timer = setTimeout(() => {
        this.tap = this.volumeShow = this.playbackRateShow = false
      }, 5000)
    },
    _hidden() {
      this.tap = this.volumeShow = this.playbackRateShow = false
    },
    _play() {
      if (this.$refs.video.paused) {
        this.$refs.video.play()
        this.musicPlaying = false
      } else {
        this.$refs.video.pause()
        this.musicPlaying = true
      }
    },
    _timeupdate() {
      if (this.closed) {
        this.duration = this.$refs.video.duration
        this.currentTime = this.$refs.video.currentTime
        if (this.$refs.video.buffered.length != 0) {
          this.buffered = this.$refs.video.buffered.end(0)
        }
      }
    },
    _progress() {
      let x = event.clientX - document.body.firstElementChild.offsetLeft
      this.$refs.progressBar.style.width = x + 'px'
      this.$refs.video.currentTime =
        x / this.$refs.progressWarp.clientWidth * this.duration
    },
    _drag() {
      //TODO: 拖动有bug 待修复
      let x = event.clientX - document.body.firstElementChild.offsetLeft
      this.$refs.progressBar.style.width = x + 'px'
      let w = x / this.$refs.progressWarp.clientWidth
      this.$refs.video.currentTime = w * this.duration
      // this._timeupdate()
    },
    _volumeShow() {
      this.playbackRateShow = false
      this.volumeShow = !this.volumeShow
    },
    _volume() {
      if (event.target.tagName == 'DIV') {
        this.volume =
          event.offsetY / this.$refs.volumeProgressbar.parentNode.offsetHeight
        this.volume = this.volume >= 1 ? 1 : this.volume
        this.$refs.volumeProgressbar.style.height = this.volume * 100 + '%'
        this.$refs.video.volume = 1 - this.volume.toFixed(1)
        this.muted = this.$refs.video.volume == 0 ? true : false
      }
    },
    _setVolume() {
      this.$refs.video.volume = 1 - this.volume.toFixed(1)
      this.$refs.volumeProgressbar.style.height = this.volume * 100 + '%'
    },
    _fullscreen() {
      if (this.fullscreen) {
        this.defualtHeight = window.innerHeight
        this.defualtWeight = window.innerWidth
        this.defualMargin = 55
        this.$refs.playVideo.webkitRequestFullscreen()
        this.fullscreen = false
      } else {
        this.defualtHeight = 630
        this.defualtWeight = 1120
        this.defualMargin = 0
        this.fullscreen = true
        document.webkitCancelFullScreen()
      }
    },
    _playbackRateShow() {
      this.volumeShow = false
      this.playbackRateShow = !this.playbackRateShow
    },
    _playbackRate(v) {
      this.$refs.video.playbackRate = v
      this.selectedPlaybackRate = v
      this.playbackRateShow = false
    }
  }
}
</script>

<style scoped>
.play {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 999;
  width: 1120px;
  height: 720px;
  margin: 80 auto;
  background: #252525;
  overflow: hidden;
}

.playVideo {
  position: absolute;
  left: 0px;
  top: 0px;
  height: 630px;
  overflow: hidden;
  background: #000;
}

.playVideo > video {
  width: 1120px;
  height: 630px;
}

.slide-enter-active {
  transform: translateY(0);
  transition: all 0.4s linear;
}

.slide-enter {
  transition: 0.1s;
  transform: translateY(-100%);
}

.slide-leave {
  transform: translateY(0);
}

.controlsWrap-enter-active {
  transform: translateY(0);
  transition: all 0.4s linear;
}

.controlsWrap-enter {
  transition: 0.1s;
  transform: translateY(100%);
}

.controlsWrap-leave {
  transform: translateY(0);
}

.controls {
  position: relative;
}

.playVideo .playerMenu,
.playVideo .controls {
  position: absolute;
  left: 0px;
  font-size: 14px;
  line-height: 30px;
  color: #fff;
  width: 100%;
  height: 50px;
  background: rgba(0, 0, 0, 0.4);
}

.playVideo .playerMenu {
  top: 0px;
}

.adjust > span:hover,
.controlsMenu > span:hover,
.playerMenu > span:hover,
.playbackRate > span:hover {
  color: #ff920b;
  cursor: pointer;
}

.playerMenu > span {
  position: absolute;
  top: 10px;
  right: 10px;
  height: 30px;
}

.playerMenu > span:nth-of-type(1) {
  right: 80px;
}

.playVideo .controls {
  bottom: 0px;
  height: 60px;
  font-size: 16px;
  line-height: 40px;
}

.progressWarp {
  position: relative;
  width: 100%;
  height: 6px;
  background: rgba(255, 255, 255, 0.4);
  margin-bottom: 10px;
}

.progressBar,
.bufferBar {
  position: absolute;
  top: 0;
  left: 0;
  height: 6px;
  background: #ff920b;
  z-index: 2;
}

.progressBar .circle {
  position: absolute;
  top: -4px;
  right: -1px;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #ff920b;
  opacity: 0.9;
}

.bufferBar {
  z-index: 1;
  background: rgba(255, 255, 255, 0.8);
}

.controlsMenu > span {
  margin-left: 20px;
  cursor: pointer;
}

.time {
  display: inline-block;
  width: 200px;
  margin-left: 20px;
}

.adjust {
  float: right;
  margin-right: 20px;
}

.adjust > span {
  margin: 0 10px;
  width: 20px;
  cursor: pointer;
}

.volume,
.playbackRate {
  position: absolute;
  top: -170px;
  right: 105px;
  width: 50px;
  height: 160px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
}

.volumeProgress {
  margin: 10px 22px 0;
  width: 6px;
  height: 120px;
  background: #ff920b;
  border-radius: 5px;
}

.volumeProgressbar {
  position: relative;
  width: 6px;
  background: #fff;
  border-radius: 5px;
}

.volumeProgressbar .circle {
  position: absolute;
  bottom: -6px;
  right: -3px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #fff;
  opacity: 0.9;
}

.volume > span {
  margin: 10px 0 0 20px;
  vertical-align: top;
  font-size: 14px;
}

.playbackRate {
  right: 60px;
}

.playbackRate > span {
  font-size: 18px;
  display: block;
  margin-left: 10px;
  width: 40px;
}

.el-icon-my-leave {
  vertical-align: text-top;
}

.vdeoDetail {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 80px;
  padding-top: 10px;
}
</style>
