export default [
  {
    path: '/',
    redirect: '/pds'
  },
  {
    path: '/pds',
    component: resolve => import('views/pds').then(module => resolve(module)),
    children: [
      {
        path: '/pds/back',
        component: resolve =>
          import('views/pds/pds_back').then(module => resolve(module))
      },
      {
        path: '/pds/flow',
        component: resolve =>
          import('views/pds/pds_flow').then(module => resolve(module))
      }
    ]
  }
]
