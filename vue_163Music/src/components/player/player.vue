<template lang="pug">
.player(v-show="playlist.length>0")
  transition(name="normal" @enter="enter" @after-enter="afterEnter" @leave="leave" @after-leave="afterLeave")
    .normal-player(v-show="fullScreen")
      .background
        img(width="100%" height="100%" :src="currentSong.cover")
      .top
        .back(@click="back")
          i.icon-back
        h1.title(v-html="currentSong.name")
        h2.subtitle(v-html="currentSong.singer")
      .middle(@touchstart.prevent="middleTouchStart" @touchmove.prevent="middleTouchMove" @touchend="middleTouchEnd")
        .middle-l(ref="middleL")
          .cd-wrapper(ref='cdWrapper')
            .cd(:class="cdCls")
              img.image(:src="currentSong.cover||currentCover")
          .playing-lyric-wrapper
            .playing-lyric {{playingLyric}}
        Scroll.middle-r(ref="lyricList" :data='currentLyric &&currentLyric.lines')
          .lyric-wrapper
            div(v-if="currentLyric")
              p.text(:class="{'current': currentLineNum === index}" ref="lyricLine" v-for="(line,index) in currentLyric.lines") {{line.txt}}
      .bottom
        .dot-wrapper
          span.dot(:class="{'active':currentShow==='cd'}")
          span.dot(:class="{'active':currentShow==='lyric'}")
        .progress-wrapper
          span.time.time-l {{_format(currentTime,false)}}
          .progress-bar-wrapper
            progress-bar(:percent="percent" @percentChange="onProgressDragChange")
          span.time.time-r {{_format(currentSong.duration,true)}}
        .operators
          .icon.i-left(@click="changeMode")
            i(:class="iconMode")
          .icon.i-left(:class="disableCls")
            i.icon-prev(@click="prev")
          .icon.i-center(:class="disableCls")
            i(@click="togglePlaying" :class="playIcon")
          .icon.i-right(:class="disableCls")
            i.icon-next(@click="next")
          .icon.i-right
            i.icon(:class="getFavoriteIcon(currentSong)" @click="toggleFavorite(currentSong)")
  transition(name="mini")
    .mini-player(v-show="!fullScreen" @click="open")
      .icon
        img(width="40" height="40" :src="currentSong.cover||currentCover" :class="cdCls")
      .text
        h2.name(v-html="currentSong.name")
        p.desc(v-html="currentSong.singer")
      .control
        progress-circle(:radius="radius" :percent="percent")
          i.icon-mini(:class="miniPlayIcon" @click.stop="togglePlaying")
      .control(@click.stop="showPlaylist")
        i.icon-playlist
  playlist(ref="playlist")
  audio(:src="currentSongUrl" ref="audio" @play="ready" @error="error" @timeupdate="updateTime" @ended="end")
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex'
import {playMode} from 'assets/js/config'
import animations from 'create-keyframe-animation'
import {prefixStyle} from 'assets/js/dom'
import ProgressBar from 'base/progress-bar/progress-bar'
import ProgressCircle from 'base/progress-circle/progress-circle'
import Lyric from 'assets/js/lyric.js'
import Scroll from 'base/scroll/scroll'
import Playlist from 'components/playlist/playlist'
import {playerMixin} from 'assets/js/mixin'

const transform = prefixStyle('transform')
const transitionDuration = prefixStyle('transition-duration')

