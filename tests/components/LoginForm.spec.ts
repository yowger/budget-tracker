import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'

import LoginForm from '@/components/forms/LoginForm.vue'

describe('LoginForm', () => {
  it('renders email and password inputs', () => {
    const wrapper = mount(LoginForm)

    const emailInput = wrapper.find('input[type="email"]')
    expect(emailInput.exists()).toBe(true)

    const passwordInput = wrapper.find('input[type="password"]')
    expect(passwordInput.exists()).toBe(true)
  })

  it('disables inputs and buttons when loading', () => {
    const wrapper = mount(LoginForm, {
      props: {
        loading: true,
        authError: null,
      },
    })

    const emailInput = wrapper.find('input[type="email"]')
    expect(emailInput.attributes('disabled')).toBeDefined()

    const passwordInput = wrapper.find('input[type="password"]')
    expect(passwordInput.attributes('disabled')).toBeDefined()

    const buttons = wrapper.findAll('button')

    const loginButton = buttons.find((btn) => btn.text() === 'Login')
    expect(loginButton?.attributes('disabled')).toBeDefined()

    const googleButton = buttons.find((btn) => btn.text() === 'Continue with Google')
    expect(googleButton?.attributes('disabled')).toBeDefined()
  })

  it('shows error message when authError prop is passed', () => {
    const errorMessage = 'Invalid credentials'

    const wrapper = mount(LoginForm, {
      props: { authError: errorMessage },
    })

    expect(wrapper.text()).toContain(errorMessage)
  })

  it('submits the form and emits values when input is valid', async () => {
    const wrapper = mount(LoginForm)

    const mockedCredentials = { email: 'test@example.com', password: 'Password123' }

    const vm = wrapper.vm as any
    await vm.onSubmit({
      valid: true,
      values: mockedCredentials,
    })

    const submitEmitted = wrapper.emitted('submit')
    expect(submitEmitted).toBeTruthy()
    expect(submitEmitted?.[0]).toBeTruthy()

    const emittedPayload = submitEmitted![0][0]

    expect(emittedPayload).toMatchObject({
      valid: true,
      values: {
        email: mockedCredentials.email,
        password: mockedCredentials.password,
      },
    })
  })

  it('emits googleLogin when Google button is clicked', async () => {
    const wrapper = mount(LoginForm)

    const googleButton = wrapper.find("button[aria-label='Continue with Google']")
    await googleButton?.trigger('click')
    expect(wrapper.emitted('googleLogin')).toBeTruthy()
  })
})
