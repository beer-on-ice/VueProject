import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import I18n from './lang'

//  全局样式
import './assets/styles/global.scss'
import './assets/iconfont/iconfont.css'
// import 'swiper/dist/css/swiper.css'

// 引入elementUI
import './plugins/element.js'

Vue.config.productionTip = false

const router = new Router()
const store = new Store()
const i18n = new I18n()
console.log(i18n)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
