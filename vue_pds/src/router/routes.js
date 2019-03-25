export default [
  {
    path: '/',
    redirect: '/pds'
  },
  {
    path: '/pds',
    name: 'pds',
    component: () => import('views/pds')
  }
]
