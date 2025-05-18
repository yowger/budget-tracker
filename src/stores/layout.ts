import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    // layoutConfig: {
    //   menuMode: 'static',
    // },
    state: {
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      staticMenuDesktopInactive: false,
    },
  }),
  actions: {
    toggleMenu() {
      console.log('toggle menu')
      this.state.overlayMenuActive = !this.state.overlayMenuActive
    },
  },
})
