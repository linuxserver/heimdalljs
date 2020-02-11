
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/item',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/application/Index.vue') }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/user/Index.vue') }
    ]
  },
  {
    path: '/settings',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/settings/Index.vue') }
    ]
  },
  {
    path: '/proxy',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/proxy/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
