export default [{
  path: '/',
  redirect: '/recommend'
},
{
  path: '/recommend',
  component: () =>
      import('components/recommend/recommend')
},
{
  path: '/singer',
  component: () =>
      import('components/singer/singer'),
  children: [{
    path: ':id',
    component: () =>
        import('components/singer-detail/singer-detail')
  }]
},
{
  path: '/rank',
  component: () =>
      import('components/rank/rank')
},
{
  path: '/search',
  component: () =>
      import('components/search/search')
}
]
