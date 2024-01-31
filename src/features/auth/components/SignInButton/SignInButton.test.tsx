import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import {
  AuthModalDefaultStates,
  AuthenticationOptions
} from '@/features/auth/contexts/AuthModal'
import AuthModalProvider from '@/features/auth/contexts/AuthModal/Provider'

import SignInButton from '@/features/auth/components/SignInButton'

import { render } from '@/utils/testing/render'

const IS_NOT_OPEN_MODAL: AuthModalDefaultStates = {
  authForm: AuthenticationOptions.SIGN_IN,
  isOpen: false
}

const IS_NOT_SIGN_IN_FORM_MODAL: AuthModalDefaultStates = {
  authForm: AuthenticationOptions.SIGN_UP,
  isOpen: false
}

describe('<SignInButton />', () => {
  afterEach(cleanup)

  it('Should render component', () => {
    render(
      <AuthModalProvider defaultStates={IS_NOT_OPEN_MODAL}>
        <SignInButton />
      </AuthModalProvider>
    )

    const signInButton = screen.queryByTestId('SignInButton')
    expect(signInButton).toBeInTheDocument()
  })

  it('Should contain a text in the button', () => {
    render(
      <AuthModalProvider defaultStates={IS_NOT_OPEN_MODAL}>
        <SignInButton />
      </AuthModalProvider>
    )

    const signInButton = screen.queryByRole('button', { name: /Sign in/i })
    expect(signInButton).toBeInTheDocument()
  })

  it('Should open the <AuthModal /> if the user click the button', async () => {
    render(
      <AuthModalProvider defaultStates={IS_NOT_OPEN_MODAL}>
        <SignInButton />
      </AuthModalProvider>
    )

    const user = userEvent.setup()

    const notExistAuthModal = screen.queryByTestId('AuthModal')
    expect(notExistAuthModal).toBeNull()

    const signInButton = screen.getByRole('button', { name: /Sign in/i })

    await user.click(signInButton)

    const authModal = screen.queryByTestId('AuthModal')
    expect(authModal).toBeInTheDocument()
  })

  it('Should show the sign in form if the user click the button', async () => {
    render(
      <AuthModalProvider defaultStates={IS_NOT_SIGN_IN_FORM_MODAL}>
        <SignInButton />
      </AuthModalProvider>
    )

    const user = userEvent.setup()

    const signInButton = screen.getByRole('button', { name: /Sign in/i })

    await user.click(signInButton)

    const signInForm = screen.queryByTestId('SignInForm')
    expect(signInForm).toBeInTheDocument()
  })
})
