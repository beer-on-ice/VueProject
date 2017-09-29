<template>
    <div class="goods">
        <div class="menu-wrapper" ref='menuWrapper'>
            <ul>
                <li v-for='item,index in goods' class='menu-item' :class="{current: currentIndex === index}" @click='selectMenu(index)'>
                    <span class='text border-1px'>
                    <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
                    </span>
                </li>
            </ul>
        </div>
        <div class="foods-wrapper" ref='foodsWrapper'>
            <ul>
                <li class='food-list food-list-hook' v-for='item in goods'>
                    <h1 class='title'>{{item.name}}</h1>
                    <ul>
                        <li class='food-item' v-for='food in item.foods' @click='choseFood(food)'>
                            <div class="icon">
                                <img :src="food.icon" width='57' height='57'>
                            </div>
                            <div class="content">
                                <h2 class='name'>{{food.name}}</h2>
                                <p class='desc'>{{food.description}}</p>
                                <div class="extra">
                                    <span class='count'>月售{{food.sellCount}}份</span>
                                    <span>好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class='now'>￥{{food.price}}</span>
                                    <span v-show="food.oldPrice" class="old">￥{{food.oldPrice}}</span>
                                </div>
                                <div class="cartcontrol-wrapper">
                                    <cartcontrol :food="food"></cartcontrol>
                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <shopcart :delivery-price='seller.deliveryPrice' :min-price='seller.minPrice' :select-food='selectFood' ref='shopcart'></shopcart>
        <food :food='selectedFood' ref='food'></food>
    </div>
</template>

<script>
import BScroll from 'better-scroll'
import shopcart from 'components/shoppingcart/shoppingcart'
import cartcontrol from 'components/cartcontrol/cartcontrol'
import food from 'components/food/food'
    const ERR_OK = 0
    export default {
        props: {
            seller: {
                type: Object
            }
        },
        data() {
            return {
                goods: [],
                // 每一块list的高度
                listHeight:[],
                scrollY: 0,
                tar: '',
                selectedFood: {}
            }
        },
        computed: {
            // 使当前的foodlist的index对应到menuitem的index
            currentIndex() {
                for (let i = 0; i < this.listHeight.length; i++) {
                    let height1 = this.listHeight[i];
                    let height2 = this.listHeight[i + 1];
                    if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
                        return i;
                    }
                }
                return 0;
            },
            selectFood() {
                //  找到所有被选择的商品
                let foods = []
                this.goods.forEach((good)=>{
                    good.foods.forEach((food)=>{
                        if(food.count) {
                            foods.push(food)
                        }
                    })
                })
                return foods
            }
        },
        created() {
            // 用来代表不同的icon[减，折，特，票，保]
            this.classMap = ['decrease','discount','special','invoice','guarantee']
            this.$http.get('/api/goods').then((res)=> {
                res = res.body
                if(res.errno === ERR_OK) {
                    this.goods = res.data
                    this.$nextTick(() => {
                        this._initScroll();
                        this._calculateHeight();
                    });
                }
            })
        },
        methods: {
            _initScroll() {
                this.meunScroll = new BScroll(this.$refs.menuWrapper, {
                    click: true // better-scroll会阻止默认事件，自己派生点击事件
                });

                this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
                    click: true,
                    // 实时监测滚动位置
                    probeType: 3
                });

                this.foodsScroll.on('scroll',(pos)=>{
                    // 取位置
                    this.scrollY = Math.abs(Math.round(pos.y))
                })
            },
            _calculateHeight() {
                // 关联左右两侧滚动变化
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
                let height = 0
                this.listHeight.push(height)// foodlist的距离父级顶部的高度
                for(let i = 0;i < foodList.length;i++) {
                    let item = foodList[i]
                    height += item.clientHeight
                    this.listHeight.push(height)
                }
            },
            selectMenu(index) {
                // 点击左侧menuitem，影响右侧foodlist
                // console.log(index);
                let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
                let item = foodList[index]
                // 300ms动画时间
                this.foodsScroll.scrollToElement(item,300)
            },
            choseFood(food) {
                this.selectedFood = food
                // 父组件调用子组件下方法
                this.$refs.food.show()
            }
        },
        components: {
            shopcart,
            cartcontrol,
            food
        }
    }
</script>

<style lang='stylus'>
    @import "../../common/stylus/mixin.styl"
    .goods
        display: flex
        position: absolute
        top: 174px
        bottom: 46px
        width: 100%
        overflow: hidden
        .menu-wrapper
            flex: 0 0 80px
            width:80px
            height:100%
            background:#f3f5f7
            .menu-item
                display: table
                height: 54px
                width: 56px
                padding: 0 12px
                line-height: 14px
                &.current
                    position: relative
                    z-index: 10
                    margin-top: -1px
                    background: #fff
                    font-weight: 700
                    .text
                        border-none()
                .icon
                    display: inline-block
                    vertical-align: top
                    width: 12px
                    height: 12px
                    margin-right: 2px
                    background-size: 12px 12px
                    background-repeat: no-repeat
                    &.decrease
                        bg-image('decrease_3')
                    &.discount
                        bg-image('discount_3')
                    &.guarantee
                        bg-image('guarantee_3')
                    &.invoice
                        bg-image('invoice_3')
                    &.special
                        bg-image('special_3')
                .text
                    display: table-cell
                    width: 56px
                    vertical-align: middle
                    border-1px(rgba(7, 17, 27, 0.1))
                    font-size: 12px
        .foods-wrapper
            flex: 1
            .title
                padding-left: 14px
                height: 26px
                line-height: 26px
                border-left: 2px solid #d9dde1
                font-size: 12px
                color: rgb(147, 153, 159)
                background: #f3f5f7
            .food-item
                display: flex
                margin: 18px
                padding-bottom: 18px
                border-1px(rgba(7, 17, 27, 0.1))
                &:last-child
                    border-none()
                    margin-bottom: 0
                .icon
                    flex: 0 0 57px
                    margin-right: 10px
                .content
                    flex: 1
                    .name
                        margin: 2px 0 8px 0
                        height: 14px
                        line-height: 14px
                        font-size: 14px
                        color: rgb(7, 17, 27)
                    .desc, .extra
                        line-height: 10px
                        font-size: 10px
                        color: rgb(147, 153, 159)
                    .desc
                        line-height: 12px
                        margin-bottom: 8px
                    .extra
                        .count
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
                        right: 0
                        bottom: 12px

</style>
