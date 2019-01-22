import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
    path: '/',
    redirect: '/album'
  },
  {
    path: '/album',
    component: () =>
        import('views/Album'),
    children: [{
      path: 'show',
      component: () =>
          import('views/Show')
    }]
  },
  {
    path: '/album/show',
    component: () =>
        import('views/Show')
  },
  {
    path: '/appointment',
    component: () =>
        import('views/Appointment')
  },
  {
    path: '/usercenter',
    component: () =>
        import('views/UserCenter')
  }
  ]
})
