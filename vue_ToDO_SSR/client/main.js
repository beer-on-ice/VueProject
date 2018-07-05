import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'

const router = createRouter()

new Vue({
  el: '#app',
  router,
  // render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
  render: (h) => h(App)
})
