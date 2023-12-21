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

    const authModal = screen.queryByTestId('AuthModal')
    expect(authModal).toBeInTheDocument()
  })

  it("Shouldn't render component if the modal is not open", () => {
    render(
      <AuthModalProvider
        defaultStates={{
          isOpen: false,
          authForm: AuthenticationOptions.SIGN_IN
        }}
      >
        <></>
      </AuthModalProvider>
    )

    const authModal = screen.queryByTestId('AuthModal')
    expect(authModal).toBeDefined()
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

    const signInForm = screen.queryByTestId('SignInForm')
    expect(signInForm).toBeInTheDocument()
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

    const signUpForm = screen.queryByTestId('SignUpForm')
    expect(signUpForm).toBeInTheDocument()
  })
})
