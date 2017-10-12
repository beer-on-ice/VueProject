import Vue from 'vue'
import App from './App'
import router from './router'
import $ from 'jquery'

// 引入静态资源
require('common/css/reset.css')
require('common/css/base.css')

import 'font-awesome/css/font-awesome.css'

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
