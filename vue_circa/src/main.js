import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import Store from './store'
import i18n from './locales'

// 弹性布局自动化
// import 'lib-flexible'

//  全局样式
import './assets/styles/global.scss'
import './assets/iconfont/iconfont.css'
// import 'swiper/dist/css/swiper.css'

// 引入elementUI
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css'

Vue.config.productionTip = false

const router = new Router()
const store = new Store()

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
