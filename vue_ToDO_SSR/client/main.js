import Vue from 'vue'
import App from './app.vue'

import './assets/styles/global.styl'
import createRouter from './config/router'

const router = createRouter()

// 可用于校验是否登陆等
router.beforeEach((to, from, next) => {
  console.log('before each invoked')
  // if (to.fullPath === '/app') {
  //   next('/login/123')
  // } else {
  //   next()
  // }
  next()
})

router.beforeResolve((to, from, next) => {
  console.log('before resolve invoked')
  next()
})

router.afterEach((to, from, next) => {
  console.log('after each invoked')
})

new Vue({
  el: '#app',
  router,
  // render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
  render: (h) => h(App)
})
