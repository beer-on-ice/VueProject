import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'

//  全局样式
import './assets/styles/global.scss'
import './assets/iconfont/iconfont.css'
import 'swiper/dist/css/swiper.css'

// 引入elementUI
import './plugins/element.js'
import { Radio, Loading } from 'element-ui'
Vue.use(Radio)
Vue.use(Loading)

Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
