import { defineStore } from 'pinia'

export default defineStore('layout', {
  state: () => ({
    state: {
      overlayMenuActive: false,
      staticMenuDesktopInactive: false,
      staticMenuMobileActive: false,
    },
  }),
  actions: {
    toggleMenu() {
      const isTabletOrLarger = window.innerWidth > 768

      if (isTabletOrLarger) {
        this.state.staticMenuDesktopInactive = !this.state.staticMenuDesktopInactive
        this.state.staticMenuMobileActive = false
      } else {
        this.state.staticMenuMobileActive = !this.state.staticMenuMobileActive
      }
    },
    toggleDarkMode() {
      document.documentElement.classList.toggle('my-app-dark')
    },
  },
})
