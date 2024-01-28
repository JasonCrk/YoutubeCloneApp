import { cleanup, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import ListItemLinkWrapper from '@/components/ui/ListItemLinkWrapper'

import { render } from '@/utils/testing/render'

import { useNavigate } from 'react-router-dom'

describe('<ListItemLinkWrapper />', () => {
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

  it('Should redirect ', async () => {
    const href = '/test'

    const navigateMock = vi.fn()

    useNavigateMock.mockReturnValue(navigateMock)

    render(
      <ListItemLinkWrapper href={href}>
        {isActive => <>{isActive}</>}
      </ListItemLinkWrapper>
    )

    const user = userEvent.setup()

    const listItemLink = screen.getByRole('link')

    await user.click(listItemLink)

    expect(navigateMock).toHaveBeenCalledOnce()
    expect(navigateMock).toHaveBeenCalledWith(href)
  })

  it('Should the href prop equal to href attribute of link', () => {
    const href = '/'

    render(
      <ListItemLinkWrapper href={href}>
        {isActive => <>{isActive}</>}
      </ListItemLinkWrapper>,
      {
        routerOptions: {
          initialEntries: [href]
        }
      }
    )

    const link = screen.queryByRole('link')
    expect(link).toHaveAttribute('href', href)
  })

  it('Should the isActive variable be equal to true if href is equal to the window pathname', () => {
    const href = '/'

    render(
      <ListItemLinkWrapper href={href}>
        {isActive => (isActive ? 'active' : 'not active')}
      </ListItemLinkWrapper>,
      {
        routerOptions: {
          initialEntries: [href]
        }
      }
    )

    const isActiveMessage = screen.queryByText(/^active/i)
    expect(isActiveMessage).toBeInTheDocument()
  })

  it('Should the isActive variable be equal to false if href is not equal to the window pathname', () => {
    const href = '/'

    render(
      <ListItemLinkWrapper href={href}>
        {isActive => (isActive ? 'active' : 'not active')}
      </ListItemLinkWrapper>,
      {
        routerOptions: {
          initialEntries: ['/test']
        }
      }
    )

    const isNotActiveMessage = screen.queryByText(/^not active/i)
    expect(isNotActiveMessage).toBeInTheDocument()
  })
})
