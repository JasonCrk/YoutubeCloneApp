import { cleanup, render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import PasswordField from '@features/auth/components/PasswordField'

describe('<PasswordField />', () => {
  afterEach(cleanup)

  it('Should contain an input element', () => {
    render(<PasswordField id='password' name='password' />)

    const passwordField = screen.queryByRole('textbox')
    expect(passwordField).toBeInTheDocument()
  })

  it('Should contain a button element', () => {
    render(<PasswordField id='password' name='password' />)

    const button = screen.queryByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('Should the input element have the password type attribute for the first time', () => {
    render(<PasswordField id='password' name='password' />)

    const passwordField = screen.queryByRole('textbox')
    expect(passwordField).toHaveAttribute('type', 'password')
  })

  it('Should change the password type attribute to text type attribute if the user click in the button for the first time', async () => {
    render(<PasswordField id='password' name='password' />)
    const user = userEvent.setup()

    const button = screen.getByRole('button')

    await user.click(button)

    const passwordField = screen.queryByRole('textbox')
    expect(passwordField).toHaveAttribute('type', 'text')
  })

  it('Should change the text type attribute to password type attribute if the user click in the button for the second time', async () => {
    render(<PasswordField id='password' name='password' />)
    const user = userEvent.setup()

    const button = screen.getByRole('button')

    await user.click(button)
    await user.click(button)

    const passwordField = screen.queryByRole('textbox')
    expect(passwordField).toHaveAttribute('type', 'password')
  })

  it('Should show the "visibility" icon if the user doesn\'t click in the button for the first time', async () => {
    render(<PasswordField id='password' name='password' />)

    const visibilityIcon = screen.queryByTestId('visibilityIcon')
    expect(visibilityIcon).not.toBeNull()
  })

  it('Shouldn\'t show the "visibility" icon if the user click in the button for the first time', async () => {
    render(<PasswordField id='password' name='password' />)
    const user = userEvent.setup()

    const button = screen.getByRole('button')

    await user.click(button)

    const visibilityIcon = screen.queryByTestId('visibilityIcon')
    expect(visibilityIcon).toBeNull()
  })

  it('Should show the "visibility off" icon if the user click in the button for the first time', async () => {
    render(<PasswordField id='password' name='password' />)
    const user = userEvent.setup()

    const button = screen.getByRole('button')

    await user.click(button)

    const visibilityOffIcon = screen.queryByTestId('visibilityOffIcon')
    expect(visibilityOffIcon).not.toBeNull()
  })

  it('Shouldn\'t show the "visibility off" icon if the user click in the button for the second time', async () => {
    render(<PasswordField id='password' name='password' />)
    const user = userEvent.setup()

    const button = screen.getByRole('button')

    await user.click(button)
    await user.click(button)

    const visibilityOffIcon = screen.queryByTestId('visibilityOffIcon')
    expect(visibilityOffIcon).toBeNull()
  })
})
