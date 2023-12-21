import { cleanup, screen } from '@testing-library/react'

import SignInForm from '@features/auth/components/SignInForm'

import { render } from '@utils/testing/render'

describe('<SignInForm />', () => {
  afterEach(cleanup)

  it('Should contain a <h2> title', () => {
    render(<SignInForm />)

    const signInTitle = screen.getByText(/Sign in/i, { selector: 'h2' })
    expect(signInTitle).toBeInTheDocument()
  })

  it('Should the input email has the email type attribute', () => {
    render(<SignInForm />)

    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    expect(inputEmail).toHaveAttribute('type', 'email')
  })

  it('Should the input email has a name attribute', () => {
    render(<SignInForm />)

    const inputEmail = screen.getByRole('textbox', { name: /email/i })
    expect(inputEmail).toHaveAttribute('name', 'email')
  })

  it('Should the input password has a password type attribute', () => {
    render(<SignInForm />)

    const inputPassword = screen.getByRole('textbox', { name: /password/i })
    expect(inputPassword).toHaveAttribute('type', 'password')
  })

  it('Should the input password has a name attribute', () => {
    render(<SignInForm />)

    const inputPassword = screen.getByRole('textbox', { name: /password/i })
    expect(inputPassword).toHaveAttribute('name', 'password')
  })

  it('Should contain a submit button', () => {
    render(<SignInForm />)

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    expect(submitButton).toBeInTheDocument()
  })

  it('Should the submit button has a submit type attribute', () => {
    render(<SignInForm />)

    const submitButton = screen.getByRole('button', { name: /sign in/i })
    expect(submitButton).toHaveAttribute('type', 'submit')
  })
})
