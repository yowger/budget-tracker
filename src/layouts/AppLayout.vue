<template>
  <div class="min-h-screen">
    <app-topbar></app-topbar>
    <!-- <app-sidebar></app-sidebar> -->
    <div class="flex flex-col min-h-screen justify-between pt-24 px-8 pb-0 bg-green-200">
      <div class="flex-1 pb-8 bg-blue-200">
        <router-view></router-view>
      </div>
      <app-footer></app-footer>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppFooter from '@/layouts/AppFooter.vue'
// import AppSidebar from '@/layouts/AppSidebar.vue'
import AppTopbar from '@/layouts/AppTopbar.vue'
</script>
