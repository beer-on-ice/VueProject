export default [{
  path: '/',
  redirect: '/recommend'
},
{
  path: '/user',
  component: resolve => {
      import('components/user-center/user-center').then(module => resolve(module))
  }
},
{
  path: '/recommend',
  component: resolve => {
      import('components/recommend/recommend').then(module => resolve(module))
  },
  children: [{
    path: ':id',
    component: resolve => {
        import('components/disc/disc').then(module => resolve(module))
    }
  }]
},
{
  path: '/singer',
  component: resolve => {
      import('components/singer/singer').then(module => resolve(module))
  },
  children: [{
    path: ':id',
    component: resolve => {
        import('components/singer-detail/singer-detail').then(module => resolve(module))
    }
  }]
},
{
  path: '/rank',
  component: resolve => {
      import('components/rank/rank').then(module => resolve(module))
  },
  children: [{
    path: ':id',
    component: resolve => {
        import('components/top-list/top-list').then(module => resolve(module))
    }
  }]
},
{
  path: '/search',
  component: resolve => {
      import('components/search/search').then(module => resolve(module))
  },
  children: [{
    path: ':id',
    component: resolve => {
        import('components/singer-detail/singer-detail').then(module => resolve(module))
    }
  }]
}
]
