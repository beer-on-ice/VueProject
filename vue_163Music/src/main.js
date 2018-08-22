import Vue from 'vue'
import App from './App.vue'
import createRouter from './routes/router'
import createStore from './store/store'
import './registerServiceWorker'

// 为了能够立即响应用户的点击事件
import fastclick from 'fastclick'
import VueLazyLoad from 'vue-lazyload'

import 'assets/stylus/index.styl'

fastclick.attach(document.body)
Vue.use(VueLazyLoad, {
  loading: require('assets/images/loading.gif')
})

const store = createStore()
const router = createRouter()

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
