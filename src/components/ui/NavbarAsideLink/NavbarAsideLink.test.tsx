import { cleanup, screen } from '@testing-library/react'

import NavbarAsideLink from '.'

import { render } from '@/utils/testing/render'

import HomeIcon from '@mui/icons-material/Home'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined'

const ACTIVE_ICON_ID = 'activeIcon'
const NO_ACTIVE_ICON_ID = 'noActiveIcon'

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
    expect(link).toBeInTheDocument()
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
    expect(link).toHaveAttribute('href', href)
  })

  it('Should show the active icon when the pathname is equal to the href', () => {
    const pathname = '/'

    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon data-testid={ACTIVE_ICON_ID} />}
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

    const activeIcon = screen.queryByTestId(ACTIVE_ICON_ID)
    expect(activeIcon).not.toBeNull()
  })

  it("Shouldn't contain the active icon when the pathname is not equal to the href", () => {
    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon data-testid={ACTIVE_ICON_ID} />}
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

    const activeIcon = screen.queryByTestId(ACTIVE_ICON_ID)
    expect(activeIcon).toBeNull()
  })

  it('Should contain the no active icon when the pathname is not equal to the href', () => {
    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon data-testid={NO_ACTIVE_ICON_ID} />}
        href={'/'}
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: ['/test']
        }
      }
    )

    const noActiveIcon = screen.queryByTestId(NO_ACTIVE_ICON_ID)
    expect(noActiveIcon).not.toBeNull()
  })

  it("Shouldn't contain the no active icon when the pathname is equal to the href", () => {
    const pathname = '/'

    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon data-testid={NO_ACTIVE_ICON_ID} />}
        href={pathname}
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: [pathname]
        }
      }
    )

    const noActiveIcon = screen.queryByTestId(NO_ACTIVE_ICON_ID)
    expect(noActiveIcon).toBeNull()
  })
})
