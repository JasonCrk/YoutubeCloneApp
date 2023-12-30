import { cleanup, screen } from '@testing-library/react'

import { render } from '@/utils/testing/render'

import ListItemLinkWrapper from '@/components/ui/ListItemLinkWrapper'

describe('<ListItemLinkWrapper />', () => {
  afterEach(cleanup)

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
