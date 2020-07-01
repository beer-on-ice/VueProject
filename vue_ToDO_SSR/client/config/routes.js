// import ToDo from '../views/todo/todo.vue'
// import Login from '../views/login/login.vue'
// import LoginChild from '../views/login/loginchild.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    name: 'app',
    path: '/app',
    meta: {
      title: 'this is app',
      description: 'asdasdasd'
    },
    component: () => import('../views/todo/todo.vue')
  },
  {
    path: '/login/:id',
    component: () => import('../views/login/login.vue'),
    props: true,
    // props: { id: '789' },
    // props: (route) => ({ id: route.query.b }),
    children: [
      {
        path: 'exact',
        component: () => import('../views/login/loginchild.vue')
      }
    ],
    beforeEnter: (to, from, next) => {
      console.log('app route before enter')
      next()
    }
  }
]
