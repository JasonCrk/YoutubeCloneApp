import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import {
  signInMockEndpoint,
  mockUserCredentials,
  signInMockResponse
} from '@features/auth/mocks/api'
import SignInForm from '@features/auth/components/SignInForm'

import { render } from '@utils/testing/render'

const server = setupServer(signInMockEndpoint)
const localStorageSetItemSpy = vi.spyOn(Storage.prototype, 'setItem')

describe('<SignInForm />', () => {
  beforeAll(() => server.listen())

  afterEach(() => {
    cleanup()
    server.resetHandlers()
    localStorageSetItemSpy.mockClear()
    window.localStorage.clear()
  })

  afterAll(() => server.close())

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

  it('should call the onSuccess function if the user has successfully submitted their data', async () => {
    const onSuccess = vi.fn()
    const user = userEvent.setup()

    render(<SignInForm onSuccess={onSuccess} />)

    const inputPassword = screen.getByRole('textbox', { name: /password/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })

    await user.type(inputEmail, mockUserCredentials.email)
    await user.type(inputPassword, mockUserCredentials.password)

    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.click(submitButton)

    expect(onSuccess).toHaveBeenCalled()
  })

  it('Should save authentication tokens in local storage if user submits form data successfully', async () => {
    const user = userEvent.setup()

    render(<SignInForm />)

    const inputPassword = screen.getByRole('textbox', { name: /password/i })
    const inputEmail = screen.getByRole('textbox', { name: /email/i })

    await user.type(inputEmail, mockUserCredentials.email)
    await user.type(inputPassword, mockUserCredentials.password)

    const submitButton = screen.getByRole('button', { name: /sign in/i })

    await user.click(submitButton)

    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      'accessToken',
      signInMockResponse.access
    )
    expect(localStorageSetItemSpy).toHaveBeenCalledWith(
      'refreshToken',
      signInMockResponse.refresh
    )
  })
})
