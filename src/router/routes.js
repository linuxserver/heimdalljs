
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') }
    ]
  },
  {
    path: '/user/item',
    component: () => import('layouts/Tiles.vue'),
    children: [
      { path: '', component: () => import('pages/application/Index.vue') }
    ]
  },
  {
    path: '/user/settings',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/settings/Index.vue') }
    ]
  },

  {
    path: '/admin',
    component: () => import('layouts/Tiles.vue'),
    children: [
      { path: '', component: () => import('pages/application/Index.vue') }
    ]
  },
  {
    path: '/admin/user',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/user/Index.vue') }
    ]
  },
  {
    path: '/admin/settings',
    component: () => import('layouts/User.vue'),
    children: [
      { path: '', component: () => import('pages/settings/Index.vue') }
    ]
  },
  {
    path: '/admin/proxy',
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
