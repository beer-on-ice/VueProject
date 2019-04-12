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
    path: '/contact',
    component: resolve =>
      import('pages/contact').then(module => resolve(module))
  },
  {
    path: '/login',
    component: resolve => import('pages/login').then(module => resolve(module))
  },
  {
    path: '/login/forget',
    component: resolve =>
      import('pages/login/forget').then(module => resolve(module))
  },
  {
    path: '/register',
    component: resolve =>
      import('pages/register').then(module => resolve(module))
  },
  {
    path: '/about',
    redirect: '/about/personal',
    component: resolve =>
      import('pages/layout').then(module => resolve(module)),
    children: [
      {
        path: '/about/personal',
        component: resolve =>
          import('pages/personal').then(module => resolve(module))
      },
      {
        path: '/about/business',
        component: resolve =>
          import('pages/business').then(module => resolve(module))
      }
    ]
  }
]
