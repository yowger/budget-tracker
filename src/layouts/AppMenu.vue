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

<!-- <template>
  <div class="flex flex-column h-full w-full">
    <div class="flex align-items-center justify-content-between px-4 pt-3 flex-shrink-0">
      <span class="inline-flex align-items-center gap-2">
        <svg
          width="35"
          height="40"
          viewBox="0 0 35 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="..." fill="var(--primary-color-color)" />
          <path d="..." fill="var(--text-color)" />
        </svg>
        <span class="font-semibold text-2xl text-primary">Your Logo</span>
      </span>
      <span>
        <Button type="button" icon="pi pi-times" rounded outlined class="h-2rem w-2rem"></Button>
      </span>
    </div>
    <div class="overflow-y-auto w-full">
      <ul class="list-none p-3 m-0">
        <li>
          <div
            v-ripple
            v-styleclass="{
              selector: '@next',
              enterClass: 'hidden',
              enterActiveClass: 'slidedown',
              leaveToClass: 'hidden',
              leaveActiveClass: 'slideup',
            }"
            class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
          >
            <span class="font-medium">FAVORITES</span>
            <i class="pi pi-chevron-down"></i>
          </div>
          <ul class="list-none p-0 m-0 overflow-hidden">
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-home mr-2"></i>
                <span class="font-medium">Dashboard</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-bookmark mr-2"></i>
                <span class="font-medium">Bookmarks</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                v-styleclass="{
                  selector: '@next',
                  enterClass: 'hidden',
                  enterActiveClass: 'slidedown',
                  leaveToClass: 'hidden',
                  leaveActiveClass: 'slideup',
                }"
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-chart-line mr-2"></i>
                <span class="font-medium">Reports</span>
                <i class="pi pi-chevron-down ml-auto"></i>
              </a>
              <ul
                class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
              >
                <li>
                  <a
                    v-ripple
                    v-styleclass="{
                      selector: '@next',
                      enterClass: 'hidden',
                      enterActiveClass: 'slidedown',
                      leaveToClass: 'hidden',
                      leaveActiveClass: 'slideup',
                    }"
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-chart-line mr-2"></i>
                    <span class="font-medium">Revenue</span>
                    <i class="pi pi-chevron-down ml-auto"></i>
                  </a>
                  <ul
                    class="list-none py-0 pl-3 pr-0 m-0 hidden overflow-y-hidden transition-all transition-duration-400 transition-ease-in-out"
                  >
                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-table mr-2"></i>
                        <span class="font-medium">View</span>
                      </a>
                    </li>
                    <li>
                      <a
                        v-ripple
                        class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                      >
                        <i class="pi pi-search mr-2"></i>
                        <span class="font-medium">Search</span>
                      </a>
                    </li>
                  </ul>
                </li>
                <li>
                  <a
                    v-ripple
                    class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
                  >
                    <i class="pi pi-chart-line mr-2"></i>
                    <span class="font-medium">Expenses</span>
                  </a>
                </li>
              </ul>
            </li>
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-users mr-2"></i>
                <span class="font-medium">Team</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-comments mr-2"></i>
                <span class="font-medium">Messages</span>
                <span
                  class="inline-flex align-items-center justify-content-center ml-auto bg-primary border-circle"
                  style="min-width: 1.5rem; height: 1.5rem"
                  >3</span
                >
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-calendar mr-2"></i>
                <span class="font-medium">Calendar</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-cog mr-2"></i>
                <span class="font-medium">Settings</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
      <ul class="list-none p-3 m-0">
        <li>
          <div
            v-ripple
            v-styleclass="{
              selector: '@next',
              enterClass: 'hidden',
              enterActiveClass: 'slidedown',
              leaveToClass: 'hidden',
              leaveActiveClass: 'slideup',
            }"
            class="p-3 flex align-items-center justify-content-between text-600 cursor-pointer p-ripple"
          >
            <span class="font-medium">APPLICATION</span>
            <i class="pi pi-chevron-down"></i>
          </div>
          <ul class="list-none p-0 m-0 overflow-hidden">
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-folder mr-2"></i>
                <span class="font-medium">Projects</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-chart-bar mr-2"></i>
                <span class="font-medium">Performance</span>
              </a>
            </li>
            <li>
              <a
                v-ripple
                class="flex align-items-center cursor-pointer p-3 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
              >
                <i class="pi pi-cog mr-2"></i>
                <span class="font-medium">Settings</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="mt-auto">
      <hr class="mb-3 mx-3 border-top-1 border-none surface-border" />
      <a
        v-ripple
        class="m-3 flex align-items-center cursor-pointer p-3 gap-2 border-round text-700 hover:surface-100 transition-duration-150 transition-colors p-ripple"
      >
        <Avatar image="/images/avatar/amyelsner.png" shape="circle" />
        <span class="font-bold">Amy Elsner</span>
      </a>
    </div>
  </div>
</template> -->
