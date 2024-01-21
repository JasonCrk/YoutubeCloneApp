import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import SignOutMenuOption from '@/features/auth/components/SignOutMenuOption'

import * as localStorageUtils from '@/features/auth/utils/localStorage.util'

import { render } from '@/utils/testing/render'

describe('<SignOutMenuOption />', () => {
  afterEach(() => {
    cleanup()
  })

  it('Should render component', () => {
    render(<SignOutMenuOption />)

    expect(screen.queryByTestId('SignOutMenuOption')).toBeInTheDocument()
  })

  it('Should contain the menu option logout', () => {
    render(<SignOutMenuOption />)

    const logoutMenuOption = screen.queryByRole('menuitem', {
      name: /^sign out$/i
    })
    expect(logoutMenuOption).toBeInTheDocument()
  })

  it('Should remove the access token from localStorage if the user click in the logout menu option', async () => {
    render(<SignOutMenuOption />)

    const user = userEvent.setup()

    const removeAccessTokenFromLocalStorageSpy = vi.spyOn(
      localStorageUtils,
      'removeAccessTokenFromLocalStorage'
    )

    const logoutMenuOption = screen.getByRole('menuitem', {
      name: /^sign out$/i
    })

    await user.click(logoutMenuOption)

    expect(removeAccessTokenFromLocalStorageSpy).toHaveBeenCalledOnce()
  })

  it('Should remove the refresh token from localStorage if the user click in the logout menu option', async () => {
    render(<SignOutMenuOption />)

    const user = userEvent.setup()

    const removeRefreshTokenFromLocalStorageSpy = vi.spyOn(
      localStorageUtils,
      'removeRefreshTokenFromLocalStorage'
    )

    const logoutMenuOption = screen.getByRole('menuitem', {
      name: /^sign out$/i
    })

    await user.click(logoutMenuOption)

    expect(removeRefreshTokenFromLocalStorageSpy).toHaveBeenCalledOnce()
  })
})
