import { createRouter, createWebHistory } from 'vue-router'

import AppLayout from '@/layouts/AppLayout.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: AppLayout,
      meta: {
        requiresAuth: true,
        requiresSetup: true,
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
      path: '/setup',
      name: 'setup',
      meta: {
        requiresAuth: true,
        requiresSetup: false,
      },
      children: [
        {
          path: '',
          name: 'setup-start',
          component: () => import('@/features/setup/views/SetupStartView.vue'),
        },
        {
          path: 'group',
          name: 'setup-group',
          component: () => import('@/features/setup/views/SetupGroupView.vue'),
        },
        {
          path: 'currency',
          name: 'setup-currency',
          component: () => import('@/features/setup/views/SetupCurrencyView.vue'),
        },
        {
          path: 'done',
          name: 'setup-done',
          component: () => import('@/features/setup/views/SetupDoneView.vue'),
        },
      ],
    },
    {
      path: '/login',
      name: 'login',
      meta: { redirectIfAuth: true },
      component: () => import('@/features/auth/views/LoginView.vue'),
    },
    {
      path: '/register',
      name: 'register',
      meta: { redirectIfAuth: true },
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
  const userStore = useUserStore()
  const { user } = userStore

  const requiresAuth = to.meta.requiresAuth === true
  const requiresSetup = to.meta.requiresSetup === true
  const isAuthenticated = !!user?.uid
  const isSetupComplete = user?.setupStep === 'complete'

  if (!requiresAuth) {
    return next()
  }

  if (!isAuthenticated) {
    userStore.redirectAfterLogin = to.fullPath

    return next({ name: 'login' })
  }

  if (requiresSetup && !isSetupComplete) {
    return next('/setup')
  }

  next()
})

export default router