export default {
  mixins: [playerMixin],
  data () {
    return {
      currentSongUrl: null,
      currentLyric: null,
      currentCover: null,
      currentLineNum: 0,
      currentShow: 'cd',
      currentTime: 0,
      songReady: false,
      radius: 32,
      playingLyric: ''
    }
  },
  created () {
    this.touch = {}
  },
  computed: {
    ...mapGetters([
      'fullScreen',
      'playing',
      'currentIndex'
    ]),
    cdCls () {
      return this.playing ? 'play' : 'play pause'
    },
    playIcon () {
      return this.playing ? 'icon-pause' : 'icon-play'
    },
    miniPlayIcon () {
      return this.playing ? 'icon-pause-mini' : 'icon-play-mini'
    },
    disableCls () {
      return this.songReady ? '' : 'disable'
    },
    // 进度条百分比
    percent () {
      return this.currentTime / (this.currentSong.duration / 1000)
    }
  },
  methods: {
    ...mapMutations({
      setFullScreen: 'SET_FULL_SCREEN'
    }),
    ...mapActions([
      'savePlayHistory'
    ]),
    showPlaylist () {
      this.$refs.playlist.show()
    },
    // 歌词动起来
    handleLyric ({lineNum, txt}) {
      this.currentLineNum = lineNum
      if (lineNum > 5) {
        let lineEl = this.$refs.lyricLine[lineNum - 5]
        this.$refs.lyricList.scrollToElement(lineEl, 1000)
      } else {
        this.$refs.lyricList.scrollToElement(0, 0, 1000)
      }
      this.playingLyric = txt
    },
    // 进度条拖拽
    onProgressDragChange (percent) {
      const currentTime = this.currentSong.duration / 1000 * percent
      this.$refs.audio.currentTime = currentTime
      if (!this.playing) this.togglePlaying()
      if (this.currentLyric) this.currentLyric.seek(currentTime * 1000)
    },
    // 切换播放状态
    togglePlaying () {
      this.setPlayingState(!this.playing)
      if (this.currentLyric) this.currentLyric.togglePlay()
    },
    updateTime (e) {
      this.currentTime = e.target.currentTime
    },
    // 歌曲准备完毕
    ready () {
      this.songReady = true
      // 存入播放列表
      this.savePlayHistory(this.currentSong)
    },
    error () {
      this.songReady = true
    },
    // 下一曲
    next () {
      if (!this.songReady) return
      let index = this.currentIndex + 1
      if (this.playlist.length === 1) {
        this.loop()
        return
      }
      if (index === this.playlist.length) index = 0
      this.setCurrentIndex(index)
      if (!this.playing) this.togglePlaying()
      this.songReady = false
    },
    // 上一曲
    prev () {
      if (!this.songReady) return
      if (this.playlist.length === 1) {
        this.loop()
        return
      }
      let index = this.currentIndex - 1
      if (index === -1) index = this.playlist.length - 1
      this.setCurrentIndex(index)
      if (!this.playing) this.togglePlaying()
      this.songReady = false
    },
    // 结束
    end () {
      if (this.mode === playMode.loop) {
        this.loop()
      } else {
        this.next()
      }
    },
    // 循环
    loop () {
      this.$refs.audio.currentTime = 0
      this.$refs.audio.play()
      if (this.currentLyric) this.currentLyric.seek(0)
    },
    // 返回
    back () {
      this.setFullScreen(false)
    },
    // 打开播放模块
    open () {
      this.setFullScreen(true)
    },
    // 中间部分滑动
    middleTouchStart (e) {
      this.touch.initiated = true
      this.touch.startX = e.touches[0].pageX
      this.touch.startY = e.touches[0].pageY
    },
    middleTouchMove (e) {
      if (!this.touch.initiated) return
      const deltaX = e.touches[0].pageX - this.touch.startX
      const deltaY = e.touches[0].pageY - this.touch.startY
      if (Math.abs(deltaY) > Math.abs(deltaX)) return
      // 如果是cd,left值为0，否则就是负一屏宽度
      const left = this.currentShow === 'cd' ? 0 : -window.innerWidth
      // 当还在cd时，左划最多移动负一屏的位置，向右划最多恢复为0
      const offsetWidth = Math.min(
        0,
        Math.max(-window.innerWidth, left + deltaX)
      )
      this.touch.percent = Math.abs(offsetWidth / window.innerWidth)
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.middleL.style.opacity = 1 - this.touch.percent
      this.$refs.lyricList.$el.style.transitionDuration = 0
      this.$refs.middleL.style.transitionDuration = 0
    },
    middleTouchEnd () {
      let offsetWidth
      let opacity

      if (this.currentShow === 'cd') {
        if (this.touch.percent > 0.3) {
          offsetWidth = -window.innerWidth
          opacity = 0
          this.currentShow = 'lyric'
        } else {
          offsetWidth = 0
          opacity = 1
        }
      } else {
        if (this.touch.percent < 0.7) {
          offsetWidth = 0
          opacity = 1
          this.currentShow = 'cd'
        } else {
          offsetWidth = -window.innerWidth
          opacity = 0
        }
      }
      this.$refs.lyricList.$el.style.transform = `translate3d(${offsetWidth}px,0,0)`
      this.$refs.lyricList.$el.style.transitionDuration = `300ms`
      this.$refs.middleL.style.opacity = opacity
      this.$refs.middleL.style.transitionDuration = `300ms`
      this.touch.initiated = false
    },
    // 专辑动画
    enter (el, done) {
      const {x, y, scale} = this._getPosAndScale()
      let animation = {
        0: {
          transform: `translate3d(${x}px,${y}px,0) scale(${scale})`
        },
        60: {
          transform: `translate3d(0,0,0) scale(1.1)`
        },
        100: {
          transform: `translate3d(0,0,0) scale(1)`
        }
      }
      animations.registerAnimation({
        name: 'move',
        animation,
        presets: {
          duration: 500,
          easing: 'linear'
        }
      })
      animations.runAnimation(this.$refs.cdWrapper, 'move', done)
    },
    afterEnter () {
      animations.unregisterAnimation('move')
      this.$refs.cdWrapper.style.animation = ''
    },
    leave (el, done) {
      this.$refs.cdWrapper.style.transition = 'all .5s'
      const {x, y, scale} = this._getPosAndScale()
      this.$refs.cdWrapper.style[transform] = `translate3d(${x}px,${y}px,0) scale(${scale})`
      this.$refs.cdWrapper.addEventListener('transitionend', done)
    },
    afterLeave () {
      this.$refs.cdWrapper.style.transition = ''
      this.$refs.cdWrapper.style[transform] = ''
    },
    // 获取mini专辑图位置尺寸
    _getPosAndScale () {
      const targetWidth = 40
      const paddingLeft = 40
      const paddingBottom = 30
      const paddingTop = 80
      const width = window.innerWidth * 0.8
      const scale = targetWidth / width
      const x = -(window.innerWidth / 2 - paddingLeft)
      const y = window.innerHeight - paddingTop - width / 2 - paddingBottom
      return {
        x, y, scale
      }
    },
    // 格式化时间
    _format (interval, type) {
      if (type) {
        interval = interval / 1000
      }
      interval = interval | 0
      const minute = this._pad((interval / 60) | 0)
      const second = this._pad(interval % 60)
      return `${minute}:${second}`
    },
    // 补零
    _pad (num, n = 2) {
      let len = num.toString().length
      while (len < n) {
        num = '0' + num
        len++
      }
      return num
    }
  },
  watch: {
    async currentSong (newSong, oldSong) {
      if (!newSong.id) return
      if (newSong.id === oldSong.id) return
      if (this.currentLyric) {
        this.currentLyric.stop()
        this.currentTime = 0
        this.playingLyric = ''
        this.currentLineNum = 0
      }
      this.currentSongUrl = await this.currentSong.getSongUrl()
      let lyric = await this.currentSong.getSongLyric()
      // 防止歌词乱跳（因为异步，所以可能生成多个new Lyric）
      if (this.currentSong.lyric !== lyric) return
      this.currentLyric = await new Lyric(lyric, this.handleLyric)
      this.currentCover = await this.currentSong.getSongCover()
      if (this.playing) this.currentLyric.play()
    },
    currentSongUrl () {
      let _this = this
      this.$nextTick(() => {
        // 还没准备好就播放，会报错
        _this.$refs.audio.play()
      })
    },
    playing (newVal) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        newVal ? this.$refs.audio.play() : this.$refs.audio.pause()
      }, 1000)
    }
  },
  components: {
    ProgressBar,
    ProgressCircle,
    Scroll,
    Playlist
  }
}
</script>

