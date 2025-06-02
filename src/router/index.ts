import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import useUserStore from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: '',
          name: 'dashboard',
          component: () => import('@/views/dashboard/HomeView.vue'),
        },
        {
          path: 'overview',
          name: 'overview',
          component: () => import('@/views/dashboard/OverviewView.vue'),
          meta: {
            breadcrumb: [{ label: 'Overview' }],
          },
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('@/views/dashboard/TransactionView.vue'),
          meta: {
            breadcrumb: [{ label: 'Transactions' }],
          },
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/views/dashboard/CategoriesView.vue'),
          meta: {
            breadcrumb: [{ label: 'Categories' }],
          },
        },
        {
          path: 'settings/profile',
          name: 'profile',
          component: () => import('@/views/dashboard/ProfileView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/auth/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/views/auth/RegisterView.vue'),
    },
    {
      path: '/landing',
      name: 'landing',
      component: () => import('@/views/LandingView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

router.beforeEach((to, _from, next) => {
  const requiresAuth = to.meta.requiresAuth
  if (!requiresAuth) {
    return next()
  }

  const userStore = useUserStore()
  const hasUser = userStore.user?.uid
  if (hasUser) {
    return next()
  }

  userStore.redirectAfterLogin = to.fullPath

  next({ name: 'login' })
})

export default router
