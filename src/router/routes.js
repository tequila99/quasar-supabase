
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/UserAuth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/UserAuth.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('pages/ForgotPassword.vue')
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('pages/ChangePassword.vue'),
        meta: { authRequired: true }
      }
    ]
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: true },
    children: [
      {
        path: '',
        component: () => import('pages/Index.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
