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
    component: ToDo
  },
  {
    path: '/login',
    component: Login,
    children: [
      {
        path: 'exact',
        component: LoginChild
      }
    ]
  }
]
