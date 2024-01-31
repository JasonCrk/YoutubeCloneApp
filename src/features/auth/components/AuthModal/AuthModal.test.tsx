import { cleanup, screen } from '@testing-library/react'

import { AuthenticationOptions } from '@/features/auth/contexts/AuthModal'
import AuthModalProvider from '@/features/auth/contexts/AuthModal/Provider'

import { render } from '@/utils/testing/render'

describe('<AuthModal />', () => {
  afterEach(cleanup)

  it('Should show the modal if the context state is open', () => {
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

  it("Shouldn't show the modal if the context state is not open", () => {
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

    const signInForm = screen.queryByTestId('SignInForm')
    const signUpForm = screen.queryByTestId('SignUpForm')

    expect(signInForm).toBeInTheDocument()
    expect(signUpForm).toBeNull()
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

    const signInForm = screen.queryByTestId('SignInForm')
    const signUpForm = screen.queryByTestId('SignUpForm')

    expect(signInForm).toBeNull()
    expect(signUpForm).toBeInTheDocument()
  })
})
