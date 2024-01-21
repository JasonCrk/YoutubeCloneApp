import { cleanup, screen } from '@testing-library/react'

import { authStateMock } from '@/mocks/store/auth'

import Menu from '@/features/channel/components/Menu'

import { render } from '@/utils/testing/render'

describe('<Menu />', () => {
  const onCloseMock = vi.fn()

  afterEach(() => {
    cleanup()
    onCloseMock.mockClear()
  })

  it('Should contain a menu', () => {
    render(
      <Menu anchorEl={document.createElement('div')} onClose={onCloseMock} />,
      {
        preloadedState: {
          auth: authStateMock
        }
      }
    )

    expect(screen.queryByRole('menu')).toBeInTheDocument()
  })

  it('Should show the main options menu by default', () => {
    render(
      <Menu anchorEl={document.createElement('div')} onClose={onCloseMock} />,
      {
        preloadedState: {
          auth: authStateMock
        }
      }
    )

    const mainOptionsMenu = screen.queryByTestId('MainOptionsMenu')
    expect(mainOptionsMenu).toBeInTheDocument()
  })

  it('Should contain the SignOutMenuOption component', () => {
    render(
      <Menu anchorEl={document.createElement('div')} onClose={onCloseMock} />,
      {
        preloadedState: {
          auth: authStateMock
        }
      }
    )

    const signOutMenuOption = screen.queryByTestId('SignOutMenuOption')

    expect(signOutMenuOption).toBeInTheDocument()
    expect(signOutMenuOption).toHaveTextContent(/^sign out$/i)
  })
})
