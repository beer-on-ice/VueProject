import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
Vue.use(Router)

export default () => {
  return new Router({
    mode: 'history',
    routes,
    linkActiveClass: 'active-link',
    linkExactActiveClass: 'exact-active-link',
    scrollBehavior (to, from, savedPosition) {
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    },
    // parseQuery (query) { },
    // stringifyQuery (obj) { },
    fallback: true // 不支持的浏览器fallback到hash模式
  })
}
