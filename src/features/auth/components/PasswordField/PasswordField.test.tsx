import { cleanup, render, screen } from '@testing-library/react'

import userEvent from '@testing-library/user-event'

import PasswordField from '@/features/auth/components/PasswordField'

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
    expect(visibilityIcon).toBeInTheDocument()
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
    expect(visibilityOffIcon).toBeInTheDocument()
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

  it('Should call the register prop if the password field has it', () => {
    const registerMock = vi.fn()
    const name = 'password'

    render(<PasswordField id='password' name={name} register={registerMock} />)

    expect(registerMock).toHaveBeenCalledOnce()
    expect(registerMock).toHaveBeenCalledWith(name)
  })

  it("Shouldn't show the error message if it does not have the errorMessage prop", () => {
    render(<PasswordField id='password' name='password' />)

    const passwordFieldHelperText = screen.queryByTestId('errorMessage')

    expect(passwordFieldHelperText).toBeNull()
  })

  it('Should show the error message if itt does have the errorMessage prop', () => {
    const errorMessage = 'error message'

    render(
      <PasswordField
        id='password'
        name='password'
        errorMessage={errorMessage}
      />
    )

    const passwordFieldHelperText = screen.queryByTestId('errorMessage')

    expect(passwordFieldHelperText).toBeInTheDocument()
    expect(passwordFieldHelperText).toHaveTextContent(errorMessage)
  })
})
