import { cleanup, screen } from '@testing-library/react'

import NavbarAsideLink from '.'

import { render } from '@utils/testing/render'

import HomeIcon from '@mui/icons-material/Home'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

describe('<NavbarAsideLink />', () => {
  afterEach(cleanup)

  it('Should contain a link', () => {
    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon />}
        href='/'
        title=''
      />
    )

    const link = screen.getByRole('link')

    expect(link).toBeDefined()
  })

  it('Should contain a "title" text content', () => {
    const linkTitle = 'link test'

    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon />}
        href='/'
        title={linkTitle}
      />
    )

    const link = screen.getByRole('link')

    expect(link).toHaveTextContent(linkTitle)
  })

  it('Should contain a link with hyper reference (href) attribute', () => {
    const href = '/'

    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon />}
        href={href}
        title='link'
      />
    )

    const link = screen.getByRole('link')

    expect(link).toHaveAttribute('href', '/')
  })

  it('Should show the active icon when the pathname is equal to the href', () => {
    const pathname = '/'
    const activeIconId = 'activeIcon'

    const { container } = render(
      <NavbarAsideLink
        activeIcon={<HomeIcon data-testid={activeIconId} />}
        noActiveIcon={<HomeOutlinedIcon />}
        href={pathname}
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: [pathname]
        }
      }
    )

    const activeIcon = container.querySelector(
      `[data-testid="${activeIconId}"]`
    )
    expect(activeIcon).not.toBeNull()
  })

  it("Shouldn't contain the active icon when the pathname is not equal to the href", () => {
    const activeIconId = 'activeIcon'

    const { container } = render(
      <NavbarAsideLink
        activeIcon={<HomeIcon data-testid={activeIconId} />}
        noActiveIcon={<HomeOutlinedIcon />}
        href='/'
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: ['/test']
        }
      }
    )

    const activeIcon = container.querySelector(
      `[data-testid="${activeIconId}"]`
    )
    expect(activeIcon).toBeNull()
  })

  it('Should contain the no active icon when the pathname is not equal to the href', () => {
    const noActiveIconId = 'noActiveIcon'

    const { container } = render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon data-testid={noActiveIconId} />}
        href={'/'}
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: ['/test']
        }
      }
    )

    const noActiveIcon = container.querySelector(
      `[data-testid="${noActiveIconId}"]`
    )
    expect(noActiveIcon).not.toBeNull()
  })

  it("Shouldn't contain the no active icon when the pathname is equal to the href", () => {
    const pathname = '/'
    const noActiveIconId = 'noActiveIcon'

    const { container } = render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon data-testid={noActiveIconId} />}
        href={pathname}
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: [pathname]
        }
      }
    )

    const noActiveIcon = container.querySelector(
      `[data-testid="${noActiveIconId}"]`
    )
    expect(noActiveIcon).toBeNull()
  })
})
