import Vue from 'vue'
import App from './app.vue'
import Router from 'vue-router'
import Vuex from 'vuex'

import './assets/styles/global.styl'
import createRouter from './config/router'
import createStore from './store/store'

Vue.use(Vuex)
Vue.use(Router)

const router = createRouter()
const store = createStore()

// store注册module
store.registerModule('c', {
  state: {
    text: 3
  }
})

// store解绑module
// store.unregisterModule('c')

// store.watch(state => state.count + 1, (newCount) => {
//   // newCount 为前一个方法改变后的值
//   console.log('watched new count: ' + newCount)
// })

// 订阅（监听mutations）
store.subscribe((mutation, state) => {
  console.log('subscribe: ' + mutation.type) // 调用的哪个mutation
  console.log(mutation.payload) // mutation的参数
})

// 订阅（监听actions）
store.subscribeAction((action, state) => {
  console.log('subscribeAction: ' + action.type) // 调用的哪个action
  console.log(action.payload) // action的参数
})

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
  store,
  // render函数是渲染一个视图，然后提供给el挂载，如果没有render那页面什么都不会出来
  render: (h) => h(App)
})
