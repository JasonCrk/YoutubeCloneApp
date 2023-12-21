import { afterEach, describe, expect, it } from 'vitest'

import { cleanup, screen } from '@testing-library/react'

import TopBar from '.'

import { render } from '@utils/testing/render'

describe('<TopBar />', () => {
  afterEach(cleanup)

  it('Should contain <NavbarAsideToggleButton /> component', () => {
    render(<TopBar />)

    const navbarAsideToggleButton = screen.queryByTestId(
      'NavbarAsideToggleButton'
    )
    expect(navbarAsideToggleButton).toBeInTheDocument()
  })

  it('Should contain <Logo /> component', () => {
    render(<TopBar />)

    const logoComponent = screen.queryByTestId('Logo')
    expect(logoComponent).toBeInTheDocument()
  })

  it('Should contain <InputSearch /> component', () => {
    render(<TopBar />)

    const searchField = screen.queryByTestId('SearchField')
    expect(searchField).toBeInTheDocument()
  })

  it('Should contain <TopBarOptions /> component', () => {
    render(<TopBar />)

    const topBarOptions = screen.queryByTestId('TopBarOptions')
    expect(topBarOptions).toBeInTheDocument()
  })
})
