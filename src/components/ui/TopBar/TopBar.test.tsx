import { afterEach, describe, expect, it } from 'vitest'

import { cleanup, screen } from '@testing-library/react'

import TopBar from '.'

import { render } from '@utils/testing/render'

describe('<TopBar />', () => {
  afterEach(cleanup)

  it('Should contain <NavbarAsideToggleButton /> component', () => {
    render(<TopBar />)

    const navbarAsideToggleButton = screen.getByTestId(
      'NavbarAsideToggleButton'
    )
    expect(navbarAsideToggleButton).toBeDefined()
  })

  it('Should contain <Logo /> component', () => {
    render(<TopBar />)

    const logoComponent = screen.getByTestId('Logo')
    expect(logoComponent).toBeDefined()
  })

  it('Should contain <InputSearch /> component', () => {
    render(<TopBar />)

    const searchField = screen.getByTestId('SearchField')
    expect(searchField).toBeDefined()
  })

  it('Should contain <TopBarOptions /> component', () => {
    render(<TopBar />)

    const topBarOptions = screen.getByTestId('TopBarOptions')
    expect(topBarOptions).toBeDefined()
  })
})
