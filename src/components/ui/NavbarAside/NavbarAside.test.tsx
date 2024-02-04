import { cleanup, screen } from '@testing-library/react'

import { NavbarAsideState } from '@/contexts/NavbarAside'
import { NavbarAsideProvider } from '@/contexts/NavbarAside/providers'

import NavbarAside from '@/components/ui/NavbarAside'

import { render } from '@/utils/testing/render'

describe('<NavbarAside />', () => {
  const fullNavbarAsideTestId = 'FullNavbarAside'
  const shortNavbarAsideTestId = 'ShortNavbarAside'
  const floatNavbarAsideTestId = 'FloatNavbarAside'

  afterEach(cleanup)

  it('Should show the <FullNavbarAside /> if the state is FULL', () => {
    render(
      <NavbarAsideProvider defaultStates={{ state: NavbarAsideState.FULL }}>
        <NavbarAside />
      </NavbarAsideProvider>
    )

    const fullNavbarAside = screen.queryByTestId(fullNavbarAsideTestId)
    const shortNavbarAside = screen.queryByTestId(shortNavbarAsideTestId)
    const floatNavbarAside = screen.queryByTestId(floatNavbarAsideTestId)

    expect(fullNavbarAside).toBeInTheDocument()
    expect(shortNavbarAside).toBeNull()
    expect(floatNavbarAside).toBeNull()
  })

  it('Should show the <ShortNavbarAside /> if the state is SHORT', () => {
    render(
      <NavbarAsideProvider defaultStates={{ state: NavbarAsideState.SHORT }}>
        <NavbarAside />
      </NavbarAsideProvider>
    )

    const fullNavbarAside = screen.queryByTestId(fullNavbarAsideTestId)
    const shortNavbarAside = screen.queryByTestId(shortNavbarAsideTestId)
    const floatNavbarAside = screen.queryByTestId(floatNavbarAsideTestId)

    expect(fullNavbarAside).toBeNull()
    expect(shortNavbarAside).toBeInTheDocument()
    expect(floatNavbarAside).toBeNull()
  })

  it('Should show the <FloatNavbarAside /> if the state is FLOAT', () => {
    render(
      <NavbarAsideProvider defaultStates={{ state: NavbarAsideState.FLOAT }}>
        <NavbarAside />
      </NavbarAsideProvider>
    )

    const fullNavbarAside = screen.queryByTestId(fullNavbarAsideTestId)
    const shortNavbarAside = screen.queryByTestId(shortNavbarAsideTestId)
    const floatNavbarAside = screen.queryByTestId(floatNavbarAsideTestId)

    expect(floatNavbarAside).toBeInTheDocument()
    expect(fullNavbarAside).toBeInTheDocument()
    expect(shortNavbarAside).toBeNull()
  })

  it('Should show nothing if the state is CLOSE', () => {
    const { container } = render(
      <NavbarAsideProvider defaultStates={{ state: NavbarAsideState.CLOSE }}>
        <NavbarAside />
      </NavbarAsideProvider>
    )

    expect(container.children.length).toBe(0)
  })
})
