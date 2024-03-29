import { cleanup, screen } from '@testing-library/react'

import NavbarAsideLink from '@/components/ui/NavbarAsideLink'

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

    const link = screen.queryByRole('link')
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

    const link = screen.queryByRole('link')
    expect(link).toHaveTextContent(linkTitle)
  })

  it('Should the link has a href attribute', () => {
    const href = '/'

    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon />}
        href={href}
        title='link'
      />
    )

    const link = screen.queryByRole('link')
    expect(link).toHaveAttribute('href', href)
  })

  it('Should show the active icon if the pathname starts with the href', () => {
    const pathname = '/test'

    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<HomeOutlinedIcon />}
        href={pathname}
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: ['/test/path']
        }
      }
    )

    const activeIcon = screen.queryByTestId(ACTIVE_ICON_ID)
    expect(activeIcon).toBeInTheDocument()
  })

  it("Shouldn't contain the active icon if the pathname not starts with the href", () => {
    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon data-testid={ACTIVE_ICON_ID} />}
        noActiveIcon={<HomeOutlinedIcon />}
        href='/active'
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: ['/no-active']
        }
      }
    )

    const activeIcon = screen.queryByTestId(ACTIVE_ICON_ID)
    expect(activeIcon).toBeNull()
  })

  it('Should contain the no active icon if the pathname not starts with the href', () => {
    render(
      <NavbarAsideLink
        activeIcon={<HomeIcon />}
        noActiveIcon={<HomeOutlinedIcon data-testid={NO_ACTIVE_ICON_ID} />}
        href={'/active'}
        title='link'
      />,
      {
        routerOptions: {
          initialEntries: ['/no-active']
        }
      }
    )

    const noActiveIcon = screen.queryByTestId(NO_ACTIVE_ICON_ID)
    expect(noActiveIcon).toBeInTheDocument()
  })

  it("Shouldn't contain the no active icon if the pathname starts with the href", () => {
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
