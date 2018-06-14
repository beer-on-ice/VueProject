<template>
    <scroll class='listview' :data='data' ref='listview' :listen-scroll='listenScroll' @scroll='scroll' :probeType='probeType'>
        <ul>
            <li v-for="group in data" class="list-group" ref='listGroup'>
                <h2 class='list-group-title'>{{group.title}}</h2>
                <ul>
                    <li v-for="item in group.items" class="list-group-item" @click='selectItem(item)'>
                        <img v-lazy="item.avatar" class="avatar">
                        <span class='name'>{{item.name}}</span>
                    </li>
                </ul>
            </li>
        </ul>
        <div class="list-shortcut" @touchstart='onShortlistTouchStart' @touchmove.stop.prevent='onShortlistTouchMove'>
            <ul>
                <li v-for='item,index in shortList' class='item' :data-index='index' :class="{'current':currentIndex===index}">
                    {{item}}
                </li>
            </ul>
        </div>
        <div class="list-fixed"  v-show='fixedTitle' ref='fixed'>
            <h1 class='fixed-title'>{{fixedTitle}}</h1>
        </div>
        <div class="loading-container" v-show="!data.length">
            <loading></loading>
        </div>
    </scroll>
</template>

<script>
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
import {getData} from 'common/js/dom'
//  热门歌手那栏高度
const Title_height = 30
// 字母导航栏单个高度
const shortList_height = 18
  export default {
    created() {
        this.probeType = 3,
        this.touch = {},
        this.listenScroll = true,
        this.listHeight = []
    },
    data() {
        return {
            scrollY: -1,
            currentIndex: 0,
            diff: -1
        }
    },
    props: {
        data: {
            type: Array,
            default: []
        }
    },
    components: {
        Scroll,
        Loading
    },
    computed: {
        shortList() {
            return this.data.map((group) => {
                return group.title.substr(0,1)
            })
        },
        fixedTitle() {
            if (this.scrollY > 0) {
              return ''
            }
            return this.data[this.currentIndex]?this.data[this.currentIndex].title:''
        }
    },
    methods: {
        selectItem(item) {
            this.$emit('select', item)
        },
        refresh() {
            this.$refs.listview.refresh()
        },
        onShortlistTouchStart(e) {
            let acIndex = getData(e.target,'index')
            let firstTouch = e.touches[0]
            this.touch.y1 = firstTouch.pageY
            this.touch.acIndex = acIndex
            this._scrollTo(acIndex)
        },
        onShortlistTouchMove(e) {
            let firstTouch = e.touches[0]
            this.touch.y2 = firstTouch.pageY
            let delta = Math.floor((this.touch.y2 - this.touch.y1)/shortList_height)
            let acIndex = parseInt(this.touch.acIndex) + delta
            this._scrollTo(acIndex)
        },
        scroll(pos) {
            this.scrollY = pos.y
        },
        _scrollTo(index) {
            if (!index && index !== 0) {
              return
            }
            if (index < 0) {
              index = 0
            } else if (index > this.listHeight.length - 2) {
              index = this.listHeight.length - 2
            }
            this.scrollY = -this.listHeight[index]
            //第二个参数为动画时间
            this.$refs.listview.scrollToElement(this.$refs.listGroup[index],0)
        },
        _calculateHeight() {
            this.listHeight = []
            const list = this.$refs.listGroup
            let height = 0
            this.listHeight.push(height)
            for(var i=0;i<list.length;i++) {
                let item = list[i];
                height += item.clientHeight
                this.listHeight.push(height)
            }
        }
    },
    //watch，它用于观察Vue实例上的数据变动。对应一个对象，键是观察表达式，值是对应回调。值也可以是方法名，或者是对象，包含选项
    watch: {
        data() {
            setTimeout(()=> {
                this._calculateHeight()
            },20)
        },
        scrollY(newY) {
            const listHeight = this.listHeight
            // 滚动到顶部，newY>0（解决到顶部时，右侧导航选中状态消失）
            if (newY > 0) {
              this.currentIndex = 0
              return
            }
            // 在页面中间
            for(let i=0;i<listHeight.length;i++) {
                let height1 = listHeight[i]
                let height2 = listHeight[i + 1]
                if(-newY >= height1&& -newY < height2) {
                    this.currentIndex = i
                    this.diff = height2 +newY
                    // console.log(this.currentIndex);
                    return
                }
            }
            // 滚动到底部，且-newY大于最后一个元素的上限
            this.currentIndex = listHeight.length - 2
        },
        diff(newVal) {
            let fixedTop = (newVal >0 &&newVal <Title_height) ?newVal - Title_height : 0
            if(this.fixedTop === fixedTop) {
                return
            }
            this.fixedTop = fixedTop
            // gpu加速
            this.$refs.fixed.style.transform = `translate3d(0,${fixedTop}px,0)`
        }
    }
  }
</script>

<style lang='stylus'>
@import "~common/stylus/variable"

.listview
  position: relative
  width: 100%
  height: 100%
  overflow: hidden
  background: $color-background
  .list-group
    padding-bottom: 30px
    .list-group-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
    .list-group-item
      display: flex
      align-items: center
      padding: 20px 0 0 30px
      .avatar
        width: 50px
        height: 50px
        border-radius: 50%
      .name
        margin-left: 20px
        color: $color-text-l
        font-size: $font-size-medium
  .list-shortcut
    position: absolute
    z-index: 30
    right: 0
    top: 50%
    transform: translateY(-50%)
    width: 20px
    padding: 20px 0
    border-radius: 10px
    text-align: center
    background: $color-background-d
    font-family: Helvetica
    .item
      padding: 3px
      line-height: 1
      color: $color-theme-self
      font-size: $font-size-small
      &.current
        color: $color-self-h
  .list-fixed
    position: absolute
    top: 0
    left: 0
    width: 100%
    .fixed-title
      height: 30px
      line-height: 30px
      padding-left: 20px
      font-size: $font-size-small
      color: $color-text-l
      background: $color-highlight-background
  .loading-container
    position: absolute
    width: 100%
    top: 50%
    transform: translateY(-50%)
</style>
