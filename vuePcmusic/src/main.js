import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

// 引入静态资源
import 'font-awesome/css/font-awesome.css'
require('common/css/reset.css')
require('common/css/base.css')

Vue.config.productionTip = false

new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: { App },
    data: {
        bus: new Vue()
    }
})
