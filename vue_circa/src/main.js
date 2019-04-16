import Vue from 'vue'
import App from './App.vue'
import Router from './router'
import i18n from './locales'

//  全局样式
import './assets/styles/global.scss'
import './assets/iconfont/iconfont.css'

// 引入elementUI
import './plugins/element.js'
import 'element-ui/lib/theme-chalk/display.css'

Vue.config.productionTip = false

const router = new Router()

new Vue({
  router,
  i18n,
  render: h => h(App)
}).$mount('#app')
