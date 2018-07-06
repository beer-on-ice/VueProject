import ToDo from '../views/todo/todo.vue'
import Login from '../views/login/login.vue'
import LoginChild from '../views/login/loginchild.vue'
export default [
  {
    path: '/',
    redirect: '/app'
  },
  {
    path: '/app',
    component: ToDo,
    name: 'app',
    meta: {
      title: 'this is app',
      description: 'asdasdasd'
    },
    beforeEnter: (to, from, next) => {
      console.log('app route before enter')
      next()
    }
  },
  {
    path: '/login/:id',
    component: Login,
    // props: true,
    props: { id: '456' },
    // props: (route) => ({ id: route.query.b }),
    children: [
      {
        path: 'exact',
        component: LoginChild
      }
    ]
  }
]
