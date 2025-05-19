<template>
  <div class="flex flex-column h-full">
    <div class="overflow-y-auto w-full">
      <ul>
        <template v-for="item in menuItems" :key="item">
          <app-menu-item v-bind:item="item"></app-menu-item>
        </template>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import AppMenuItem from '@/layouts/AppMenuItem.vue'

const menuItems = ref([
  {
    label: 'Home',
    items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', to: '/' }],
  },
  {
    label: 'Budget',
    items: [
      { label: 'Overview', icon: 'pi pi-fw pi-chart-bar', to: '/budget/overview' },
      { label: 'Income', icon: 'pi pi-fw pi-wallet', to: '/budget/income' },
      { label: 'Expenses', icon: 'pi pi-fw pi-shopping-cart', to: '/budget/expenses' },
      { label: 'Categories', icon: 'pi pi-fw pi-tags', to: '/budget/categories' },
      { label: 'Recurring', icon: 'pi pi-fw pi-refresh', to: '/budget/recurring' },
    ],
  },
  {
    label: 'Reports',
    items: [
      { label: 'Monthly', icon: 'pi pi-fw pi-calendar', to: '/reports/monthly' },
      { label: 'Yearly', icon: 'pi pi-fw pi-chart-line', to: '/reports/yearly' },
      { label: 'Custom', icon: 'pi pi-fw pi-sliders-h', to: '/reports/custom' },
    ],
  },
  {
    label: 'Settings',
    items: [
      { label: 'Profile', icon: 'pi pi-fw pi-user', to: '/settings/profile' },
      { label: 'Preferences', icon: 'pi pi-fw pi-cog', to: '/settings/preferences' },
    ],
  },
  {
    label: 'Help',
    items: [
      { label: 'FAQ', icon: 'pi pi-fw pi-question-circle', to: '/help/faq' },
      { label: 'Contact', icon: 'pi pi-fw pi-envelope', to: '/help/contact' },
    ],
  },
])
</script>
