import { cleanup, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import { setupServer } from 'msw/node'

import {
  mockSignUpUserData,
  signUpMockEndpoint
} from '@/features/auth/mocks/api'

import SignUpForm from '@/features/auth/components/SignUpForm'

import { render } from '@/utils/testing/render'

const server = setupServer(signUpMockEndpoint)

describe('<SignUpForm />', () => {
  beforeAll(() => server.listen())

  afterEach(() => {
    server.resetHandlers()
    cleanup()
  })

  afterAll(() => server.close())

  it('Should contain a button with the submit type', () => {
    render(<SignUpForm />)

    const button = screen.queryByRole('button', { name: /sign up/i })
    expect(button).toHaveAttribute('type', 'submit')
  })

  it('Should the input first name has an firstName name attribute', () => {
    render(<SignUpForm />)

    const inputFirstName = screen.queryByRole('textbox', {
      name: /^first name/i
    })
    expect(inputFirstName).toHaveAttribute('name', 'firstName')
  })

  it('Should the input last name has an lastName name attribute', () => {
    render(<SignUpForm />)

    const inputLastName = screen.queryByRole('textbox', {
      name: /^last name/i
    })
    expect(inputLastName).toHaveAttribute('name', 'lastName')
  })

  it('Should the input email has an email type attribute', () => {
    render(<SignUpForm />)

    const inputEmail = screen.queryByRole('textbox', { name: /^email/i })
    expect(inputEmail).toHaveAttribute('type', 'email')
  })

  it('Should the input email has an email name attribute', () => {
    render(<SignUpForm />)

    const inputEmail = screen.queryByRole('textbox', { name: /^email/i })
    expect(inputEmail).toHaveAttribute('name', 'email')
  })

  it('Should the input username has an username name attribute', () => {
    render(<SignUpForm />)

    const inputUsername = screen.queryByRole('textbox', { name: /^username/i })
    expect(inputUsername).toHaveAttribute('name', 'username')
  })

  it('Should the input password has an password type attribute', () => {
    render(<SignUpForm />)

    const inputPassword = screen.queryByRole('textbox', { name: /^password/i })
    expect(inputPassword).toHaveAttribute('type', 'password')
  })

  it('Should the input password has an password name attribute', () => {
    render(<SignUpForm />)

    const inputPassword = screen.queryByRole('textbox', { name: /^password/i })
    expect(inputPassword).toHaveAttribute('name', 'password')
  })

  it('Should the input confirm password has an confirmPassword name attribute', () => {
    render(<SignUpForm />)

    const inputConfirmPassword = screen.queryByRole('textbox', {
      name: /^confirm password/i
    })
    expect(inputConfirmPassword).toHaveAttribute('name', 'confirmPassword')
  })

  it('Should call onSuccess function once if user registers and errors occur', async () => {
    const onSuccessMock = vi.fn()
    const user = userEvent.setup()

    render(<SignUpForm onSuccess={onSuccessMock} />)

    const inputUsername = screen.getByRole('textbox', { name: /^username/i })
    const inputFirstName = screen.getByRole('textbox', { name: /^first name/i })
    const inputLastName = screen.getByRole('textbox', { name: /^last name/i })
    const inputEmail = screen.getByRole('textbox', { name: /^email/i })
    const inputPassword = screen.getByRole('textbox', { name: /^password/i })
    const inputConfirmPassword = screen.getByRole('textbox', {
      name: /^confirm password/i
    })

    await user.type(inputUsername, mockSignUpUserData.username)
    await user.type(inputFirstName, mockSignUpUserData.firstName)
    await user.type(inputLastName, mockSignUpUserData.lastName)
    await user.type(inputEmail, mockSignUpUserData.email)
    await user.type(inputPassword, mockSignUpUserData.password)
    await user.type(inputConfirmPassword, mockSignUpUserData.confirmPassword)

    const submitButton = screen.getByRole('button', { name: /^sign up/i })

    await user.click(submitButton)

    expect(onSuccessMock).toHaveBeenCalledOnce()
  })

  it('Should call onSettled function once if user registers', async () => {
    const onSettledMock = vi.fn()
    const user = userEvent.setup()

    render(<SignUpForm onSettled={onSettledMock} />)

    const inputUsername = screen.getByRole('textbox', { name: /^username/i })
    const inputFirstName = screen.getByRole('textbox', { name: /^first name/i })
    const inputLastName = screen.getByRole('textbox', { name: /^last name/i })
    const inputEmail = screen.getByRole('textbox', { name: /^email/i })
    const inputPassword = screen.getByRole('textbox', { name: /^password/i })
    const inputConfirmPassword = screen.getByRole('textbox', {
      name: /^confirm password/i
    })

    await user.type(inputUsername, mockSignUpUserData.username)
    await user.type(inputFirstName, mockSignUpUserData.firstName)
    await user.type(inputLastName, mockSignUpUserData.lastName)
    await user.type(inputEmail, mockSignUpUserData.email)
    await user.type(inputPassword, mockSignUpUserData.password)
    await user.type(inputConfirmPassword, mockSignUpUserData.confirmPassword)

    const submitButton = screen.getByRole('button', { name: /^sign up/i })

    await user.click(submitButton)

    expect(onSettledMock).toHaveBeenCalledOnce()
  })
})
