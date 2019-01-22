import Vue from 'vue'
import Router from 'vue-router'
import index from '@/components/index'
import hot from '@/components/hot'
import category from '@/components/category'
import author from '@/components/author'
import follow from '@/components/follow'
import collect from '@/components/collect'
import search from '@/components/search'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: index,
      redirect: '/index',
    },
    {
      path: '/index',
      component: index,
      name: 'index'
    },
    {
      path: '/hot',
      component: hot,
    },
    {
      path: '/category',
      component: category,
    },
    {
      path: '/author',
      component: author,
    },
    {
      path: '/follow',
      component: follow,
    },
    {
      path: '/collect',
      component: collect,
    },
    {
      path: '/search',
      component: search,
      name: 'search'
    },
  ]
})
