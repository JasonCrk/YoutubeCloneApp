import { cleanup, screen } from '@testing-library/react'

import {
  NavbarAsideContext,
  NavbarAsideState,
  navbarAsideContext
} from '@/contexts/NavbarAside'

import NavbarAside from '.'

import { render } from '@/utils/testing/render'

const fullNavbarAsideValue: NavbarAsideContext = {
  toggleNavbarAside: () => {},
  state: NavbarAsideState.FULL
}

const shortNavbarAsideValue: NavbarAsideContext = {
  toggleNavbarAside: () => {},
  state: NavbarAsideState.SHORT
}

const floatNavbarAsideValue: NavbarAsideContext = {
  toggleNavbarAside: () => {},
  state: NavbarAsideState.FLOAT
}

const closeNavbarAsideValue: NavbarAsideContext = {
  toggleNavbarAside: () => {},
  state: NavbarAsideState.CLOSE
}

describe('<NavbarAside />', () => {
  afterEach(cleanup)

  it('Should show the <FullNavbarAside /> when the state is FULL', () => {
    render(
      <navbarAsideContext.Provider value={fullNavbarAsideValue}>
        <NavbarAside />
      </navbarAsideContext.Provider>
    )

    const fullNavbarAside = screen.queryByTestId('FullNavbarAside')
    expect(fullNavbarAside).not.toBeNull()
  })

  it('Should show the <ShortNavbarAside /> when the state is SHORT', () => {
    render(
      <navbarAsideContext.Provider value={shortNavbarAsideValue}>
        <NavbarAside />
      </navbarAsideContext.Provider>
    )

    const shortNavbarAside = screen.queryByTestId('ShortNavbarAside')
    expect(shortNavbarAside).not.toBeNull()
  })

  it('Should show the <FloatNavbarAside /> when the state is FLOAT', () => {
    render(
      <navbarAsideContext.Provider value={floatNavbarAsideValue}>
        <NavbarAside />
      </navbarAsideContext.Provider>
    )

    const floatNavbarAside = screen.queryByTestId('FloatNavbarAside')
    expect(floatNavbarAside).toBeInTheDocument()
  })

  it('Should show nothing when the state is CLOSE', () => {
    const { container } = render(
      <navbarAsideContext.Provider value={closeNavbarAsideValue}>
        <NavbarAside />
      </navbarAsideContext.Provider>
    )

    expect(container.children.length).toBe(0)
  })
})
