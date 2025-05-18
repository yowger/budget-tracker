import { defineStore } from 'pinia'

export const useLayoutStore = defineStore('layout', {
  state: () => ({
    state: {
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
    },
  }),
  actions: {
    toggleMenu() {
      const isDesktopOrLarger = window.innerWidth > 991

      if (isDesktopOrLarger) {
        this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive
        this.state.staticMenuMobileActive = false
      } else {
        this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive
      }
    },
  },
})
