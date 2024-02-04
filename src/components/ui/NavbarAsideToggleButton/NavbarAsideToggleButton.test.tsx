import { render, screen, cleanup } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import { NavbarAsideState, navbarAsideContext } from '@/contexts/NavbarAside'
import { NavbarAsideProvider } from '@/contexts/NavbarAside/providers'

import NavbarAsideToggleButton from '@/components/ui/NavbarAsideToggleButton'

describe('<NavbarAsideToggleButton />', () => {
  afterEach(cleanup)

  it('Should contain a button', () => {
    render(
      <NavbarAsideProvider>
        <NavbarAsideToggleButton />
      </NavbarAsideProvider>
    )

    const button = screen.queryByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('Should call the toggle navbar aside if the user click the button', async () => {
    const toggleNavbarAsideMock = vi.fn()

    render(
      <navbarAsideContext.Provider
        value={{
          state: NavbarAsideState.CLOSE,
          toggleNavbarAside: toggleNavbarAsideMock
        }}
      >
        <NavbarAsideToggleButton />
      </navbarAsideContext.Provider>
    )

    const user = userEvent.setup()

    const button = screen.getByRole('button')

    await user.click(button)

    expect(toggleNavbarAsideMock).toHaveBeenCalledOnce()
  })
})
