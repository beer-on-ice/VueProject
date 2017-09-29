<template>
    <div id="app">
        <v-header :seller='seller'></v-header>
        <div class="tab border-1px">
            <div class="tab-item">
                <router-link to="/goods" tag="p" active-class="active"><a href='javascript:;'>商品</a></router-link>
            </div>
            <div class="tab-item">
                <router-link to="/ratings" tag="p"><a href='javascript:;'>评论</a></router-link>
            </div>
            <div class="tab-item">
                <router-link to="/seller" tag="p"><a href='javascript:;'>商家</a></router-link>
            </div>
        </div>
        <!-- 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。 -->
        <keep-alive>
            <router-view :seller='seller'></router-view>
        </keep-alive>
    </div>
</template>

<script type="text/ecmascript-6">
import header from './components/header/header'
import urlParse from 'common/js/util/util.js'

const ERR_OK = 0;

export default {
    data() {
        return {
            seller: {
                id: (()=> {
                    // 后端数据的url地址
                    let queryParam = urlParse()
                    // console.log(queryParam)
                    return queryParam.id
                })()
            }
        }
    },
    created() {
        this.$http.get('/api/seller?id=' + this.seller.id).then((res)=> {
            // 获取数据，object类型
            res = res.body
            // 判断是不是成功拿到了数据
            if(res.errno === ERR_OK) {
                // 成功获取到数据，子组件使用props接收数据
                //this.seller = res.data //直接赋值id会丢失，如 this.seller.id = undefined
                this.seller = Object.assign({},this.seller,res.data) // ES6语法，合并对象
            }
        })
    },
    components: {
        'v-header': header
    }
}
</script>

<style lang='stylus'>
    @import 'common/stylus/mixin.styl'
    //  &表示父元素
    #app
        .tab
            display:flex
            width:100%
            height: 40px
            line-height: 40px
            border-1px(rgba(7,17,27,0.1))
            .tab-item
                flex:1
                text-align: center
                p
                    font-size: 14px
                    &.active a
                        color: rgb(240,20,20)

</style>
