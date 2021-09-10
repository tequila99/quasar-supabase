
const routes = [
  {
    path: '/auth',
    component: () => import('layouts/AuthLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'Login',
        component: () => import('pages/user/UserAuth.vue')
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('pages/user/UserAuth.vue')
      },
      {
        path: 'forgot-password',
        name: 'ForgotPassword',
        component: () => import('src/pages/user/ForgotPassword.vue')
      },
      {
        path: 'change-password',
        name: 'ChangePassword',
        component: () => import('src/pages/user/ChangePassword.vue'),
        meta: { authRequired: true }
      }
    ]
  },
  {
    path: '/user',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'profile',
        name: 'Профиль',
        component: () => import('pages/user/UserProfile.vue'),
        meta: {
          authRequired: true
        }
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
