export default [
  {
    path: '/',
    redirect: '/welcome'
  },
  {
    path: '/welcome',
    component: resolve =>
      import('pages/welcome').then(module => resolve(module))
  },
  {
    path: '/login',
    component: resolve => import('pages/login').then(module => resolve(module))
  },
  {
    path: '/guide',
    redirect: '/guide/nav',
    component: resolve => import('pages/guide').then(module => resolve(module)),
    children: [
      {
        path: '/guide/nav',
        component: resolve =>
          import('pages/nav').then(module => resolve(module))
      },
      {
        path: '/guide/withdraw',
        component: resolve =>
          import('pages/withdraw').then(module => resolve(module))
      },
      {
        path: '/guide/buy',
        component: resolve =>
          import('pages/buy').then(module => resolve(module))
      }
    ]
  },
  {
    path: '/certain',
    component: resolve =>
      import('pages/certainBuy').then(module => resolve(module))
  }
]
