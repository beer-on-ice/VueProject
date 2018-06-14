import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login.vue'
import UserInfo from '@/components/UserInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
      {
          path: '/login',
          component: Login
      },
      {
          path: '/user_info',
          component: UserInfo
      }
  ]
})
