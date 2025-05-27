import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import LoginForm from '@/components/forms/LoginForm.vue'

describe('LoginForm', () => {
  it('renders email and password inputs', () => {
    const wrapper = mount(LoginForm)

    expect(wrapper.find('input#email').exists()).toBe(true)
    expect(wrapper.find('input#password').exists()).toBe(true)
  })

  it('disables inputs and buttons when loading', () => {
    const wrapper = mount(LoginForm, {
      props: {
        loading: true,
        authError: null,
      },
    })

    expect(wrapper.find('input[type="email"]').attributes('disabled')).toBeDefined()
    expect(wrapper.find('input[type="password"]').attributes('disabled')).toBeDefined()

    const buttons = wrapper.findAll('button')
    const loginButton = buttons.find((btn) => btn.text() === 'Login')
    expect(loginButton?.attributes('disabled')).toBeDefined()

    const googleButton = buttons.find((btn) => btn.text() === 'Continue with Google')
    expect(googleButton?.attributes('disabled')).toBeDefined()
  })

  it('shows error message when passed as prop', () => {
    const errorMessage = 'Invalid credentials'

    const wrapper = mount(LoginForm, {
      props: { authError: errorMessage },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })
})