<style lang="stylus" scoped>
@import '~assets/stylus/variable'
@import '~assets/stylus/mixin'
.player
  .normal-player
    position fixed
    left 0
    right 0
    top 0
    bottom 0
    z-index 150
    background $color-background
    .background
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      opacity 0.6
      filter blur(20px)
    .top
      position relative
      margin-bottom 25px
      .back
        position absolute
        top 0
        left 6px
        z-index 50
        .icon-back
          display block
          padding 9px
          font-size $font-size-large-x
          color $color-theme-self
          transform rotate(-90deg)
      .title
        width 70%
        margin 0 auto
        line-height 40px
        text-align center
        no-wrap()
        font-size $font-size-large
        color $color-text
      .subtitle
        line-height 20px
        text-align center
        font-size $font-size-medium
        color $color-text
    .middle
      position fixed
      width 100%
      top 80px
      bottom 170px
      white-space nowrap
      font-size 0
      .middle-l
        display inline-block
        vertical-align top
        position relative
        width 100%
        height 0
        padding-top 80%
        .cd-wrapper
          position absolute
          left 10%
          top 0
          width 80%
          height 100%
          .cd
            width 100%
            height 100%
            box-sizing border-box
            border 10px solid rgba(255, 255, 255, 0.1)
            border-radius 50%
            &.play
              animation rotate 20s linear infinite
            &.pause
              animation-play-state paused
            .image
              position absolute
              left 0
              top 0
              width 100%
              height 100%
              border-radius 50%
        .playing-lyric-wrapper
          width 80%
          margin 30px auto 0 auto
          overflow hidden
          text-align center
          .playing-lyric
            height 20px
            line-height 20px
            font-size $font-size-medium
            color $color-text-l
      .middle-r
        display inline-block
        vertical-align top
        width 100%
        height 100%
        overflow hidden
        .lyric-wrapper
          width 80%
          margin 0 auto
          overflow hidden
          text-align center
          .text
            line-height 32px
            color $color-text-l
            font-size $font-size-medium
            &.current
              color $color-text
    .bottom
      position absolute
      bottom 50px
      width 100%
      .dot-wrapper
        text-align center
        font-size 0
        .dot
          display inline-block
          vertical-align middle
          margin 0 4px
          width 8px
          height 8px
          border-radius 50%
          background $color-text-l
          &.active
            width 20px
            border-radius 5px
            background $color-text-ll
      .progress-wrapper
        display flex
        align-items center
        width 80%
        margin 0px auto
        padding 10px 0
        .time
          color $color-text
          font-size $font-size-small
          flex 0 0 35px
          line-height 30px
          width 30px
          &.time-l
            text-align left
          &.time-r
            text-align right
        .progress-bar-wrapper
          flex 1
      .operators
        display flex
        align-items center
        .icon
          flex 1
          color $color-theme-self
          &.disable
            color $color-self-dis
          i
            font-size 30px
        .i-left
          text-align right
        .i-center
          padding 0 20px
          text-align center
          i
            font-size 40px
        .i-right
          text-align left
        .icon-favorite
          color $color-sub-theme
    &.normal-enter-active, &.normal-leave-active
      transition all 0.4s
      .top, .bottom
        transition all 0.4s cubic-bezier(0.86, 0.18, 0.82, 1.32)
    &.normal-enter, &.normal-leave-to
      opacity 0
      .top
        transform translate3d(0, -100px, 0)
      .bottom
        transform translate3d(0, 100px, 0)
  .mini-player
    display flex
    align-items center
    position fixed
    left 0
    bottom 0
    z-index 180
    width 100%
    height 60px
    background $color-highlight-background
    &.mini-enter-active, &.mini-leave-active
      transition all 0.4s
    &.mini-enter, &.mini-leave-to
      opacity 0
    .icon
      flex 0 0 40px
      width 40px
      padding 0 10px 0 20px
      img
        border-radius 50%
        &.play
          animation rotate 10s linear infinite
        &.pause
          animation-play-state paused
    .text
      display flex
      flex-direction column
      justify-content center
      flex 1
      line-height 20px
      overflow hidden
      .name
        margin-bottom 2px
        no-wrap()
        font-size $font-size-medium
        color $color-text
      .desc
        no-wrap()
        font-size $font-size-small
        color $color-text-d
    .control
      flex 0 0 30px
      width 30px
      padding 0 10px
      .icon-play-mini, .icon-pause-mini, .icon-playlist
        font-size 30px
        color $color-mini-self
      .icon-mini
        font-size 32px
        position absolute
        left 0
        top 0
@keyframes rotate
  0%
    transform rotate(0)
  100%
    transform rotate(360deg)
</style>
