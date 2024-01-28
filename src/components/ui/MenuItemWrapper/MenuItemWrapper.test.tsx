import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import MenuItemWrapper from '@/components/ui/MenuItemWrapper'

import { render } from '@/utils/testing/render'

import { useNavigate } from 'react-router-dom'

describe('<MenuItemWrapper />', () => {
  vi.mock('react-router-dom', async () => {
    const actual = await vi.importActual('react-router-dom')
    return {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ...(actual as any),
      useNavigate: vi.fn()
    }
  })

  const useNavigateMock = vi.mocked(useNavigate)

  afterEach(cleanup)

  it('Should render component', () => {
    render(<MenuItemWrapper>test</MenuItemWrapper>)

    const menuItemWrapper = screen.queryByRole('menuitem', { name: /^test$/i })
    expect(menuItemWrapper).toBeInTheDocument()
  })

  it('Should the menu item does not act as a link if it does not have the linkHref prop', async () => {
    const navigateMock = vi.fn()

    useNavigateMock.mockReturnValue(navigateMock)

    render(<MenuItemWrapper>test</MenuItemWrapper>)

    const user = userEvent.setup()

    const menuItemWrapper = screen.getByRole('menuitem', { name: /^test$/i })

    await user.click(menuItemWrapper)

    expect(navigateMock).toHaveBeenCalledTimes(0)
  })

  it('Should the menu item become a link if it has the linkHref prop', async () => {
    const linkHref = '/test'
    const navigateMock = vi.fn()

    useNavigateMock.mockReturnValue(navigateMock)

    render(<MenuItemWrapper linkHref={linkHref}>test</MenuItemWrapper>)

    const user = userEvent.setup()

    const menuItemWrapper = screen.getByRole('menuitem', { name: /^test$/i })

    await user.click(menuItemWrapper)

    expect(navigateMock).toHaveBeenCalledOnce()
    expect(navigateMock).toHaveBeenCalledWith(linkHref)
  })
})
