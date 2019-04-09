export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: resolve => import('pages/home').then(module => resolve(module))
  },
  {
    path: '/business',
    component: resolve =>
      import('pages/business').then(module => resolve(module))
  },
  {
    path: '/personal',
    component: resolve =>
      import('pages/personal').then(module => resolve(module))
  },
  {
    path: '/developer',
    component: resolve =>
      import('pages/developer').then(module => resolve(module))
  }
]
