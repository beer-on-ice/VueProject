<template>
    <div class="cartcontrol">
        <transition name='move'>
            <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent='decrease'>
                <span class="inner icon-remove_circle_outline"></span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">
            {{food.count}}
        </div>
        <div class="cart-add icon-add_circle" @click.stop.prevent='add'></div>
    </div>
</template>

<script>
import Vue from 'vue'
export default {
    props:{
        food: {
            type: Object
        }
    },
    created() {
    },
    methods: {
        add(event) {
            if(!this.food.count) {
                Vue.set(this.food,'count',1)
            } else {
                this.food.count++
            }
            // 定义的新的公共实例eventHub，就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件.归按钮组件和购物车组件公用，传输数据
            this.$root.eventHub.$emit('getW',event.target)
            // 传输点击的那个
        },
        decrease() {
            if(this.food.count){
                this.food.count--
            }
        }
    }
}
</script>

<style lang='stylus'>
.cartcontrol
    font-size: 0
    .cart-decrease
        display: inline-block
        padding: 6px
        transition: all 0.4s linear
        .inner
            display: inline-block
            line-height: 24px
            font-size: 24px
            color: rgb(0, 160, 220)
    .move-enter, .move-leave-to
        opacity: 0
        transform: translate(24px)
        transform: rotate(180deg)
    .cart-count
        display: inline-block
        vertical-align: top
        width: 12px
        padding-top: 6px
        line-height: 24px
        text-align: center
        font-size: 10px
        color: rgb(147, 153, 159)
    .cart-add
        display: inline-block
        padding: 6px
        line-height: 24px
        font-size: 24px
        color: rgb(0, 160, 220)
</style>
