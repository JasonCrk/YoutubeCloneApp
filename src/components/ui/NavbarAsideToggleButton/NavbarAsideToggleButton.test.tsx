import { render, screen, cleanup } from '@testing-library/react'

import NavbarAsideToggleButton from '.'

describe('<NavbarAsideToggleButton />', () => {
  afterEach(cleanup)

  it('Should contain a element with "button" role', () => {
    render(<NavbarAsideToggleButton />)

    const button = screen.getByRole('button')
    expect(button).toBeDefined()
  })

  it('Should the role element "button" be a <button />', () => {
    render(<NavbarAsideToggleButton />)

    const button = screen.getByRole('button')
    expect(button.tagName).toBe('BUTTON')
  })
})
