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
          component: () => import('@/features/overview/views/OverviewView.vue'),
          meta: {
            breadcrumb: [{ label: 'Overview' }],
          },
        },
        {
          path: 'transactions',
          name: 'transactions',
          component: () => import('@/features/transactions/views/TransactionView.vue'),
          meta: {
            breadcrumb: [{ label: 'Transactions' }],
          },
        },
        {
          path: 'categories',
          name: 'categories',
          component: () => import('@/features/category/views/CategoriesView.vue'),
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
      component: () => import('@/features/auth/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('@/features/auth/views/RegisterView.vue'),
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
