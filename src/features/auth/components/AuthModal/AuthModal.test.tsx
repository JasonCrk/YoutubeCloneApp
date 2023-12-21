import { cleanup, screen } from '@testing-library/react'

import { AuthenticationOptions } from '@features/auth/contexts/AuthModal'
import AuthModalProvider from '@features/auth/contexts/AuthModal/Provider'

import { render } from '@utils/testing/render'

describe('<AuthModal />', () => {
  afterEach(cleanup)

  it('Should render component if the modal is open', () => {
    render(
      <AuthModalProvider
        defaultStates={{
          isOpen: true,
          authForm: AuthenticationOptions.SIGN_IN
        }}
      >
        <></>
      </AuthModalProvider>
    )

    const authModal = screen.getByTestId('AuthModal')
    expect(authModal)
  })

  it("Shouldn't render component if the modal is not open", () => {
    const { container } = render(
      <AuthModalProvider
        defaultStates={{
          isOpen: false,
          authForm: AuthenticationOptions.SIGN_IN
        }}
      >
        <></>
      </AuthModalProvider>
    )

    const authModal = container.querySelector('[data-testid="AuthModal"]')
    expect(authModal).toBeNull()
  })

  it('Should show the <SignInForm /> when sign in form is selected', () => {
    render(
      <AuthModalProvider
        defaultStates={{
          isOpen: true,
          authForm: AuthenticationOptions.SIGN_IN
        }}
      >
        <></>
      </AuthModalProvider>
    )

    screen.getByTestId('SignInForm')
  })

  it("Shouldn't show the <SignUpForm /> when sign up form is selected", () => {
    render(
      <AuthModalProvider
        defaultStates={{
          isOpen: true,
          authForm: AuthenticationOptions.SIGN_UP
        }}
      >
        <></>
      </AuthModalProvider>
    )

    screen.getByTestId('SignUpForm')
  })
})
