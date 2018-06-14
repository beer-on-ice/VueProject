<template>
    <transition name='fader'>
        <div class="food" v-show='showFlag' ref='food'>
            <div class="food-content">
                <div class="image-header">
                    <img :src="food.image">
                    <div class="back" @click='back'>
                        <i class='icon-arrow_lift'></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class='title'>{{food.name}}</h1>
                    <div class="detail">
                        <span class='sell-count'>月售{{food.sellCount}}份</span>
                        <span class='rating'>好评率{{food.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class='now'>￥{{food.price}}</span>
                        <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                    </div>
                    <div class="cartcontrol-wrapper">
                        <cartcontrol :food='food'></cartcontrol>
                    </div>
                    <div class="buy" v-show='!food.count || food.count === 0' @click.stop.prevent='addBuy'>加入购物车</div>
                </div>
                <split v-show='food.info'></split>
                <div class="info" v-show='food.info'>
                    <h1 class='title'>商品信息</h1>
                    <p class='text'>{{food.info}}</p>
                </div>
                <split v-show='food.info'></split>
                <div class="rating">
                    <h1 class='title'>商品评价</h1>
                    <ratingselect
                    :select-type="selectType"
                    :only-content="onlyContent"
                    :desc="desc"
                    :ratings='food.ratings'
                    @isContent="isContent"
                    @selRatings="filterRatings"
                    ></ratingselect>
                    <div class="rating-wrapper">
                        <ul v-show='food.ratings && food.ratings.length'>
                            <li
                            v-for='rating,index in food.ratings'
                            class="rating-item border-1px" v-show='needShow(rating.rateType,rating.text)'
                            :key="index" >
                                <div class="user">
                                    <span class='name'>{{rating.username}}</span>
                                    <img :src="rating.avatar" class='avatar' width="12" height='12'>
                                </div>
                                <div class="time">
                                    {{rating.rateTime | formatDate('yyyy-MM-dd hh:mm')}}
                                </div>
                                <p class='text'>
                                    <span :class="{'icon-thumb_up': rating.rateType===0, 'icon-thumb_down': rating.rateType ===1 }"></span>{{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-rating" v-show='!food.ratings || !food.ratings.length'>暂无评价</div>
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import Vue from 'vue'
import 'common/js/formatdate/formatdate.js'
import BScroll from 'better-scroll'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import split from 'components/split/split'
import ratingselect from 'components/ratingselect/ratingselect'

//  评价类型
const ALL = 2

export default {
    props: {
        food: {
            type: Object
        }
    },
    data() {
        return {
            showFlag: false,
            selectType: ALL, // 评论type按钮的样式，使用常量切换
            onlyContent: false,  // 只看有内容的评论
            desc: {
                all:'全部',
                positive:'推荐',
                negative: '吐槽'
            }
        }
    },
    methods: {
        show() {
            //初始化显示
            this.showFlag = true
            this.selectType = ALL
            this.onlyContent = false
            this.$nextTick(()=>{
                if(!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food,{
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        back() {
            this.showFlag = false
        },
        addBuy(food) {
            this.$root.eventHub.$emit('getW',event.target)
            // 界面是不会自动跟新数组的，需要用Vue.set(app.arr,1,’ddd’)来设置改变，vue才会给我们自动更新
            Vue.set(this.food,'count',1)
        },
        needShow(type,text) {
            //  判断是否只显示内容
            if(this.onlyContent && !text) {
                return false
            }
            // 判断是否显示全部，否则就和选择的一致
            if(this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        },
        // 获取子组件点击事件传递过来的数据,是否展示有内容的
        isContent(el) {
            this.onlyContent = el;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        },
        // 获取子组件点击事件传递过来的数据，展示哪种类型的
        filterRatings(type) {
            this.selectType = type;
            this.$nextTick(() => {
                this.scroll.refresh();
            });
        }
    },
    components: {
        cartcontrol,
        split,
        ratingselect
    }
}
</script>

<style lang='stylus'>
@import '../../common/stylus/mixin.styl'
    .food
        position:fixed
        left:0
        top:0
        bottom:48px
        z-index: 30
        width:100%
        background: #fff
        transition: all 0.2s linear
        transform: translate3d(0, 0, 0)
        .image-header
            position: relative
            width: 100%
            height: 0
            padding-top: 100%
            img
                position: absolute
                top: 0
                left: 0
                width: 100%
                height: 100%
            .back
                position: absolute
                top: 10px
                left: 0
                .icon-arrow_lift
                    display: block
                    padding: 10px
                    font-size: 20px
                    color: #fff

        .content
            position: relative
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 8px
                font-size: 14px
                font-weight: 700
                color: rgb(7, 17, 27)
            .detail
                margin-bottom: 18px
                line-height: 10px
                height: 10px
                font-size: 0
                .sell-count, .rating
                    font-size: 10px
                    color: rgb(147, 153, 159)
                .sell-count
                    margin-right: 12px
            .price
                font-weight: 700
                line-height: 24px
                .now
                    margin-right: 8px
                    font-size: 14px
                    color: rgb(240, 20, 20)
                .old
                    text-decoration: line-through
                    font-size: 10px
                    color: rgb(147, 153, 159)
            .cartcontrol-wrapper
                position: absolute
                right: 12px
                bottom: 12px
            .buy
                position: absolute
                right: 18px
                bottom: 18px
                z-index: 10
                height: 24px
                line-height: 24px
                padding: 0 12px
                box-sizing: border-box
                border-radius: 12px
                font-size: 10px
                color: #fff
                background: rgb(0, 160, 220)
        .info
            padding: 18px
            .title
                line-height: 14px
                margin-bottom: 6px
                font-size: 14px
                color: rgb(7, 17, 27)
            .text
                line-height: 24px
                padding: 0 8px
                font-size: 12px
                color: rgb(77, 85, 93)
        .rating
            padding-top: 18px
            .title
                line-height: 14px
                margin-left: 18px
                font-size: 14px
                color: rgb(7, 17, 27)
            .rating-wrapper
                padding: 0 18px
                .rating-item
                    position: relative
                    padding: 16px 0
                    border-1px(rgba(7, 17, 27, 0.1))
                    .user
                        position: absolute
                        right: 0
                        top: 16px
                        line-height: 12px
                        font-size: 0
                        .name
                            display: inline-block
                            margin-right: 6px
                            vertical-align: top
                            font-size: 10px
                            color: rgb(147, 153, 159)
                        .avatar
                            border-radius: 50%
                    .time
                        margin-bottom: 6px
                        line-height: 12px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .text
                        line-height: 16px
                        font-size: 12px
                        color: rgb(7, 17, 27)
                        .icon-thumb_up, .icon-thumb_down
                            margin-right: 4px
                            line-height: 16px
                            font-size: 12px
                        .icon-thumb_up
                            color: rgb(0, 160, 220)
                        .icon-thumb_down
                            color: rgb(147, 153, 159)
                .no-rating
                    padding: 16px 0
                    font-size: 12px
                    color: rgb(147, 153, 159)
    .fader-enter,.fader-leave-to
        transform: translate3d(100%, 0, 0)
</style>
