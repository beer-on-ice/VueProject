import ToDo from '../views/todo/todo.vue'
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
    }
  }
]
