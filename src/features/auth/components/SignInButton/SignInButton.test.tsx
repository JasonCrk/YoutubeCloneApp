import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import {
  AuthModalDefaultStates,
  AuthenticationOptions
} from '@features/auth/contexts/AuthModal'
import AuthModalProvider from '@features/auth/contexts/AuthModal/Provider'
import SignInButton from '@features/auth/components/SignInButton'

import { render } from '@utils/testing/render'

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

    const signInButton = screen.getByRole('button')
    expect(signInButton).toBeInTheDocument()
  })

  it('Should contain a text in the button', () => {
    render(
      <AuthModalProvider defaultStates={IS_NOT_OPEN_MODAL}>
        <SignInButton />
      </AuthModalProvider>
    )

    const signInButton = screen.getByText(/Sign in/i)
    expect(signInButton).not.toBeNull()
  })

  it('Should open the <AuthModal /> when user click in the button', async () => {
    const user = userEvent.setup()

    render(
      <AuthModalProvider defaultStates={IS_NOT_OPEN_MODAL}>
        <SignInButton />
      </AuthModalProvider>
    )

    const signInButton = screen.getByRole('button')

    await user.click(signInButton)

    const authModal = screen.queryByTestId('AuthModal')
    expect(authModal).toBeInTheDocument()
  })

  it('Should select the sign in form when user click in the button', async () => {
    const user = userEvent.setup()

    render(
      <AuthModalProvider defaultStates={IS_NOT_SIGN_IN_FORM_MODAL}>
        <SignInButton />
      </AuthModalProvider>
    )

    const signInButton = screen.getByRole('button')

    await user.click(signInButton)

    const authModal = screen.getByTestId('AuthModal')
    const signInForm = authModal.querySelector('[data-testid="SignInForm"]')

    expect(signInForm).not.toBeNull()
  })
})
